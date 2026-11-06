import { API_URL } from "@/constants";
import { Manager } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { Card, CardBody, CardHeader, Divider, Link } from "@nextui-org/react";

export default async function ManagerCards() {
  const response = await fetch(`${API_URL}/managers`, {
    headers: authHeaders(),
    next: { tags: ["dashboard:managers"] },
  });

  if (!response.ok) {
    return (
      <p className="w-full px-2 text-center text-2xl">
        No se pudieron cargar los managers
      </p>
    );
  }

  const data: unknown = await response.json();
  const managers = Array.isArray(data) ? (data as Manager[]) : [];

  if (managers.length === 0) {
    return (
      <p className="w-full px-2 text-center text-2xl">
        No hay managers registrados
      </p>
    );
  }

  return managers.map((manager) => {
    return (
      <Link
        key={manager.managerId}
        href={`/dashboard/managers/${manager.managerId}`}
      >
        <Card className="mx-10 my-10 transition-transform hover:scale-[1.1] hover:bg-blue-100">
          <CardHeader>
            <p className="w-full">
              Nombre: <b>{manager.managerFullName}</b>
            </p>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="w-full">
              Email: <b>{manager.managerEmail}</b>
            </p>
            <p className="w-full">
              Telefono: <b>{manager.managerPhoneNumber}</b>
            </p>
            <p className="w-full">
              Salario: <b>{manager.managerSalary}</b>
            </p>
            <p className="w-full">
              Tienda: <b>{manager.location?.locationName ?? "Sin tienda"}</b>
            </p>
          </CardBody>
        </Card>
      </Link>
    );
  });
}
