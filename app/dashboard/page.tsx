import EmployeesLocation from "./@locations/components/EmployeesLocation";

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
    <>
      <div className="h-full w-4/12 bg-red-100">
        <div className="h-[90vh] overflow-hidden overflow-y-auto flex flex-col">
          {stores.length > 0 ? (
            <EmployeesLocation stores={stores} />
          ) : (
            <p className="w-full px-2 text-center text-2xl">
              Selecciona una tienda para ver los empleados
            </p>
          )}
        </div>
      </div>
    </>
  );
}
