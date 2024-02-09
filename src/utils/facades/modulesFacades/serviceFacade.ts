import {
  HostingDomainsStatus,
  Invoice,
  InvoiceItem,
  InvoiceStatus,
  Pricing,
  Prisma,
  ServiceActive,
  ServiceActiveStatus,
  ServiceDeliverable,
  ServiceRequirement,
  ServiceType,
  frequencyType,
} from "@prisma/client";
import prisma from "@/lib/db";
import { getMonthCountByFrecuency } from "./billingFacade";
import { updateInvoice } from "../serverFacades/paymentFacade";
import { notifyToSuperAdmin } from "../serverFacades/notificationFacade";
import { getSuperAdminSetting } from "../serverFacades/adminFacade";
import { sendLoopsTransactionalEventToUser } from "../serverFacades/loopsEmailMarketingFacade";
import { createHostingAccount } from "@/actions/global/whmModule/create-hosting-account";
import { upsertVpsAccount } from "@/actions/global/vpsModule/upsert-vps-account";

export const serviceActivePaid = async (
  serviceActive: ServiceActive,
  pricing: Pricing,
  invoice: Invoice
) => {
  const months = getMonthCountByFrecuency(pricing.frequency);
  const serviceActiveUpdate: Prisma.ServiceActiveUpdateInput = {
    status:
      serviceActive.status === ServiceActiveStatus.PENDING
        ? ServiceActiveStatus.IN_PROGRESS
        : serviceActive.status,
    startedAt: serviceActive.startedAt || new Date(),
    dueAt: new Date(new Date().setMonth(new Date().getMonth() + months)),
    currency: {
      connect: {
        id: invoice.currencyId,
      },
    },
    pricing: {
      connect: {
        id: pricing.id,
      },
    },
    frequency: pricing.frequency,
  };

  //Update serviceActive
  const serviceActiveUpdated = await prisma.serviceActive.update({
    where: {
      id: serviceActive.id,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      service: {
        select: {
          name: true,
          type: true,
        },
      },
    },
    data: serviceActiveUpdate,
  });

  if (serviceActive.status !== ServiceActiveStatus.ACTIVE) {
    //Because is new service active

    //Propagate deliverables
    propagateDeliverablesInNewServiceActive(serviceActive);

    //Propagate Requirements
    propagateRequirementsInNewServiceActive(serviceActive);
    //If service is type Hosting, create hosting account draft
    if (serviceActiveUpdated.service.type === ServiceType.HOSTING) {
      createHostingAccount(serviceActiveUpdated);
    }
    if (serviceActiveUpdated.service.type === ServiceType.VPS) {
      upsertVpsAccount({
        modelId: 0,
        payload: {
          serviceActiveId: serviceActiveUpdated.id,
          status: "PENDING",
        },
      });
    }
  } //Else is renovating, do nothing

  const payload: Prisma.InvoiceUpdateInput = {
    paidAt: new Date(),
    status: InvoiceStatus.PAID,
    serviceActive: {
      connect: {
        id: serviceActive.id,
      },
    },
  };

  if (invoice) {
    await updateInvoice(invoice?.id, payload);
  }

  notifyToSuperAdmin("New Service Active Paid: " + serviceActive.id);

  const invoicePaidTransactionalId = await getSuperAdminSetting(
    "LOOPS_INVOICE_PAID_TRANSACTIONAL_ID"
  );

  if (!invoicePaidTransactionalId) {
    throw new Error("LOOPS_INVOICE_PAID_TRANSACTIONAL_ID is not defined");
  }

  if (!serviceActiveUpdated.user || serviceActiveUpdated.user?.email === null)
    return;

  sendLoopsTransactionalEventToUser({
    email: serviceActiveUpdated.user.email,
    transactionalId: invoicePaidTransactionalId,
    dataVariables: {
      userName: serviceActiveUpdated.user.name,
      serviceName: serviceActiveUpdated.service.name,
      invoiceId: invoice.id,
    },
  });
};

export const serviceDomainPaid = async (
  serviceActive: ServiceActive,
  invoice: Invoice,
  invoiceItem: InvoiceItem
) => {
  const payload: Prisma.InvoiceUpdateInput = {
    paidAt: new Date(),
    status: InvoiceStatus.PAID,
    serviceActive: {
      connect: {
        id: serviceActive.id,
      },
    },
  };

  if (invoice) {
    await updateInvoice(invoice?.id, payload);
  }

  notifyToSuperAdmin("New Domain Paid: " + serviceActive.id);

  const invoicePaidTransactionalId = await getSuperAdminSetting(
    "LOOPS_INVOICE_PAID_TRANSACTIONAL_ID"
  );

  if (!invoicePaidTransactionalId) {
    throw new Error("LOOPS_INVOICE_PAID_TRANSACTIONAL_ID is not defined");
  }

  const serviceActiveUpdate: Prisma.ServiceActiveUpdateInput = {
    status:
      serviceActive.status === ServiceActiveStatus.PENDING
        ? ServiceActiveStatus.IN_PROGRESS
        : serviceActive.status,
    startedAt: serviceActive.startedAt || new Date(),
    dueAt: new Date(new Date().setMonth(new Date().getMonth() + 12)),
    currency: {
      connect: {
        id: invoice.currencyId,
      },
    },
    frequency: frequencyType.YEARLY,
  };

  const serviceActiveUpdated = await prisma.serviceActive.update({
    where: {
      id: serviceActive.id,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      service: {
        select: {
          name: true,
          type: true,
        },
      },
    },
    data: serviceActiveUpdate,
  });

  if (!invoiceItem.description) {
    throw new Error("Invoice item description (domain) is empty");
  }

  await prisma.hostingDomain.upsert({
    where: {
      domain: invoiceItem.description,
    },
    update: {
      status: HostingDomainsStatus.ACTIVE,
    },
    create: {
      domain: invoiceItem.description,
      status: HostingDomainsStatus.PENDING,
      serviceActives: {
        connect: {
          id: serviceActive.id,
        },
      },
    },
  });

  //Propagate deliverables
  propagateDeliverablesInNewServiceActive(serviceActive);

  //Propagate Requirements
  propagateRequirementsInNewServiceActive(serviceActive);

  if (!serviceActiveUpdated.user || serviceActiveUpdated.user?.email === null)
    return;

  sendLoopsTransactionalEventToUser({
    email: serviceActiveUpdated.user.email,
    transactionalId: invoicePaidTransactionalId,
    dataVariables: {
      userName: serviceActiveUpdated.user.name,
      serviceName: serviceActiveUpdated.service.name,
      invoiceId: invoice.id,
    },
  });
};

export const propagateDeliverablesInNewServiceActive = async (
  serviceActive: ServiceActive
) => {
  const deliverables = await prisma.serviceDeliverable.findMany({
    where: {
      serviceId: serviceActive.serviceId,
      status: "ACTIVE",
    },
  });

  if (!deliverables) return;

  return await Promise.all(
    deliverables.map(async (deliverable: ServiceDeliverable) => {
      await prisma.serviceActiveDeliverable.create({
        data: {
          deliverableId: deliverable.id,
          name: deliverable.name,
          description: "",
          status: "PENDING",
          serviceActiveId: serviceActive.id,
        },
      });
    })
  );
};

export const propagateRequirementsInNewServiceActive = async (
  serviceActive: ServiceActive
) => {
  const requirements = await prisma.serviceRequirement.findMany({
    where: {
      serviceId: serviceActive.serviceId,
      status: "ACTIVE",
    },
  });

  if (!requirements) return;

  return await Promise.all(
    requirements.map(async (requirement: ServiceRequirement) => {
      await prisma.serviceActiveRequirement.create({
        data: {
          requirementId: requirement.id,
          value: "",
          status: "PENDING",
          serviceActiveId: serviceActive.id,
        },
      });
    })
  );
};
