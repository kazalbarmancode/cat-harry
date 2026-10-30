"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoGo from "../../public/Logo.png";

interface NavLinkItem {
  name: string;
  href: string;
}

const navItems: NavLinkItem[] = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "About Us", href: "/about" },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-[#0B0F19] text-white">
      <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={`md:hidden text-white ${buttonVariants({ variant: "ghost", size: "icon" })}`}
            >
              <Menu className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-48 mt-2 bg-[#7c7f85] border-stone-200 text-white"
            >
              {navItems.map((item) => (
                <DropdownMenuItem
                  key={item.href}
                  className="focus:bg-slate-400 focus:text-white"
                >
                  <Link href={item.href} className="w-full">
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg overflow-hidden bg-slate-900 border border-slate-800">
              <Image
                src={LoGo}
                alt="StudioSpace Logo"
                fill
                sizes="36px" 
                className="object-cover"
              />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Studio<span className="text-blue-500">Space</span>
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                  isActive
                    ? "text-blue-400 font-semibold border-b-2 border-blue-500 pb-1"
                    : "text-slate-300"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className={buttonVariants({ variant: "default", size: "sm" })}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
