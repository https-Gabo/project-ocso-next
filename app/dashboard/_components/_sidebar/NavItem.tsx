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
      className="flex w-full justify-center"
    >
      <span
        className={`flex w-10/12 justify-center rounded-md py-2 transition-colors [&_svg]:h-11 [&_svg]:w-11 ${isActive ? "bg-orange-400" : "hover:bg-orange-200"}`}
      >
        {icon}
      </span>
    </Link>
  );
};

export default NavItem;
