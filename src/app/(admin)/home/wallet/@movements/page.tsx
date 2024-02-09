import React, { Suspense } from "react";
import { getAmountMovements } from "@/actions/admin/walletModule/get-user-amount-movements";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import { MovementRow } from "../ui/MovementRow";

const AdminWalletMovements = async ({
  searchParams,
}: {
  searchParams?: {
    currency?: string;
  };
}) => {
  const movements = await getAmountMovements(searchParams?.currency ?? "usd");

  return (
    <div>
      <h2 className="text-subtitle">
        Movimientos en {searchParams?.currency?.toUpperCase() ?? "usd"}
      </h2>
      <Suspense fallback={<TableLoaderSkeleton count={10} />}>
        <div>
          <ul role="list" className="divide-y divide-gray-100">
            {movements?.map((movement: any) => (
              <MovementRow
                {...movement}
                key={`movement-${movement.id}`}
                currencyCode={searchParams?.currency ?? "usd"}
              />
            ))}

            {movements?.length === 0 && (
              <li className="py-4">
                <div className="flex space-x-3">
                  <div className="min-w-0 flex-1 flex items-center">
                    <p className="text-sm font-medium text-primary truncate">
                      No hay movimientos en esta moneda
                    </p>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </div>
      </Suspense>
    </div>
  );
};

export default AdminWalletMovements;
