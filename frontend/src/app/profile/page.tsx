import SignOut from "@/components/Forms/SignOut";
import AccountDetails from "@/components/ProfileComps/AccountDetails";
import { MapPin } from "lucide-react";
import { getServerSession } from "next-auth";
import React from "react";
import { BACKEND_URL } from "../page";

const ProfilePage = async () => {
  const data = await getServerSession();
  const id = data?.user?.name?.id;

  let profileData = null;

  if (id) {
    const fetchProfileData = async () => {
      const response = await fetch(
        `${BACKEND_URL}/api/getUserProfileData/${id}`,
        {
          next: { revalidate: 10 },
        }
      );
      const data = await response.json();
      return data;
    };

    profileData = await fetchProfileData();
  }

  return (
    <div className="px-16 py-5">
      <h2 className="text-3xl font-medium">My Account</h2>
      <span>{JSON.stringify(profileData)}</span>
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
      {/* ----------------------- */}
      <SignOut />
      <AccountDetails />
    </div>
  );
};

export default ProfilePage;
