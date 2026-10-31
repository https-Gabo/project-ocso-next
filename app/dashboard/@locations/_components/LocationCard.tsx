import { Location } from "@/entities";
import { Card, CardBody, CardHeader, Divider, Link } from "@nextui-org/react";

export default async function LocationCard({
  location,
}: {
  location: Location | undefined;
}) {
  if (!location) return null;

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
