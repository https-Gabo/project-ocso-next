import { createLocation } from "@/actions/locations/create";
import { API_URL } from "@/constants";
import { Location, Manager } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { Button, Input } from "@nextui-org/react";
import SelectManager from "./SelectManager";
export default async function FormNewLocation({
  store,
}: {
  store: string | string[] | undefined;
}) {
  if (!store || store === undefined) return null;
  const responseManagers = await fetch(`${API_URL}/managers`, {
    headers: authHeaders(),
    next: { tags: ["dashboard:managers"] },
  });
  const responseLocation = await fetch(`${API_URL}/locations`, {
    headers: authHeaders(),
    next: { tags: ["dashboard:locations"] },
  });
  if (!responseManagers.ok || !responseLocation.ok) return null;

  const datamanagers: Manager[] = await responseManagers.json();

  const dataLocations: Location[] = await responseLocation.json();

  let foundLocation = dataLocations.find(
    (location: Location) => String(location.locationId) === String(store),
  );

  let foundManager = datamanagers.find(
    (manager) => manager.managerId === foundLocation?.manager?.managerId,
  );

  return (
    <form
      action={createLocation}
      className="bg-orange-400 py-2 px-4 flex flex-col gap-6 w-full rounded-lg"
    >
      <h1 className="text-3x1 text-white text-center"> Crear tienda</h1>
      <Input
        defaultValue={foundLocation?.locationName}
        label="Nombre"
        placeholder="Ocso Jurikiya"
        name="locationName"
      />
      <Input
        defaultValue={foundLocation?.locationAddress}
        label="Dirección"
        placeholder="Av De La Luz S/N"
        name="locationAddress"
      />
      <Input
        defaultValue={foundLocation?.locationLatLng[0].toString()}
        label="Latitud"
        placeholder="-120"
        name="locationLat"
      />
      <Input
        defaultValue={foundLocation?.locationLatLng[1].toString()}
        label="Longitud"
        placeholder="20"
        name="locationLng"
      />
      <SelectManager
        defaultManager={foundManager?.managerId}
        managers={datamanagers}
        locations={dataLocations}
      />

      <Button type="submit" color="primary">
        {" "}
        Subir{" "}
      </Button>
    </form>
  );
}
