import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center justify-between w-full">
        <Logo />

        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size={"sm"} variant={"outline"} asChild>
            <Link href={"/sign-up"}>Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href={"/sign-up"}>Get Taskify for free</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
