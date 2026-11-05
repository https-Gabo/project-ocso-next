import { createLocation } from "@/actions/locations/create";
import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { Button, Input } from "@nextui-org/react";
import SelectManager from "./SelectManager";
export default async function FormNewLocation({
  store,
}: {
  store: string | string[] | undefined;
}) {
  if (store) return null;
  const responseManagers = await fetch(`${API_URL}/managers`, {
    headers: authHeaders(),
    next: { tags: ["dashboard:managers"] },
  });
  const responseLocation = await fetch(`${API_URL}/locations`, {
    headers: authHeaders(),
    next: { tags: ["dashboard:locations"] },
  });
  if (!responseManagers.ok || !responseLocation.ok) return null;

  const managers = await responseManagers.json();
  const locations = await responseLocation.json();
  return (
    <form
      action={createLocation}
      className="bg-orange-400 py-2 px-4 flex flex-col gap-6 w-full rounded-lg"
    >
      <h1 className="text-3x1 text-white text-center"> Crear tienda</h1>
      <Input
        required={true}
        label="Nombre"
        placeholder="Ocso Jurikiya"
        name="locationName"
      />
      <Input
        required={true}
        label="Dirección"
        placeholder="Av De La Luz S/N"
        name="locationAddress"
      />
      <Input
        required={true}
        label="Latitud"
        placeholder="-120"
        name="locationLat"
      />
      <Input
        required={true}
        label="Longitud"
        placeholder="20"
        name="locationLng"
      />
      <SelectManager
        managers={Array.isArray(managers) ? managers : []}
        locations={Array.isArray(locations) ? locations : []}
      />

      <Button type="submit" color="primary">
        {" "}
        Subir{" "}
      </Button>
    </form>
  );
}
