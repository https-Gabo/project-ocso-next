import { updateLocation } from "@/actions/locations/update";
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
  if (!store || store === undefined || typeof store === "object") return null;
  const updateWithStoreId = async (formData: FormData) => {
    await updateLocation(store, formData);
  };
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
      action={updateWithStoreId}
      className="bg-orange-400 py-2 px-10 flex flex-col gap-6 w-full rounded-lg"
    >
      <h1 className="text-3x1 text-white text-center"> Crear tienda</h1>
      <Input
        required={true}
        defaultValue={foundLocation?.locationName}
        label="Nombre"
        placeholder="Ocso Jurikiya"
        name="locationName"
      />
      <Input
        required={true}
        defaultValue={foundLocation?.locationAddress}
        label="Dirección"
        placeholder="Av De La Luz S/N"
        name="locationAddress"
      />
      <Input
        required={true}
        defaultValue={foundLocation?.locationLatLng[0].toString()}
        label="Latitud"
        placeholder="-120"
        name="locationLat"
      />
      <Input
        required={true}
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
        Actualizar
      </Button>
    </form>
  );
}
