"use client";
import { BACKEND_URL } from "@/app/page";
import { MapPin, Plus, User, Verified } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import ProfileUpdateForm from "./ProfileUpdateForm";
import { Tooltip } from "antd";
import Link from "next/link";
import { Button } from "@material-tailwind/react";

interface ProfileData {
  user_eligible_for_listing: boolean;
}

const AccountDetails: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (session) {
        const profileId = session.user?.id;

        const response = await fetch(
          `${BACKEND_URL}/api/getUserProfileData/${profileId}`
        );
        const result: ProfileData = await response.json();
        setProfileData(result);
      }
    };

    fetchProfileData();
  }, [session]);

  if (status === "unauthenticated") {
    return (
      <div className="h-full py-20 w-full flex flex-col items-center justify-center">
        <Link href={"/auth/signin"}>
          <Button className="tracking-widest font-medium flex gap-1">
            <User size={15} />
            Please login first
          </Button>
        </Link>
      </div>
    );
  }

  if (status === "loading" || !profileData) {
    return <span>Loading...</span>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-5 w-full p-5 lg:py-5 lg:px-10">
      <div className="fixed z-50 bottom-5 left-5">
        <Link href={"/new-listing"}>
          <Button className="flex items-center gap-1 hover:scale-100 active:scale-95 tracking-widest font-medium">
            <Plus size={20} />
            New Listing
          </Button>
        </Link>
      </div>
      <div className="w-full lg:w-1/2">
        <div className="flex items-center gap-3 lg:gap-5  lg:py-5">
          <div className=" overflow-hidden rounded-full w-20 lg:w-24">
            <img
              className="h-full w-full object-cover"
              src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
              alt="Profile Picture"
            />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <h2 className="flex items-center gap-1 text-[1.3rem] font-SecondaryFont">
                Ansari Afroz Ahmed
              </h2>
              {profileData.user_eligible_for_listing ? (
                <Tooltip title="Eligible for listing" color="green">
                  <Verified color="green" />
                </Tooltip>
              ) : (
                <Tooltip title="Not eligible for listing" color="red">
                  <Verified color="red" />
                </Tooltip>
              )}
            </div>
            <h3 className="flex items-center gap-1 text-gray-700 font-medium">
              <MapPin size={20} /> Mumbai
            </h3>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <ProfileUpdateForm data={profileData} />
      </div>
    </div>
  );
};

export default AccountDetails;
