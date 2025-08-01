import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full fixed bottom-0  p-4 border-t bg-slate-100">
      <div className="md:max-w-screen-2xl mx-auto flex items-center justify-between w-full">
        <Logo />

        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size={"sm"} variant={"ghost"}>
            Privacy Policy
          </Button>
          <Button size="sm" variant={"ghost"}>
            Terms of Service
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
