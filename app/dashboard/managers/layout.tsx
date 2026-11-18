"use client";
import { ReactNode } from "react";

export default function LayoutManagers({
  children,
  count,
}: {
  children: ReactNode;
  count: ReactNode;
}) {
  return (
    <div className="grid h-[calc(100vh-104px)] w-full grid-cols-1 gap-5 overflow-hidden xl:grid-cols-[minmax(0,1fr)_minmax(360px,420px)]">
      <div className="min-w-0 overflow-y-auto">{children}</div>
      <aside className="hidden flex-col justify-center gap-5 overflow-y-auto rounded-2xl border border-orange-100 bg-white/60 p-5 xl:flex">
        <div>{count}</div>
      </aside>
    </div>
  );
}
