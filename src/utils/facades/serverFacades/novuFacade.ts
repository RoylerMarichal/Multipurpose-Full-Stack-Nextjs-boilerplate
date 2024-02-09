// "use server";
// import { Novu } from "@novu/node";
// import { getSuperAdminSetting } from "./adminFacade";
// import { User } from "@prisma/client";
// import { getSuperAdminAdmins } from "./scurityFacade";
// const NOVU_API_KEY = process.env.NOVU_API_KEY;

// const novu = new Novu(NOVU_API_KEY as string);

// export const subscribeUserToNotificationSystem = async (
//   type: string,
//   subscriberData: any
// ) => {
//   const subscriberId = subscriberData.id;

//   let email = undefined;

//   if (
//     subscriberData.email_addresses &&
//     subscriberData.email_addresses.length > 0
//   ) {
//     email = subscriberData.email_addresses[0].email_address;
//   }

//   await novu.subscribers
//     .identify(subscriberId, {
//       email: email,
//       firstName: subscriberData.name,
//       data: { type },
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// export type NotificationDataType = {
//   message: string;
// };

// //superadmin-new-organization-created
// export const novuNotifyToSuperAdmin = async (message: string) => {
//   const admins = await getSuperAdminAdmins();

//   const novuSuperAdminTemplateID: string | null = await getSuperAdminSetting(
//     "NOVU_SUPER_ADMIN_TEMPLATE_ID"
//   );


//   if (!novuSuperAdminTemplateID) return;

//   let events: any[] = [];

//   admins?.map((admin: User) => {
//     if (admin.externalId) {
//       events.push({
//         name: novuSuperAdminTemplateID as string,
//         to: admin.externalId as string,
//         payload: {
//           message,
//         },
//       });
//     }
//   });

//   await novu.events.bulkTrigger(events);
// };

// export const notifyToUser = async (message: string, userId: string) => {
//   const novuSuperAdminTemplateID: string | null = await getSuperAdminSetting(
//     "NOVU_ADMIN_TEMPLATE_ID"
//   );


//   if (!novuSuperAdminTemplateID) return;

//   await novu
//     .trigger(novuSuperAdminTemplateID, {
//       to: {
//         subscriberId: userId,
//       },
//       payload: {
//         message,
//       },
//     })
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
