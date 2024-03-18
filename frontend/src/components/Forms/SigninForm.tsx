"use client";
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useForm } from "antd/es/form/Form";

const SigninForm: React.FC = () => {
  const { status } = useSession();
  const [form] = useForm();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const onFinish = async (values: any) => {
    setSubmitting(true);
    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (response?.error) {
        // Handle sign-in error
        console.error(response.error);
      } else {
        form.resetFields();
        Swal.fire({
          title: "Success!",
          text: "Logged In Successfully!",
          icon: "success",
        }).then(() => {
          router.push("/");
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "Internal Server Error!",
        icon: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-[350px] space-y-2 py-5">
        {/* <h2 className="font-logoFont mb-5 text-4xl text-left">Vintage Watch</h2> */}
        <h2 className="text-3xl font-semibold">Sign in</h2>
        <h3 className="text-gray-700 font-medium">
          Don't have an account?{" "}
          <Link href={"/auth/signup"}>
            <span className="text-blue-500">Sign Up</span>
          </Link>
        </h3>
      </div>
      <Form
        form={form}
        name="login_form"
        className="login-form w-[350px]"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        size="large"
      >
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
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            className="border-gray-500 py-2 text-base"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            className="border-gray-500 py-2  text-base"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="default"
            htmlType="submit"
            loading={submitting}
            className="login-form-button w-full bg-gray-800 text-white h-12 text-lg"
          >
            {submitting ? <span>Logging...</span> : <span>Log in</span>}
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
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SigninForm;
