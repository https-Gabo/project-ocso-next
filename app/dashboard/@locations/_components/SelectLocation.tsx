"use client";
import { Location } from "@/entities";
import { Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function SelectLocation({
  locations,
  store,
}: {
  locations: Location[];
  store: string | string[] | undefined;
}) {
  const router = useRouter();
  const selectedStores = store
    ? new Set(Array.isArray(store) ? store : [store])
    : new Set<string>();

  return (
    <Select
      placeholder="Selecciona una tienda"
      label="Tienda"
      selectionMode="multiple"
      selectedKeys={selectedStores}
      classNames={{
        mainWrapper: "hover:ring-2 ring-red-300 rounded-xl transition-all",
      }}
      onSelectionChange={(keys) => {
        if (keys === "all" || keys.size === 0) {
          router.push("/dashboard");
          return;
        }

        if (keys.has("none")) {
          router.push("/dashboard");
          return;
        }

        const params = new URLSearchParams();
        Array.from(keys).forEach((key) => {
          params.append("store", String(key));
        });
        router.push(`/dashboard?${params.toString()}`);
      }}
    >
      {locations.map((location) => (
        <SelectItem
          key={location.locationId === 0 ? "none" : String(location.locationId)}
        >
          {location.locationName}
        </SelectItem>
      ))}
    </Select>
  );
}
