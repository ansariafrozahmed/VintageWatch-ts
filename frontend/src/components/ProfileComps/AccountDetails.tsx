"use client";
import { BACKEND_URL } from "@/app/page";
import { Check, Mail, MapPin, Plus, User, Verified } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import ProfileUpdateForm from "./ProfileUpdateForm";
import { FloatButton, Form, Input, Modal, Skeleton, Tooltip } from "antd";
import Link from "next/link";
import { Button } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { useForm } from "antd/es/form/Form";
import ButtonGroup from "antd/es/button/button-group";

interface ProfileData {
  user_eligible_for_listing: boolean;
}

const AccountDetails: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const { data: session, status } = useSession();
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = useForm();
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [countdown, setCountdown] = useState(120);

  useEffect(() => {
    let timer: any;
    if (showOtpForm && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000); // Update countdown every second
    }
    return () => clearTimeout(timer);
  }, [showOtpForm, countdown]);

  const showModal = () => {
    setIsModalOpen(true);
    setShowOtpForm(false);
  };

  const handleOtp = async (email: string) => {
    setShowOtpForm(true);
    setCountdown(120);
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
    setShowOtpForm(false);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      if (session) {
        const profileId = session.user?.id;

        try {
          const response = await fetch(
            `${BACKEND_URL}/api/getUserProfileData/${profileId}`,
            {
              method: "GET",
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

  // if (status === "unauthenticated") {
  //   return (
  //     <div className="h-full py-20 w-full flex flex-col items-center justify-center">
  //       <Link href={"/auth/signin"}>
  //         <Button className="tracking-widest font-medium flex gap-1">
  //           <User size={15} />
  //           Please login first
  //         </Button>
  //       </Link>
  //     </div>
  //   );
  // }

  // if (status === "loading" || !profileData) {
  //   console.log(status);

  //   return <span>Loading...</span>;
  // }

  return (
    <div className="flex flex-col lg:flex-row gap-5 w-full p-5 lg:py-5 lg:px-10">
      <div className="fixed z-50 bottom-5 right-5">
        {profileData?.user_eligible_for_listing ? (
          <>
            <Link href={"/new-listing"}>
              <button
                className="align-middle hover:scale-105 select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] flex items-center gap-2"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  ></path>
                </svg>
                New Listing
              </button>
            </Link>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="w-full lg:w-1/2">
        {profileData ? (
          <>
            <div className="w-full flex flex-col lg:flex-row items-center gap-3 lg:gap-5  lg:py-5">
              <div className="overflow-hidden rounded-full min-w-24 max-w-20">
                <img
                  className="h-full w-full object-cover"
                  src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                  alt="Profile Picture"
                />
              </div>
              <div className="w-full">
                <div className="flex w-full items-center justify-center lg:justify-start gap-1">
                  <h2 className=" text-[1.3rem] font-SecondaryFont">
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
                <div className="flex gap-1 justify-center lg:justify-start items-center">
                  <h3 className="flex items-center gap-1 text-gray-800 text-sm font-medium">
                    <Mail size={15} /> {profileData?.user_email}
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
          </>
        ) : (
          <div className="w-full flex flex-col lg:flex-row items-center gap-3 lg:gap-5  lg:py-5">
            <Skeleton.Image active style={{ borderRadius: "100px" }} />
            <div className="w-full flex flex-col gap-2 items-center lg:items-start justify-center lg:justify-start">
              <Skeleton.Input active size="small" />
              <Skeleton.Input active size="small" block />
            </div>
          </div>
        )}
      </div>
      <div className="w-full lg:w-1/2 py-2 lg:py-0">
        <ProfileUpdateForm
          data={profileData}
          onDataUpdate={handleProfileUpdate}
        />
      </div>
      <Modal open={isModalOpen} footer={null} onCancel={handleCancel}>
        <div className="pt-5 space-y-1">
          <h2 className="text-2xl font-medium ">Verify your email</h2>
          <p>
            Please enter the 4 digit code you received on{" "}
            <span className="text-blue-gray-500 font-medium underline">
              {profileData?.user_email}
            </span>
          </p>
        </div>
        <p className="pb-5">
          <span className="font-medium text-red-500">Note :</span> You cannot
          change or edit your email after you verified your email
        </p>
        {showOtpForm ? (
          <>
            <div className="pb-3">
              {countdown > 0 ? (
                <p className="text-red-500">{`OTP expires in ${countdown} seconds`}</p>
              ) : (
                <span
                  className="font-medium text-blue-gray-500"
                  onClick={() => handleOtp(profileData?.user_email)}
                >
                  Resend OTP
                </span>
              )}
            </div>
            <Form
              name="otp"
              size="large"
              form={form}
              onFinish={handleOtpSubmit}
            >
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
                <Input
                  placeholder="Enter OTP"
                  className="border border-gray-500"
                />
              </Form.Item>

              <Form.Item>
                <Button className="tracking-widest font-normal" type="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </>
        ) : (
          <>
            <div className="py-3">
              <Button onClick={() => handleOtp(profileData?.user_email)}>
                Send OTP
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default AccountDetails;
