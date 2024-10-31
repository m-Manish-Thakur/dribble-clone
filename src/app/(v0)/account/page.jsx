"use client";

import General from "@/components/account/General";
import Password from "@/components/account/Password";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";

const Page = () => {
  const { data } = useSession();

  // Define tab names and components for each tab
  const tabs = [
    { name: "General", component: <General /> },
    { name: "Password", component: <Password /> },
    { name: "Social Profiles", component: <h2>Profile</h2> },
    { name: "Sessions", component: <h2>Sessions</h2> },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].name);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <div className="py-12 px-[20vw] w-[100%]">
        <div className="mx-auto flex items-center gap-4">
          <Image
            src={data?.user?.image || "/images/user.avif"}
            height={50}
            width={50}
            className="rounded-full"
            alt="user"
          />
          <div>
            <h2 className="font-medium text-lg text-foreground/90">
              {data?.user?.name} / {activeTab}
            </h2>
            <p className="text-muted-foreground text-sm mt-1">Set up your Dribbble presence and hiring needs</p>
          </div>
        </div>

        <div className="flex gap-20 items-start mt-16">
          {/* Tabs Navigation */}
          <div className="flex flex-col items-start gap-5">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => handleTabClick(tab.name)}
                className={`${activeTab === tab.name ? "text-foreground font-medium " : "text-muted-foreground"}`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 px-6">{tabs.find((tab) => tab.name === activeTab)?.component}</div>
        </div>
      </div>
    </>
  );
};

export default Page;
