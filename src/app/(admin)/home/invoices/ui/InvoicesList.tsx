import NotFound from "@/components/layouts/errors/NotFound";
import Pagination from "@/components/ui/commons/Pagination";
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  Badge,
} from "@tremor/react";
import { formatTimestampToDateString } from "@/utils/facades/serverFacades/strFacade";
import {
  getBadgeClass,
  getStatusName,
} from "@/utils/facades/frontendFacades/visualFacade";
import Link from "next/link";
import { getUserInvoices } from "@/actions/superAdmin/superAdminBillingModule/admin/get-user-invoices";
import { getInvoiceTotal } from "@/utils/facades/serverFacades/paymentFacade";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";
import PageLoader from "@/components/ui/loaders/PageLoader";

const InvoicesList = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const search = query || "";
  const limit = 20;
  const offset = (currentPage - 1) * limit;

  const { data, totalPages, totalCount } = await getUserInvoices({
    args: {
      search,
      limit,
      offset,
    },
  });

  return (
    <div>
      <Suspense
        fallback={
          <div>
            <PageLoader />
          </div>
        }
      >
        {data.length === 0 ? (
          <div className="flex justify-center items-center h-96">
            <NotFound message="No invoices found" />
          </div>
        ) : (
          <div className="flex flex-col text-primary">
            <Table className="mt-6">
              <TableHead>
                <TableRow className="">
                  <TableHeaderCell className="text-left">ID</TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    Precio
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center ">
                    Estado
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    Método de pago
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    PDF Url
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    Fecha
                  </TableHeaderCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data?.map((item: any, index: number) => (
                  <TableRow key={`userS-${item.id + index}`}>
                    <TableCell className="text-left items-center">
                      <span className="px-1 font-bold"># {item.id}</span>
                    </TableCell>

                    <TableCell className="text-center text">
                      <Badge
                        color={
                          item.status === "PAID"
                            ? "green"
                            : item.status === "UNPAID"
                            ? "red"
                            : "gray"
                        }
                      >
                        {getInvoiceTotal(
                          item.Items,
                          item.Currency?.code,
                          item.coupons ?? []
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center text-primary">
                      <span className={`${getBadgeClass(item.status)}`}>
                        {getStatusName(item.status)}
                      </span>
                    </TableCell>
                    <TableCell className="text-center  text-primary">
                      <Badge color={"sky"}>{item.gateway}</Badge>
                    </TableCell>
                    <TableCell className="text-center  text-primary">
                      {item.invoicePdfUrl && (
                        <Link
                          href={item.invoicePdfUrl}
                          target="_blank"
                          className="text-primary"
                        >
                          PDF Link
                        </Link>
                      )}
                    </TableCell>
                    <TableCell className="text-center  text-primary">
                      <span>{formatTimestampToDateString(item.createdAt)}</span>
                    </TableCell>
                    <TableCell className="w-14   ">
                      <Link
                        href={`/home/invoices/${item.id}`}
                        className="btn-icon  "
                      >
                        <EyeIcon className="w-5 h-5  " />
                        <span>View</span>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex mt-7 justify-between">
              <div className="text-primary">
                Mostrando <span className="font-medium">{offset + 1}</span> a{" "}
                <span className="font-medium">{offset + data.length}</span> de{" "}
                <span className="font-medium">{totalCount}</span> resultados
              </div>
              <Pagination totalPages={totalPages} />
            </div>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default InvoicesList;
