import SearchBox from "@/components/Common/SearchBox";
import { Badge } from "@/components/ui/badge";
import React from "react";

const Page = () => {
  return (
    <div className="bg-white min-h-[100vh]">
      <div className="flex items-center justify-center flex-col gap-4 pt-16">
        <h1 className="text-[65px] font-medium leading-[80px] text-foreground/90 text-center heading">
          Discover the world&apos;s <br /> top designers
        </h1>
        <p className="text-lg text-foreground/80 text-center w-[600px] mt-2">
          Explore work from the most talented and accomplished designers ready to take on your next project
        </p>
        <div className="w-[650px] mt-8">
          <SearchBox />
        </div>

        <div className="flex gap-3 items-center mt-5">
          <p className="text-[15px] text-muted-foreground">Trending Searches </p>
          <Badge variant="secondary" className="font-normal p-1 px-3 text-[13px]">
            landing page
          </Badge>
          <Badge variant="secondary" className="font-normal p-1 px-3 text-[13px]">
            e-commerce
          </Badge>
          <Badge variant="secondary" className="font-normal p-1 px-3 text-[13px]">
            mobile app
          </Badge>
          <Badge variant="secondary" className="font-normal p-1 px-3 text-[13px]">
            logo design
          </Badge>
          <Badge variant="secondary" className="font-normal p-1 px-3 text-[13px]">
            dashboard
          </Badge>
          <Badge variant="secondary" className="font-normal p-1 px-3 text-[13px]">
            icons
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default Page;
