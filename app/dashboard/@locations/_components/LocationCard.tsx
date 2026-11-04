import { API_URL } from "@/constants";
import { Location } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { Card, CardBody, CardHeader, Divider, Link } from "@nextui-org/react";

export default async function LocationCard({
  store,
}: {
  store: string | undefined;
}) {
  if (!store) return null;
  const response = await fetch(`${API_URL}/locations/${store}`, {
    headers: authHeaders(),
    next: { tags: ["dashboard:locations", `dashboard:locations:${store}`] },
  });
  if (!response.ok) return null;
  const location: Location = await response.json();

  if (!location) {
    return (
      <p className="w-full px-2 text-center text-2xl">
        No se encontró la tienda seleccionada
      </p>
    );
  }

  return (
    <Card>
      <CardHeader>
        <b className="w-full">{location.locationName}</b>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="w-full">
          Manager:
          <Link href="/dashboard/managers">
            <b>{location.manager?.managerFullName ?? "Sin asignar"}</b>
          </Link>
        </p>
      </CardBody>
    </Card>
  );
}
