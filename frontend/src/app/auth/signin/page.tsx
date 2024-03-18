import SigninForm from "@/components/Forms/SigninForm";
import React from "react";

const SignInPage = () => {
  return (
    <div className="flex w-full h-[88svh]">
      <div className="w-[55%] h-full ">
        <img
          className="h-full w-full object-cover"
          src="https://images.pexels.com/photos/691640/pexels-photo-691640.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
      </div>
      <div className="w-[45%]">
        <SigninForm />
      </div>
    </div>
  );
};

export default SignInPage;
