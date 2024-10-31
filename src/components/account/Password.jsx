import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Password = () => {
  return (
    <div>
      <Label className="text-base">Old Password</Label>
      <Input className="h-12 px-4 text-[15px] mt-2" />

      <br />

      <Label className="text-base">New Password</Label>
      <Input className="h-12 px-4 text-[15px] mt-2" />
      <p className="text-sm text-muted-foreground mt-2">Minimum 6 characters</p>

      <div className="flex justify-end mt-8">
        <Button className="h-11 px-6 rounded-full">Save Password</Button>
      </div>
    </div>
  );
};

export default Password;
