import deleteLocation from "@/actions/locations/delete";
import { Button } from "@nextui-org/react";
import { LuTrash } from "react-icons/lu";

export default function DeleteLocationButton({
  store,
}: {
  store: string | string[] | undefined;
}) {
  if (!store) return null;
  const locationId = Array.isArray(store) ? store[0] : store;
  const deleteByLocationId = async (formData: FormData) => {
    await deleteLocation(locationId);
  };

  return (
    <form action={deleteByLocationId} className="my-4">
      <Button type="submit" color="danger">
        <LuTrash size="20" />
      </Button>
    </form>
  );
}
