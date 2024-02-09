import {
  AdminCurrencies,
  Pricing,
  ServiceType,
  frequencyType,
} from "@prisma/client";
import { UserType } from "./userModule";

export interface IService {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  resume?: string | null;
  image?: string | null;
  stripeProductId?: string | null;
  type: ServiceType;
  instructions?: string | null;
  notes?: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deliverables?: IServiceDeliverable[] | null;
  pricing?: Pricing[] | null;
  ServiceActive?: IServiceActive[] | null;
}

export interface IServiceActive {
  id: number;
  status: string;
  serviceId: number;
  userId?: number | null;
  organizationId?: number | null;
  currencyId?: number | null;
  frequency: frequencyType;
  startedAt: Date;
  endedAt?: Date | null;
  dueAt?: Date | null;
  hostings?: IHostingAccount[] | null;
  createdAt: Date;
  updatedAt: Date;
  service: IService;
  user?: UserType | null;
  domains?: IHostingDomain[] | null;
  currency?: AdminCurrencies | null;
  deliverables?: IServiceDeliverable[] | null;
  vps?: IVpsAccount[] | null;
}
 
export interface IVpsAccount {
  id: number;
  serviceActiveId: number;
  serviceActive?: IServiceActive;
  name: string;
  ip: string;
  username: string;
  distribution: string;
  ubication: string;
  password: string;
  providerId?: number | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  provider?: IVpsProvider | null;
}

export interface IVpsProvider {
  id: number;
  name: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IHostingDomain {
  id: number;
  domain: string;
  status: string;
  serviceActiveId?: number | null;
  serviceActive?: IServiceActive;
  createdAt: Date;
}

export interface IHostingAccount {
  id: number;
  username?: string | null;
  serverId?: number | null;
  planId?: number | null;
  status?: string | null;
  serviceActiveId?: number | null;
  createdAt?: Date;
  plan?: IHostingPlan | null;
}
export interface IHostingPlan {
  id: number;
  name?: string;
  status?: string;
  serverId?: number;
}

// model ServiceDeliverable {
//   id                       Int                        @id @default(autoincrement())
//   serviceId                Int
//   name                     String
//   description              String?
//   createdAt                DateTime                   @default(now())
//   updatedAt                DateTime                   @updatedAt
//   service                  Service                    @relation(fields: [serviceId], references: [id])
//   serviceActiveDeliverable ServiceActiveDeliverable[]

//   @@index([serviceId])
// }

export interface IServiceDeliverable {
  id: number;
  serviceId: number;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  service?: IService | null;
  serviceActiveDeliverable?: IServiceActiveDeliverable[] | null;
}

export interface IServiceActiveDeliverable {
  id: number;
  serviceActiveId: number;
  deliverableId: number;
  status: string;
  completedAt?: Date | null;
  name: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  serviceActive: IServiceActive;
  deliverable?: IServiceDeliverable;
}
