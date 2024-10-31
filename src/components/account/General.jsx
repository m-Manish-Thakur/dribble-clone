import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const General = () => {
  const { data } = useSession();
  return (
    <div>
      <div className="mx-auto flex items-center gap-6">
        <Image
          src={data?.user?.image || "/images/user.avif"}
          height={70}
          width={70}
          className="rounded-full"
          alt="user"
        />
        <Button variant="outline" className="rounded-full">
          Upload Photo
        </Button>
        <Button variant="secondary" className="rounded-full">
          Delete
        </Button>
      </div>
      <br />
      <br />
      <Label className="text-base">Name</Label>
      <Input placeholder="Your name" className="h-12 px-4 text-[15px] mt-2" />
      <br />
      <Label className="text-base">Email</Label>
      <Input
        placeholder="Your name"
        value={"manishthakur231690@gmail.com"}
        disabled
        className="h-12 px-4 text-[15px] mt-2"
      />

      <br />

      <Label className="text-base">Location</Label>
      <Input className="h-12 px-4 text-[15px] mt-2" />

      <br />

      <Label className="text-base">Bio</Label>
      <Textarea className="h-12 px-4 text-[15px] mt-2" />
      <p className="text-sm text-muted-foreground mt-2">Brief description for your profile. URLs are hyperlinked.</p>

      <h2 className="font-bold text-foreground/70 mt-8">ONLINE PRESENCE</h2>
      <div className="h-[1px] w-[100%] bg-foreground/20 my-2"></div>
      <br />
      <Label className="text-base">Personal website URL</Label>
      <Input className="h-12 px-4 text-[15px] mt-2" />
      <p className="text-sm text-muted-foreground mt-2">Your home page, blog, or company site.</p>

      <div className="flex justify-end mt-8">
        <Button className="h-11 px-6 rounded-full">Save Changes</Button>
      </div>
    </div>
  );
};

export default General;
