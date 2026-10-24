import { LuStore, LuTruck, LuUser, LuUsers, LuWheat } from "react-icons/lu";
import NavItem from "./NavItem";

export default function Sidebar() {
  return (
    <nav
      aria-label="Navegación principal"
      className="flex h-[calc(100vh-11vh)] min-h-[calc(100vh-104px)] w-24 shrink-0 flex-col items-center justify-center gap-10 bg-orange-100 py-8"
    >
      <NavItem icon={<LuStore />} label="Inicio" path="/dashboard" />
      <NavItem
        icon={<LuTruck />}
        label="Proveedores"
        path="/dashboard/providers"
      />
      <NavItem
        icon={<LuWheat />}
        label="Productos"
        path="/dashboard/products"
      />
      <NavItem icon={<LuUser />} label="Gerentes" path="/dashboard/managers" />
      <NavItem
        icon={<LuUsers />}
        label="Empleados"
        path="/dashboard/employees"
      />
    </nav>
  );
}
