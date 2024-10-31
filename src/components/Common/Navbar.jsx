"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import { Bell, CircleUserRound, LogOut, MessageCircleMore, Settings } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Navbar = () => {
  const { data } = useSession({ required: true });

  console.log(data);

  return (
    <div className="bg-background  flex items-center justify-between px-10 py-5">
      <div className="flex items-center gap-12">
        <Image src="/images/logo-black.png" height={40} width={100} alt="logo" />
        <div className="flex items-center gap-8 font-medium text-[15px]">
          <p>Explore</p>
          <p>Find Job</p>
          <p>Help & Support</p>
          <p>Blog</p>
        </div>
      </div>

      {data?.user?.email ? (
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-8 font-medium text-[15px]">
            <Bell size={24} />
            <MessageCircleMore size={24} />
          </div>

          <Popover>
            <PopoverTrigger>
              <Image
                src={data?.user?.image ? data?.user?.image : "/images/user.avif"}
                height={50}
                width={50}
                className="rounded-full"
                alt="user img"
              />
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-4">
              <div className="flex gap-2 flex-col justify-center items-center shadow-none">
                <Image
                  src={data?.user?.image ? data?.user?.image : "/images/user.avif"}
                  height={40}
                  width={40}
                  className="rounded-full mt-4"
                  alt="user img"
                />
                <p className="font-medium text-foreground/90">{data?.user?.name}</p>
              </div>
              <div className="h-[1px] w-[100%] bg-muted-foreground/20 my-5"></div>
              <Link href="/account">
                <div className="flex items-center gap-3 hover:text-muted-foreground">
                  <CircleUserRound size={18} />
                  Profile
                </div>
              </Link>
              <Link href="/account">
                <div className="flex items-center gap-3 mt-5 hover:text-muted-foreground">
                  <Settings size={18} />
                  Settings
                </div>
              </Link>
              <div className="h-[1px] w-[100%] bg-muted-foreground/20 my-5"></div>
              <div className="flex items-center gap-3 text-red-500 font-medium cursor-pointer" onClick={signOut}>
                <LogOut size={18} />
                Log out
              </div>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link href="/auth/signup">
            <Button variant="link">Sign up</Button>
          </Link>
          <Link href="/auth/signin">
            <Button className="rounded-full h-12 px-6">Log in</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
