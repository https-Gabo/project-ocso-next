"use client";
import { usePathname } from "next/navigation";
import Sidebar from "./_components/_sidebar/sidebar";
import Header from "./_components/header";

export default function LayoutDashboard({
  children,
  locations,
}: Readonly<{
  children: React.ReactNode;
  locations: React.ReactNode;
}>) {
  const path = usePathname();
  return (
    <div className="bg-orange-50">
      <Header />
      <div className="flex flex-row items-center">
        <Sidebar />
        {children}
        {locations}
        {path === "/dashboard" ? locations : null}
      </div>
    </div>
  );
}
