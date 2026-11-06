import { API_URL } from "@/constants";
import { Manager } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
export default async function ManagerPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const response = await fetch(`${API_URL}/managers/${params.id}`, {
    headers: {
      ...authHeaders(),
    },
    next: {
      tags: [`dashboard:managers:${params.id}`, "dashboard:managers"],
    },
  });

  if (!response.ok) {
    return (
      <p className="w-full px-2 text-center text-2xl">
        No se pudo cargar el manager
      </p>
    );
  }

  const data: Manager = await response.json();
  return (
    <Card key={data.managerId} className="mx-20 my-2 bg-orange-100">
      <CardHeader>
        <p className="w-full">
          Nombre: <b>{data.managerFullName}</b>
        </p>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="w-full">
          Email: <b>{data.managerEmail}</b>
        </p>
        <p className="w-full">
          Telefono: <b>{data.managerPhoneNumber}</b>
        </p>
        <p className="w-full">
          Salario: <b>{data.managerSalary}</b>
        </p>
        {data.location ? (
          <>
            <p className="w-full">
              Tienda: <b>{data.location?.locationName ?? "Sin tienda"}</b>
            </p>

            <iframe
              className="border-2 border-orange-800 rounded-md my-2"
              width="300"
              height="200"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAz0Y6dhhUVleZmt7-H4P01QQWCSEz3LBg&q=${data.location.locationLatLng[0]},${data.location.locationLatLng[1]}`}
            ></iframe>
          </>
        ) : (
          <p>No tiene tienda</p>
        )}
      </CardBody>
    </Card>
  );
}
