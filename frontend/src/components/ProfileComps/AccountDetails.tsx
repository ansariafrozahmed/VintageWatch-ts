"use client";
import { BACKEND_URL } from "@/app/page";
import { MapPin } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import ProfileUpdateForm from "./ProfileUpdateForm";

const AccountDetails: React.FC = () => {
  const [profileData, setProfileData] = useState<string>("");
  const { data: session, status } = useSession();
  let profileId: string;

  useEffect(() => {
    const fetchProfileData = async () => {
      if (session) {
        profileId = session?.user?.id;

        const response = await fetch(
          `${BACKEND_URL}/api/getUserProfileData/${profileId}`
        );
        const result = await response.json();
        setProfileData(result);
      }
    };

    fetchProfileData();
  }, [session]);

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  return (
    <div>
      <h2 className="text-3xl font-medium">My Account</h2>
      <div className="flex items-center gap-5 py-5">
        <div className="h-28 overflow-hidden rounded-full w-28">
          <img
            className="h-full w-full object-cover"
            src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
            alt=""
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Ansari Afroz Ahmed</h2>
          <h3 className="flex items-center gap-1 text-gray-700 font-medium">
            <MapPin size={20} /> Mumbai
          </h3>
        </div>
      </div>
      <hr />
      <div className="py-2">
        <ProfileUpdateForm />
      </div>
    </div>
  );
};

export default AccountDetails;
