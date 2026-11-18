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

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {managers.map((manager) => (
        <Link
          key={manager.managerId}
          href={`/dashboard/managers/${manager.managerId}`}
          className="rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
        >
          <Card className="h-full border border-orange-200 bg-white/90 shadow-[0_12px_30px_rgba(124,45,18,0.07)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(124,45,18,0.12)]">
            <CardHeader className="border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white px-5 py-4">
              <p className="w-full text-lg font-bold text-slate-800">{manager.managerFullName}</p>
            </CardHeader>
            <Divider />
            <CardBody className="gap-3 px-5 py-5 text-slate-700">
              <p><span className="text-sm text-slate-400">Email:</span> <b>{manager.managerEmail}</b></p>
              <p><span className="text-sm text-slate-400">Teléfono:</span> <b>{manager.managerPhoneNumber}</b></p>
              <p><span className="text-sm text-slate-400">Salario:</span> <b>{manager.managerSalary}</b></p>
              <p><span className="text-sm text-slate-400">Tienda:</span> <b>{manager.location?.locationName ?? "Sin tienda"}</b></p>
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  );
}
