"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, type FormProps, Input } from "antd";
import SignOut from "../Forms/SignOut";
import { AtSign, MapPin, Phone, Store, User2 } from "lucide-react";
import TextArea from "antd/es/input/TextArea";
import { useSession } from "next-auth/react";
import { BACKEND_URL } from "@/app/page";
import Swal from "sweetalert2";

const ProfileUpdateForm: React.FC = () => {
  const [form] = Form.useForm();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);

  let profileId = session?.user?.id;

  const fetchProfileData = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/getUserProfileData/${profileId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }
      const result = await response.json();
      //   console.log(result);
      form.setFieldsValue(result);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchProfileData();
    }
  }, []);

  const onFinish = async (values: any) => {
    setSubmitting(true);

    try {
      if (!profileId) {
        // If profileId is null, don't proceed with the update
        return;
      }
      const response = await fetch(
        `${BACKEND_URL}/api/updateUserProfileData/${profileId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (response.ok) {
        setSubmitting(false);
        Swal.fire({
          title: "Success!",
          text: "Updation Success!",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Failed!",
          text: "Updation Failed!",
          icon: "error",
        });
      }
    } catch (error) {
      console.log("Internal Server Error");
    } finally {
      setSubmitting(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="max-w-[600px]">
      <SignOut />
      <h2 className="text-xl font-medium py-4">Update your profile details</h2>
      <Form
        form={form}
        name="update_form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        size="large"
      >
        <div className="flex gap-2 items-center">
          <Form.Item
            name="user_first_name"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Please input your first name!",
              },
            ]}
          >
            <Input
              prefix={<User2 size={15} strokeWidth={1.5} />}
              placeholder="First Name"
              className="border-gray-500 py-2 text-base"
            />
          </Form.Item>

          <Form.Item
            className="w-full"
            name="user_last_name"
            rules={[
              {
                required: true,
                message: "Please input your last name!",
              },
            ]}
          >
            <Input
              prefix={<User2 size={15} strokeWidth={1.5} />}
              placeholder="Last Name"
              className="border-gray-500 py-2 text-base"
            />
          </Form.Item>
        </div>

        <Form.Item
          name="user_email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
              type: "email",
            },
          ]}
        >
          <Input
            prefix={<AtSign size={15} strokeWidth={1.5} />}
            placeholder="Email"
            className="border-gray-500 py-2 text-base"
          />
        </Form.Item>

        <Form.Item
          name="user_country"
          rules={[
            {
              required: true,
              message: "Please input your country name!",
            },
          ]}
        >
          <Input
            prefix={<MapPin size={15} strokeWidth={1.5} />}
            placeholder="Country"
            className="border-gray-500 py-2 text-base"
          />
        </Form.Item>

        <Form.Item
          name="user_state"
          rules={[
            {
              required: true,
              message: "Please input your state name!",
            },
          ]}
        >
          <Input
            prefix={<MapPin size={15} strokeWidth={1.5} />}
            placeholder="State"
            className="border-gray-500 py-2 text-base"
          />
        </Form.Item>

        <Form.Item
          name="user_city"
          rules={[
            {
              required: true,
              message: "Please input your city!",
            },
          ]}
        >
          <Input
            prefix={<MapPin size={15} strokeWidth={1.5} />}
            placeholder="City"
            className="border-gray-500 py-2 text-base"
          />
        </Form.Item>

        <Form.Item
          name="user_zip_code"
          rules={[
            {
              required: true,
              message: "Please input your zip code!",
            },
          ]}
        >
          <Input
            prefix={<MapPin size={15} strokeWidth={1.5} />}
            placeholder="Zip Code"
            className="border-gray-500 py-2 text-base"
          />
        </Form.Item>

        <div className="flex gap-2 items-center">
          <Form.Item
            name="user_phone_code"
            className="w-[60px]"
            rules={[
              {
                required: true,
                message: "code",
              },
            ]}
          >
            <Input
              //   prefix={<User2 size={15} strokeWidth={1.5} />}
              placeholder="+1"
              className="border-gray-500 py-2 text-base"
            />
          </Form.Item>

          <Form.Item
            className="w-full"
            name="user_phone_number"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input
              prefix={<Phone size={15} strokeWidth={1.5} />}
              placeholder="phone number"
              className="border-gray-500 py-2 text-base"
            />
          </Form.Item>
        </div>

        <Form.Item
          name="user_store_name"
          rules={[
            {
              required: true,
              message: "Please input your store name!",
            },
          ]}
        >
          <Input
            prefix={<Store size={15} strokeWidth={1.5} />}
            placeholder="Store Name"
            className="border-gray-500 py-2 text-base"
          />
        </Form.Item>

        <Form.Item
          name="user_store_bio"
          rules={[
            {
              required: true,
              message: "Please input your store bio!",
            },
          ]}
        >
          <TextArea
            placeholder="Store Bio"
            className="border-gray-500 py-2 !h-40 text-base"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="default"
            htmlType="submit"
            loading={submitting}
            className="login-form-button bg-gray-900 text-white h-10 font-medium uppercase tracking-wider px-5"
          >
            {submitting ? <>UPDATING...</> : <>UPDATE</>}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfileUpdateForm;
