"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  type FormProps,
  Input,
  InputNumber,
  message,
  Upload,
  type UploadProps,
  Modal,
} from "antd";
import {
  AtSign,
  Check,
  Mail,
  MailCheck,
  MapPin,
  Phone,
  Store,
  User2,
} from "lucide-react";
import TextArea from "antd/es/input/TextArea";
// import { useSession } from "next-auth/react";
import { BACKEND_URL } from "@/app/page";
import Swal from "sweetalert2";

const ProfileUpdateForm: React.FC = ({ data, onDataUpdate }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = async (data: any) => {
    setIsModalOpen(true);
    console.log(data);

    // try {
    //   const response = await fetch(`${BACKEND_URL}/api/sendOtpOnUserEmail`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email }),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Failed to send OTP");
    //   }
    // } catch (error) {
    //   console.error("Error sending OTP:", error);
    //   // Handle error, show notification, etc.
    // }
  };

  const handleOtpSubmit = async (values: any) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/verifyOTP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.user_email,
          otp: values.otp,
        }),
      });

      if (response.ok) {
        // OTP verification successful, show success message
        // Close the modal
        setIsModalOpen(false);
        // Show success message
        Swal.fire({
          title: "Success",
          text: "OTP Verified Successfully!",
          icon: "success",
        });
        // Refresh data or update state as needed
      } else {
        throw new Error("Invalid OTP");
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

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    form.setFieldsValue(data);
  }, []);

  const props: UploadProps = {
    name: "file",
    multiple: false,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const onFinish = async (values: object) => {
    // console.log(values);

    setSubmitting(true);
    try {
      if (!data) {
        return;
      }

      const updatedValues = {
        ...values,
        user_updatedAt: new Date().toISOString(),
      };

      const response = await fetch(
        `${BACKEND_URL}/api/updateUserProfileData/${data.user_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedValues),
        }
      );
      if (response.ok) {
        setSubmitting(false);
        onDataUpdate();
        Swal.fire({
          title: "Success!",
          text: "Updation Success!",
          icon: "success",
        });
      } else if (response.status === 400) {
        setSubmitting(false);
        Swal.fire({
          title: "Failed!",
          text: "Phone number already exists!",
          icon: "error",
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

  const lastUpdate = new Date(data.user_updated_at).toLocaleDateString();

  return (
    <div className="max-w-[600px]">
      <div className="leading-tight">
        <h2 className="text-[1.2rem] lg:text-[1.5rem] font-medium">
          Update your profile details
        </h2>
        <p className="text-gray-800 text-[0.8rem] lg:text-[0.9rem]">
          Keep your profile upto date to become eligible for listing..
        </p>
      </div>
      <div className="py-5">
        <h2 className="py-2 px-4 text-gray-100 bg-gradient-to-r from-green-400 to-white rounded-lg font-medium text-xs">
          Last updated on : {lastUpdate}
        </h2>
      </div>
      <Form
        form={form}
        name="update_form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        size="large"
      >
        {/* <Form.Item
          name="user_profile_picture"
          className="w-fuull"
          rules={[
            {
              required: true,
              message: "Please input your first name!",
            },
          ]}
        >
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item> */}
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
          className="w-full"
          rules={[
            {
              required: true,
              message: "Please input your email!",
              type: "email",
            },
          ]}
        >
          <Input
            disabled={data.user_email_verified}
            prefix={<Mail size={15} strokeWidth={1.5} />}
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
          <InputNumber
            prefix={<MapPin size={15} strokeWidth={1.5} />}
            placeholder="Zip Code"
            className="border-gray-500  w-full text-base"
          />
        </Form.Item>

        <div className="flex gap-2 items-center">
          <Form.Item
            name="user_phone_code"
            className="w-[80px]"
            rules={[
              {
                required: true,
                message: "code",
              },
            ]}
          >
            <InputNumber
              //   prefix={<User2 size={15} strokeWidth={1.5} />}
              placeholder="+1"
              className="border-gray-500 w-full text-base"
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
            <InputNumber
              prefix={<Phone size={15} strokeWidth={1.5} />}
              placeholder="phone number"
              className="border-gray-500 w-full text-base"
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
