"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Google sign-in handler
  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn("google", { callbackUrl: "/", redirect: false });
      if (!result) throw new Error("Google sign-in failed.");
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  const handleSignInEmail = async () => {
    if (!email || !password) {
      toast.error("Enter email & password");
      return;
    }
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
        redirect: false,
      });

      if (result.error) {
        toast.error(result.error);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(error?.response.data?.msg);
      } else {
        toast.error("Something went wrong! try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center md:justify-start justify-center flex-1 pl-0 md:pl-[150px]">
      <div className="w-[90%] md:w-[450px]">
        <h2 className="text-2xl font-bold  text-foreground/90">Sign in to Dribbble</h2>
        <Button className="rounded-full h-14 w-[100%] mt-8" variant="outline" onClick={handleGoogleSignIn}>
          <Image src="/images/google.svg" height={18} width={18} alt="google" className="mr-2" /> Sign in with Google
        </Button>

        <div className="flex gap-3 items-center mt-6 justify-center">
          <div className="h-[1px] w-[50px] md:w-[130px] bg-muted"></div>
          <p className="text-muted-foreground">or sign in with email</p>
          <div className="h-[1px] w-[50px] md:w-[130px] bg-muted"></div>
        </div>

        <div className="mt-6">
          <Label>Username or email</Label>
          <Input
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[100%] h-14 mt-2 px-6"
          />

          <br />

          <Label>Password</Label>
          <Input
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[100%] h-14 mt-2 px-6"
          />
        </div>

        <Button
          className="rounded-full h-14 w-[100%] mt-8 font-medium text-[15px]"
          disabled={loading}
          onClick={handleSignInEmail}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Sign in
        </Button>

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
