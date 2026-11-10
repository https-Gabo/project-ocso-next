import { Manager } from "@/entities";
import { Card, CardBody, CardHeader, Divider, Link } from "@nextui-org/react";

export default function ManagerCard({ manager }: { manager: Manager }) {
  return (
    <Card key={manager.managerId} className="mx-20 my-2 text-center">
      <CardHeader>
        <p className="w-full">
          <b className="text-4xl">{manager.managerFullName}</b>
        </p>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-row flex-grow-0 items-center gap-10 justify-center">
        <div className="flex flex-col text-lg">
          <p className="w-full">
            Email: <b>{manager.managerEmail}</b>
          </p>
          <p className="w-full">
            Telefono: <b>{manager.managerPhoneNumber}</b>
          </p>
          <p className="w-full">
            Salario: <b>{manager.managerSalary}</b>
          </p>
          <p className={manager.location ? "" : "hidden"}>
            Tienda:{" "}
            <Link href={`/dashboard?store=${manager.location.locationId}`}>
              <b className="underline">{manager?.location?.locationName}</b>
            </Link>
          </p>
        </div>
        {manager.location ? (
          <>
            <iframe
              className="border-2 border-orange-800 rounded-md my-2"
              width="300"
              height="200"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAz0Y6dhhUVleZmt7-H4P01QQWCSEz3LBg&q=${manager.location.locationLatLng[0]},${manager.location.locationLatLng[1]}`}
            ></iframe>
          </>
        ) : (
          <p className="w-full">No tiene tienda</p>
        )}
      </CardBody>
    </Card>
  );
}
