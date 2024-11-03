"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const Page = () => {
  // State to toggle visibility of the second div
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleContinueWithEmail = () => {
    setShowEmailForm(true); // Show the email form
  };

  // Google sign-in handler
  const handleGoogleSignUp = async () => {
    try {
      const result = await signIn("google", { callbackUrl: "/" });
      if (!result) throw new Error("Google sign-in failed.");
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  const handleSignUpEmail = async () => {
    if (!email || !userName || !password) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/auth/signup", {
        userName,
        email,
        password,
      });

      setUserName("");
      setEmail("");
      setPassword("");
      toast.success(response?.data?.msg);
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(error.response.data?.msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!showEmailForm && (
        <div className="flex items-center md:justify-start justify-center flex-1 pl-0 md:pl-[150px]">
          <div className="w-[90%] md:w-[450px]">
            <h2 className="text-2xl font-bold text-foreground/90">Sign up to Dribbble</h2>

            <Button className="rounded-full h-14 w-[100%] mt-8 font-medium text-[15px]" onClick={handleGoogleSignUp}>
              <Image src="/images/google.svg" height={18} width={18} alt="google" className="mr-2" /> Sign up with
              Google
            </Button>

            <div className="flex gap-3 items-center mt-6 justify-center">
              <div className="h-[1px] w-[170px] bg-muted"></div>
              <p className="text-muted-foreground">or</p>
              <div className="h-[1px] w-[170px] bg-muted"></div>
            </div>

            <Button
              className="rounded-full h-14 w-[100%] mt-8"
              variant="outline"
              onClick={handleContinueWithEmail} // Add onClick handler
            >
              Continue with email
            </Button>

            <p className="text-muted-foreground mt-6 text-center text-xs">
              By creating an account you agree with our <span className="underline">Terms of Service </span> ,{" "}
              <span className="underline">Privacy Policy </span>, and our default{" "}
              <span className="underline">Notification Settings</span>.
            </p>

            <p className="text-muted-foreground mt-6 text-center">
              Already have an account{" "}
              <Link href="/auth/signin" className="font-medium text-foreground/80 underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      )}

      {/* ---------------  Sign up with Email  ----------------- */}
      {showEmailForm && (
        <div className="flex items-center md:justify-start justify-center flex-1 pl-0 md:pl-[150px] relative">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full absolute left-[20px] md:left-[50px] top-[20px] md:top-[60px]"
            onClick={() => setShowEmailForm(false)}
          >
            <ChevronLeft size={24} />
          </Button>
          <div className="w-[90%] md:w-[450px]">
            <h2 className="text-2xl font-bold text-foreground/90">Sign up with Email</h2>

            <Label htmlFor="name" className="mt-8 block">
              Username
            </Label>
            <Input
              type="text"
              id="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter username"
              className="w-[100%] h-14 mt-3 px-5"
            />

            <Label htmlFor="email" className="mt-8 block">
              Email Address
            </Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-[100%] h-14 mt-3 px-5"
            />

            <Label htmlFor="password" className="mt-8 block">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-[100%] h-14 mt-3 px-5"
            />

            <div className="flex items-center space-x-2 mt-6">
              <Checkbox id="terms2" checked={checked} onCheckedChange={setChecked} />
              <label htmlFor="terms2" className="text-sm font-medium leading-none cursor-pointer text-foreground/70">
                I agree with terms and conditions
              </label>
            </div>

            <Button
              className="rounded-full h-14 w-[100%] mt-8"
              type="submit"
              onClick={handleSignUpEmail}
              disabled={loading || !checked}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Create Account
            </Button>

            <p className="text-muted-foreground mt-6 text-center text-xs">
              By signing up, you agree to our <span className="underline">Terms of Service </span> and{" "}
              <span className="underline">Privacy Policy</span>.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
