import React from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

const SearchBox = () => {
  return (
    <div className="relative w-[100%]">
      <Input placeholder="What are you looking for?" className="h-14 rounded-full px-6 w-[100%] bg-muted/50" />
      <div className="h-10 w-10 flex items-center rounded-full justify-center bg-pink-500 absolute right-3 top-2">
        <Search size={18} color="white" />
      </div>
    </div>
  );
};

export default SearchBox;
