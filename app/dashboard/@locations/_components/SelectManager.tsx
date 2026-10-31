"use client";
import { Location, Manager } from "@/entities";
import { Select, SelectItem } from "@nextui-org/react";
export default function SelectManager({
  managers,
  locations,
}: {
  managers: Manager[];
  locations: Location[];
}) {
  const disabledKeys = locations
    .map((location: Location) => {
      return location.manager?.managerId;
    })
    .filter((managerId) => managerId !== undefined);
  return (
    <Select label="Manager" name="manager" disabledKeys={disabledKeys}>
      {managers.map((manager: Manager) => {
        return (
          <SelectItem key={manager.managerId}>
            {manager.managerFullName}
          </SelectItem>
        );
      })}
    </Select>
  );
}
