"use server";

import prisma from "@/lib/db";
import { Plan, Service } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const disconnectProductWithStripe = async (
  modelName: string,
  modelId: number
) => {
  let model: Service | Plan | null = null;

  if (modelName === "Service") {
    model = await prisma.service.findUnique({
      where: {
        id: modelId,
      },
    });

    if (!model) throw new Error("Model not found");

    await prisma.service.update({
      where: {
        id: modelId,
      },
      data: {
        stripeProductId: null,
      },
    });
  } else if (modelName === "Plan") {
    model = await prisma.plan.findUnique({
      where: {
        id: modelId,
      },
    });

    if (!model) throw new Error("Model not found");

    await prisma.plan.update({
      where: {
        id: modelId,
      },
      data: {
        stripeProductId: null,
      },
    });
  }

  if (modelName === "Service") {
    revalidatePath(`/admin/services`);
  } else if (modelName === "Plan") {
    revalidatePath(`/admin/billing/plans/plans/edit/${modelId}`);
  }
};
