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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff7ed_0%,_#fffaf5_35%,_#fff1e6_100%)] text-slate-800">
      <Header />
      <div className="flex flex-row items-stretch gap-4 px-4 pb-4 pt-3">
        <Sidebar />
        <div className="flex flex-1 items-stretch gap-4">
          {children}
          {locations}
          {path === "/dashboard" ? locations : null}
        </div>
      </div>
    </div>
  );
}
