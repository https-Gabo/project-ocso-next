import { LuStore, LuTruck, LuUser, LuUsers, LuWheat } from "react-icons/lu";
import NavItem from "./NavItem";

export default function Sidebar() {
  return (
    <nav className="w-1/12 h-[90vh] bg-orange-200 flex flex-col items-center justify-center py-20 gap-10">
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
