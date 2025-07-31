"use client";

import { CardWithList } from "@/types/type";
import { FormInput, Layout } from "lucide-react";

interface HeaderProps {
  data?: CardWithList;
}

const Header = ({ data }: HeaderProps) => {
  return (
    <div className="flex items-start gap-x-3 mb-6 w-full">
      <Layout className="h-5 w-5 text-neutral-700" />
      <div className="w-full">
        <form action="" className="">
          <FormInput id="title"></FormInput>
        </form>
      </div>
    </div>
  );
};

export default Header;
