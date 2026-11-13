import { LuStore, LuTruck, LuUser, LuUsers, LuWheat } from "react-icons/lu";
import NavItem from "./NavItem";

export default function Sidebar() {
  return (
    <aside className="h-[90vh] w-20 shrink-0 rounded-2xl border border-orange-200 bg-white/80 p-3 shadow-[0_12px_35px_rgba(251,146,60,0.10)] backdrop-blur-sm">
      <nav className="flex h-full flex-col items-center justify-center gap-3">
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
        <NavItem
          icon={<LuUser />}
          label="Gerentes"
          path="/dashboard/managers"
        />
        <NavItem
          icon={<LuUsers />}
          label="Empleados"
          path="/dashboard/employees"
        />
      </nav>
    </aside>
  );
}
