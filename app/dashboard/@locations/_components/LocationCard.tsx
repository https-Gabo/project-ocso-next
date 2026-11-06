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
        <b className="w-full text-2xl">{location.locationName}</b>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col w-full items-center">
        <p className="w-full">
          Manager:{" "}
          {location.manager ? (
            <Link href={`/dashboard/managers/${location.manager.managerId}`}>
              <b>{location.manager.managerFullName}</b>
            </Link>
          ) : (
            <b>Sin manager</b>
          )}
        </p>
        <p className="w-full">
          Dirección: <b>{location.locationAddress}</b>
        </p>
        <iframe
          className="border-2 border-orange-800 rounded-md my-2"
          width="300"
          height="200"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAz0Y6dhhUVleZmt7-H4P01QQWCSEz3LBg&q=${location.locationLatLng[0]},${location.locationLatLng[1]}`}
        ></iframe>
      </CardBody>
    </Card>
  );
}
