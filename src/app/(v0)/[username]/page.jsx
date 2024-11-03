"use client";

import axios from "axios";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = ({ params }) => {
  const { username } = params;
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch user info when the component mounts
  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await axios.get(`/api/user/${username}`);
      const user = response.data?.data[0];
      setUserInfo(user);
    } catch (error) {
      console.log(error);
      if (error?.response) {
        toast.error(error?.response?.data?.msg);
      }
    }
  }, [username]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return (
    <div className="px-8 md:px-20">
      <div className="mt-10">
        <Image
          height={100}
          width={100}
          alt="user"
          src={userInfo?.image || "/images/user.avif"}
          className="border rounded-full"
        />
        <h2 className="text-[40px] font-bold text-foreground/80 mt-6">{userInfo?.name}</h2>
        <div className="flex items-center mt-6 text-lg text-foreground/70 flex-wrap gap-8">
          <div>{2626} followers</div>
          <div>{278} following</div>
          <div>{18928} likes</div>
        </div>
      </div>
    </div>
  );
};

export default Page;
