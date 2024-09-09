"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  label: string;
  href: string;
};

const NavItem = ({ label, href }: Props) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      className={cn(
        "text-white font-medium py-1 px-3 rounded-md hover:bg-white/20 transition-all",
        isActive && "bg-white/20"
      )}
      href={href}
    >
      {label}
    </Link>
  );
};

export default NavItem;
