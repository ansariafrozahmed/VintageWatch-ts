"use client";
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Space } from "antd";
import Link from "next/link";
import { AtSign, LocateIcon, Lock, MapPin, User2 } from "lucide-react";
import { BACKEND_URL } from "@/app/page";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useForm } from "antd/es/form/Form";
import { signIn } from "next-auth/react";

const SignupForm: React.FC = () => {
  const [form] = useForm();
  const router = useRouter();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const onFinish = async (values: object) => {
    setSubmitting(true);

    const updatedValues = {
      ...values,
      user_createdAt: new Date().toISOString(),
    };
    try {
      const response = await fetch(`${BACKEND_URL}/api/userSignup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedValues),
      });

      if (response.ok) {
        form.resetFields();
        Swal.fire({
          title: "Success",
          text: "Registered Successfully!",
          icon: "success",
        }).then(() => {
          router.push("/auth/signin");
        });
      } else if (response.status === 400) {
        Swal.fire({
          title: "Please try Again",
          text: "Email Already Exist!",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Please try Again",
          text: "Internal Server Error!",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Please try Again",
        text: "Internal Server Error!",
        icon: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-[350px] space-y-2 py-3 lg:py-5">
        {/* <h2 className="font-logoFont mb-5 text-4xl text-left">Vintage Watch</h2> */}
        <h2 className="text-3xl font-semibold">Sign up</h2>
        <h3 className="text-gray-700 font-medium">
          Already have an account?{" "}
          <Link href={"/auth/signin"}>
            <span className="text-blue-500">Sign in</span>
          </Link>
        </h3>
      </div>
      <Form
        form={form}
        name="signup_form"
        className="signup-form w-[350px]"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        size="large"
      >
        <div className="flex gap-2">
          <Form.Item
            name="first_name"
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
            name="last_name"
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
          name="email"
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
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            prefix={<Lock size={15} strokeWidth={1.5} />}
            type="password"
            className="border-gray-500 py-2  text-base"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item
          name="city"
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
          name="terms-and-condition"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error("Please accept terms and conditions")
                    ),
            },
          ]}
        >
          <Checkbox className="font-medium">
            I have read the{" "}
            <a
              target="_blank"
              href="/terms-and-conditions"
              className="text-blue-500"
            >
              Terms & Condidtions
            </a>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="default"
            htmlType="submit"
            loading={submitting}
            className="login-form-button w-full bg-gray-800 text-white h-12 text-lg"
          >
            {submitting ? <span>Signing up..</span> : <span>Sign up</span>}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignupForm;
