import { NextResponse } from "next/server";
import { checkServicesOnExpiration } from "@/actions/superAdmin/superAdminServicesModule/check-services-on-expiration";
import { checkInvoicesOnExpiration } from "@/actions/superAdmin/superAdminBillingModule/check-invoices-on-expiration";

export async function GET() {
 
  checkInvoicesOnExpiration();
  checkServicesOnExpiration();
  return NextResponse.json({ ok: true });
}
