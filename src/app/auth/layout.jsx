import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-[100vh]">
      <div className="w-[400px]">
        <video src="/images/signup.mp4" autoPlay={true} className="h-full aspect-video object-cover" muted loop />
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
