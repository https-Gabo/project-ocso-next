"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
interface NavItemProps {
  icon: ReactNode;
  label: string;
  path: string;
}

const NavItem = ({ icon, label, path }: NavItemProps) => {
  const pathName = usePathname();
  const isActive = pathName === path;

  return (
    <Link
      href={path}
      aria-label={label}
      aria-current={isActive ? "page" : undefined}
      title={label}
      className="group flex w-full justify-center"
    >
      <span
        className={[
          "flex w-10/12 items-center justify-center rounded-2xl border transition-all duration-200 ease-out",
          "shadow-[0_10px_25px_rgba(251,146,60,0.10)]",
          "[&_svg]:h-7 [&_svg]:w-7",
          isActive
            ? "border-orange-300 bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-[0_16px_30px_rgba(249,115,22,0.35)]"
            : "border-transparent bg-orange-50 text-orange-600 hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-100 hover:text-orange-700",
        ].join(" ")}
      >
        {icon}
      </span>
    </Link>
  );
};

export default NavItem;
