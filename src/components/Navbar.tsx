"use client";

import { Button, buttonVariants } from "@/components/ui/button";
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
import {  signOut, useSession } from "@/lib/auth-client";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface NavLinkItem {
  name: string;
  href: string;
}


const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  console.log(session)

  const user = session?.user;
  const handleSignout = async() => {
   await signOut();
  };
 const navItems: NavLinkItem[] = [
    { name: "Home", href: "/" },
    { name: "Explore Studios", href: "/studios" },
    ...(user ? [{ name: "Add Studio", href: "/studioPage" }] : []),
    { name: "How It Works", href: "#howItWorks" },
    { name: "About Us", href: "/about" },
  ];
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
        <div className="flex items-center gap-4">
          {user ? (
            <Popover>
              <PopoverTrigger className="cursor-pointer">
                <Avatar>
                  <AvatarImage
                    referrerPolicy="no-referrer"
                    src={user?.image || ""}
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback className="bg-slate-700 text-white">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-56 bg-slate-900 border-slate-800 text-white p-4">
                <PopoverHeader className="space-y-1">
                  <PopoverTitle className="text-sm font-semibold text-white">
                    {user?.name}
                  </PopoverTitle>
                  <PopoverDescription className="text-xs text-slate-400 truncate">
                    {user?.email}
                  </PopoverDescription>
                </PopoverHeader>
                <div className="mt-4 border-t border-slate-800 pt-3">
                  <Button
                    onClick={handleSignout}
                    variant="destructive"
                    size="sm"
                    className="w-full bg-amber-600 hover:none text-white"
                  >
                    Sign Out
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <Link
                  href="/signIn"
                  className="text-sm text-slate-300 transition-colors hover:text-blue-400"
                >
                  Login
                </Link>
                <Link
                  href="/signUp"
                  className={`text-sm ${buttonVariants({
                    variant: "default",
                    size: "sm",
                  })} bg-blue-600 hover:bg-blue-700 text-white`}
                >
                  Sign Up
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
