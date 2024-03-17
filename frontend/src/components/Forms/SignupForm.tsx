"use client";
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Space } from "antd";
import Link from "next/link";
import { AtSign, LocateIcon, Lock, MapPin, User2 } from "lucide-react";

const SignupForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-[350px] space-y-2 py-5">
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
        name="signuo_form"
        className="signup-form w-[350px]"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        size="large"
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input
            prefix={<User2 size={15} strokeWidth={1.5} />}
            placeholder="Name"
            className="border-gray-500 py-2 text-base"
          />
        </Form.Item>

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
            className="login-form-button w-full bg-gray-800 text-white h-12 text-lg"
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
      <div className="w-[350px] -mt-3">
        <button
          type="button"
          className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
        >
          <span className="mr-2 inline-block">
            <svg
              className="h-6 w-6 text-rose-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
            </svg>
          </span>
          Sign up with Google
        </button>
      </div>
    </div>
  );
};

export default SignupForm;
