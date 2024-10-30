"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Navbar = () => {
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
      <div className="flex items-center gap-2">
        <Link href="/auth/signup">
          <Button variant="link">Sign up</Button>
        </Link>
        <Link href="/auth/login">
          <Button className="rounded-full h-12 px-6">Log in</Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
