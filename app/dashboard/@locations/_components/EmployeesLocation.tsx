import { API_URL } from "@/constants";
import { Employee } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

export default async function EmployeesLocation({
  stores,
}: {
  stores: string[];
}) {
  const selectedStores = stores.filter((store) => store !== "none");

  if (selectedStores.length === 0) {
    return (
      <p className="w-full px-2 text-center text-2xl">
        Ninguna tienda seleccionada
      </p>
    );
  }

  const responses = await Promise.allSettled(
    selectedStores.map(async (store) => {
      const response = await fetch(`${API_URL}/employees/location/${store}`, {
        method: "GET",
        headers: {
          ...authHeaders(),
        },
        next: { tags: ["dashboard:locations:employees"] },
      });
      if (!response.ok) throw new Error("No se pudieron cargar los empleados");
      const data: unknown = await response.json();
      return Array.isArray(data) ? (data as Employee[]) : [];
    }),
  );
  const employees = responses.flatMap((response) =>
    response.status === "fulfilled" ? response.value : [],
  );

  if (employees.length === 0) {
    return (
      <p className="w-full px-2 text-center text-2xl">
        No hay empleados para las tiendas seleccionadas
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3">
      {employees.map((employee) => {
        const fullname = employee.employeeName + " " + employee.employeeLastName;
        return (
          <Card key={employee.employeeId} className="h-full border border-orange-100 bg-white/90 shadow-sm">
            <CardHeader className="border-b border-orange-100 bg-orange-50/70">
              <p className="w-full text-base font-bold text-slate-800">{fullname}</p>
            </CardHeader>
            <Divider />
            <CardBody className="gap-2 px-5 py-4">
              <p className="break-all text-sm text-slate-600">
                Email: <b className="text-slate-800">{employee.employeeEmail}</b>
              </p>
              <p className="text-sm text-slate-600">
                Teléfono: <b className="text-slate-800">{employee.employeePhoneNumber}</b>
              </p>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}
