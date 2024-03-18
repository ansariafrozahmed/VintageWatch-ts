"use client";
import { Button } from "antd";
import { signOut } from "next-auth/react";
import React from "react";
import Swal from "sweetalert2";

const SignOut = () => {
  const handleSignOut = async () => {
    await signOut({
      redirect: false,
    });
    Swal.fire({
      title: "Success!",
      text: "Successfully Signout!",
      icon: "success",
    });
  };
  return (
    <div className="p-10">
      <Button type="default" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
};

export default SignOut;
