import EmployeesLocation from "./@locations/_components/EmployeesLocation";

export default function DashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const stores = searchParams.store
    ? Array.isArray(searchParams.store)
      ? searchParams.store
      : [searchParams.store]
    : [];

  return (
    <div className="flex flex-1 justify-center">
      <div className="h-[90vh] w-full max-w-xl rounded-[28px] border border-orange-200 bg-white/75 shadow-[0_20px_45px_rgba(251,146,60,0.10)] backdrop-blur-sm">
        <div className="h-full overflow-hidden overflow-y-auto p-5">
          {stores.length > 0 ? (
            <EmployeesLocation stores={stores} />
          ) : (
            <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-orange-200 bg-orange-50/60 p-6 text-center">
              <p className="text-xl font-medium text-orange-700">
                Selecciona una tienda para ver los empleados
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
