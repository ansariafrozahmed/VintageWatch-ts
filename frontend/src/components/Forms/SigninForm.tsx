"use client";
import React, { useEffect, useState } from "react";
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

      if (response?.ok) {
        form.resetFields();
        Swal.fire({
          title: "Success!",
          text: "Logged In Successfully!",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Unauthorized!",
          text: "Please enter correct credentials!",
          icon: "error",
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

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);

  if (status === "loading") {
    return <span>Loading...</span>;
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
    </div>
  );
};

export default SigninForm;
