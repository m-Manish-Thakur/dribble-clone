import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { uploadImage } from "@/utils/uploadImage";
import toast from "react-hot-toast";
import axios from "axios";
import { Loader2 } from "lucide-react";

const General = () => {
  const { data } = useSession();
  const [userInfo, setUserInfo] = useState({
    name: "",
    username: "",
    icon: null,
    bio: "",
    location: "",
    websiteUrl: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch user info when the component mounts
  const fetchUserInfo = useCallback(async () => {
    if (data?.user?.id) {
      try {
        const response = await axios.get(`/api/user/${data.user.id}/general`);
        const user = response.data?.data[0];
        setUserInfo({
          name: user?.name || "",
          username: user?.username || "",
          icon: user?.image || "/images/user.avif",
          bio: user?.profile?.bio || "",
          location: user?.profile?.location || "",
          websiteUrl: user?.profile?.websiteUrl || "",
        });
      } catch (error) {
        console.log(error);
        if (error?.response) {
          toast.error(error?.response?.data?.msg);
        }
      }
    }
  }, [data]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  const handleChange = useCallback((e) => setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value })), []);

  const handleImageUpload = useCallback(async (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = await uploadImage(file);
        setUserInfo((prev) => ({ ...prev, icon: imageUrl }));
        toast.success("Image uploaded successfully.");
      }
    } catch {
      toast.error("Error uploading image");
    }
  }, []);

  const handleSaveChanges = useCallback(async () => {
    setLoading(true);
    try {
      await axios.put(`/api/user/${data?.user?.id}/general`, userInfo);
      toast.success("Profile updated successfully.");
      fetchUserInfo(); // Refresh data after updating
    } catch (error) {
      console.log(error);
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
  }, [data, userInfo, fetchUserInfo]);

  return (
    <div>
      <div className="mx-auto flex items-center gap-6">
        <Image src={userInfo?.icon || "/images/user.avif"} height={70} width={70} className="rounded-full" alt="user" />

        <Button variant="outline" className="rounded-full">
          <label htmlFor="image">Upload Photo</label>
        </Button>

        <input type="file" id="image" className="hidden" onChange={handleImageUpload} />
        <Button variant="secondary" className="rounded-full">
          Delete
        </Button>
      </div>
      <br />
      <br />
      <Label className="text-base">Username</Label>
      <Input name="name" value={userInfo?.username} onChange={handleChange} className="h-12 px-4 text-[15px] mt-2" />
      <br />
      <Label className="text-base">Name</Label>
      <Input name="name" value={userInfo.name} onChange={handleChange} className="h-12 px-4 text-[15px] mt-2" />
      <br />
      <Label className="text-base">Email</Label>
      <Input value={data?.user?.email} disabled className="h-12 px-4 text-[15px] mt-2" />

      <br />

      <Label className="text-base">Location</Label>
      <Input name="location" value={userInfo.location} onChange={handleChange} className="h-12 px-4 text-[15px] mt-2" />

      <br />

      <Label className="text-base">Bio</Label>
      <Textarea name="bio" value={userInfo.bio} onChange={handleChange} className="h-12 px-4 text-[15px] mt-2" />
      <p className="text-sm text-muted-foreground mt-2">Brief description for your profile. URLs are hyperlinked.</p>

      <h2 className="font-bold text-foreground/70 mt-8">ONLINE PRESENCE</h2>
      <div className="h-[1px] w-[100%] bg-foreground/20 my-2"></div>
      <br />
      <Label className="text-base">Personal website URL</Label>
      <Input
        name="websiteUrl"
        value={userInfo.websiteUrl}
        onChange={handleChange}
        className="h-12 px-4 text-[15px] mt-2"
      />
      <p className="text-sm text-muted-foreground mt-2">Your home page, blog, or company site.</p>

      <div className="flex justify-end mt-8">
        <Button className="h-11 px-6 rounded-full" onClick={handleSaveChanges}>
          {loading && <Loader2 className="h-4 w-4 animate-spin mr-1" />} Save Changes
        </Button>
      </div>
    </div>
  );
};

export default General;
