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

  return employees.map((employee) => {
    const fullname = employee.employeeName + " " + employee.employeeLastName;
    return (
      <Card key={employee.employeeId} className="mx-10 my-10">
        <CardHeader>
          <p className="w-full">
            Nombre: <b>{fullname}</b>
          </p>
        </CardHeader>
        <Divider />
        <CardBody>
          <p className="w-full">
            Email: <b>{employee.employeeEmail}</b>
          </p>
          <p className="w-full">
            Telefono: <b>{employee.employeePhoneNumber}</b>
          </p>
        </CardBody>
      </Card>
    );
  });
}
