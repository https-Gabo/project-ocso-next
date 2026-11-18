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
      <div className="flex min-h-[calc(100vh-104px)] flex-row items-stretch gap-4 px-3 pb-4 pt-3 sm:px-4">
        <Sidebar />
        {path === "/dashboard/managers" || path.startsWith("/dashboard/managers/") ? (
          <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
        ) : path === "/dashboard" ? (
          <main className="grid min-w-0 flex-1 grid-cols-1 gap-5 overflow-hidden 2xl:grid-cols-[minmax(360px,0.75fr)_minmax(520px,1.25fr)]">
            <div className="min-w-0 overflow-hidden">{children}</div>
            <div className="min-w-0 overflow-hidden">{locations}</div>
          </main>
        ) : (
          <main className="min-w-0 flex-1 overflow-hidden">{children}</main>
        )}
      </div>
    </div>
  );
}
