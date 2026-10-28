import { API_URL, TOKEN_NAME } from "@/constants";
import { Employee } from "@/entities";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import axios from "axios";
import { cookies } from "next/headers";

export default async function EmployeesLocation({
  stores,
}: {
  stores: string[];
}) {
  const token = cookies().get(TOKEN_NAME)?.value;
  const selectedStores = stores.filter((store) => store !== "none");

  if (selectedStores.length === 0) {
    return (
      <p className="w-full px-2 text-center text-2xl">
        Ninguna tienda seleccionada
      </p>
    );
  }

  const responses = await Promise.allSettled(
    selectedStores.map((store) =>
      axios.get<Employee[]>(`${API_URL}/employees/location/${store}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ),
  );
  const employees = responses.flatMap((response) =>
    response.status === "fulfilled" && Array.isArray(response.value.data)
      ? response.value.data
      : [],
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
