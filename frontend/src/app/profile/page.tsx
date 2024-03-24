import SignOut from "@/components/Forms/SignOut";
import AccountDetails from "@/components/ProfileComps/AccountDetails";
import { MapPin } from "lucide-react";
import React from "react";

const ProfilePage = () => {
  return (
    <div className="px-16 py-5">
      {/* ----------------------- */}
      <AccountDetails />
      <SignOut />
    </div>
  );
};

export default ProfilePage;
