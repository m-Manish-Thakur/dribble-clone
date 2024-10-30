import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="flex items-center flex-1 pl-[150px]">
      <div className="w-[450px]">
        <h2 className="text-2xl font-bold text-foreground/90">Sign in to Dribbble</h2>
        <Button className="rounded-full h-14 w-[100%] mt-8" variant="outline">
          <Image src="/images/google.svg" height={18} width={18} alt="google" className="mr-2" /> Sign in with Google
        </Button>

        <div className="flex gap-3 items-center mt-6 justify-center">
          <div className="h-[1px] w-[130px] bg-muted"></div>
          <p className="text-muted-foreground">or sign in with email</p>
          <div className="h-[1px] w-[130px] bg-muted"></div>
        </div>

        <div className="mt-6">
          <Label>Username or email</Label>
          <Input placeholder="Your email" className="w-[100%] h-14 mt-2 rounded-full px-6" />

          <br />

          <Label>Password</Label>
          <Input placeholder="********" className="w-[100%] h-14 mt-2 rounded-full px-6" />
        </div>

        <Button className="rounded-full h-14 w-[100%] mt-8 font-medium text-[15px]">Sign in</Button>

        <p className="text-muted-foreground mt-5 text-center">
          Don&apos;t have an account{" "}
          <Link href="/auth/signup" className="font-medium text-foreground/80 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
