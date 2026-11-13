import updateManager from "@/actions/managers/update";
import { API_URL } from "@/constants";
import { Location, Manager } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { Button, Input } from "@nextui-org/react";
import SelectStore from "./SelectStore";

export default async function FormUpdateManager({
  manager,
}: {
  manager: Manager;
}) {
  const updateManagerWithId = async (formData: FormData) => {
    await updateManager(manager.managerId, formData);
  };

  const responseStores = await fetch(`${API_URL}/locations`, {
    headers: {
      ...authHeaders(),
    },
    next: {
      tags: ["dashboard:locations"],
    },
  });

  if (!responseStores.ok) {
    return null;
  }

  const stores: Location[] = await responseStores.json();

  return (
    <form action={updateManagerWithId} className="bg-orange-400 rounded-md">
      <h1> Actualizar Manager </h1>
      <Input
        defaultValue={manager.managerFullName}
        placeholder="Marco Aurelio"
        name="managerFullName"
      />
      <Input
        defaultValue={manager.managerEmail}
        placeholder="manager@ocso.com"
        name="managerEmail"
      />
      <Input
        defaultValue={String(manager.managerSalary)}
        placeholder="manager@ocso.com"
        name="12000"
      />
      <Input
        defaultValue={manager.managerPhoneNumber}
        placeholder="manager@ocso.com"
        name="512038751"
      />
      <SelectStore
        stores={stores}
        defaultStore={manager?.location?.locationId}
      />
      <Button color="primary" type="submit">
        Actualizar
      </Button>
    </form>
  );
}
