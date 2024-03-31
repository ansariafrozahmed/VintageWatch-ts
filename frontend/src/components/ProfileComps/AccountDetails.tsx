"use client";
import { BACKEND_URL } from "@/app/page";
import { Check, Mail, MapPin, Plus, User, Verified } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import ProfileUpdateForm from "./ProfileUpdateForm";
import { Form, Input, Modal, Tooltip } from "antd";
import Link from "next/link";
import { Button } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { useForm } from "antd/es/form/Form";

interface ProfileData {
  user_eligible_for_listing: boolean;
}

const AccountDetails: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const { data: session, status } = useSession();
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = useForm();

  const showModal = async (email: any) => {
    setIsModalOpen(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/sendOtpOnUserEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleOtpSubmit = async (values: any) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/verifyOTP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: profileData.user_email,
          otp: values.otp,
        }),
      });

      if (response.ok) {
        setIsModalOpen(false);
        setShouldRefetch(!shouldRefetch);
        form.resetFields();
        Swal.fire({
          title: "Success",
          text: "Email Verified Successfully!",
          icon: "success",
        });
        // Refresh data or update state as needed
      } else if (response.status === 400) {
        Swal.fire({
          title: "Wrong",
          text: "Invalid verification code!",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      // Handle error, show notification, etc.
      // Show error message
      Swal.fire({
        title: "Error",
        text: "Invalid OTP!",
        icon: "error",
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      if (session) {
        const profileId = session.user?.id;

        try {
          const response = await fetch(
            `${BACKEND_URL}/api/getUserProfileData/${profileId}`,
            {
              method: "POST",
            }
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result: ProfileData = await response.json();
          setProfileData(result);
          // console.log("Profile data fetched:", result);
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      } else {
        // console.log("Session not available");
      }
    };

    fetchProfileData();
  }, [shouldRefetch, session]);

  const handleProfileUpdate = () => {
    setShouldRefetch(!shouldRefetch);
  };

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

  // if (status === "loading" || !profileData) {
  //   console.log(status);

  //   return <span>Loading...</span>;
  // }

  return (
    <div className="flex flex-col lg:flex-row gap-5 w-full p-5 lg:py-5 lg:px-10">
      <div className="fixed z-50 bottom-5 right-5">
        <Link href={"/new-listing"}>
          <Button className="flex items-center gap-1 hover:scale-100 active:scale-95 tracking-widest font-medium">
            <Plus size={20} />
            <span className="hidden lg:block">New Listing</span>
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
                {profileData?.user_first_name} {profileData?.user_last_name}
              </h2>
              {profileData?.user_eligible_for_listing ? (
                <Tooltip title="Eligible for listing" color="green">
                  <Verified size={20} color="green" />
                </Tooltip>
              ) : (
                <Tooltip title="Not eligible for listing" color="red">
                  <Verified size={20} color="red" />
                </Tooltip>
              )}
            </div>
            {/* <h3 className="flex items-center gap-1 text-gray-700 font-medium">
              <MapPin size={20} /> {profileData.user_city}
            </h3> */}
            <div className="flex gap-1 items-center">
              <h3 className="flex items-center gap-1 text-gray-800 text-sm font-medium">
                <Mail size={18} /> {profileData?.user_email}
              </h3>
              {profileData?.user_email_verified ? (
                <>
                  <Check size={20} color="green" strokeWidth={3} />
                </>
              ) : (
                <span
                  onClick={() => showModal(profileData?.user_email)}
                  className="text-sm font-medium cursor-pointer text-red-500 underline"
                >
                  verify
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <ProfileUpdateForm
          data={profileData}
          onDataUpdate={handleProfileUpdate}
        />
      </div>
      <Modal open={isModalOpen} footer={null} onCancel={handleCancel}>
        <div className="pt-5 pb-3 space-y-1">
          <h2 className="text-2xl font-medium ">Verify your email</h2>
          <p>
            Please enter the 4 digit code you received on{" "}
            <span className="text-blue-gray-500 font-medium underline">
              {profileData?.user_email}
            </span>
          </p>
        </div>
        <p className="pb-2">
          <span className="font-medium text-red-500">Note :</span> You cannot
          change or edit your email after you verified your email
        </p>
        <Form name="otp" form={form} onFinish={handleOtpSubmit}>
          <Form.Item
            name="otp"
            rules={[
              {
                required: true,
                message: "Please enter the 4-digit OTP!",
              },
              { pattern: /^[0-9]{4}$/, message: "Invalid OTP format!" },
            ]}
          >
            <Input placeholder="Enter OTP" />
          </Form.Item>

          <Form.Item>
            <Button className="tracking-widest font-normal" type="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AccountDetails;
