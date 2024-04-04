"use client";
import {
  Form,
  Input,
  type FormProps,
  Button,
  Select,
  InputNumber,
  Divider,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  InfoCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import React from "react";
import { useForm } from "antd/es/form/Form";

type FieldType = {
  type_of_watch?: string;
  brand?: string;
  model?: string;
  reference_number?: string;
  condition?: string;
  scope_of_delivery?: string;
  gender?: string;
  movement?: string;
  description?: string;
  price?: number;
};

const prefixSelector = (
  <Form.Item
    name="price_currency"
    rules={[{ required: true, message: "Please select your currency!" }]}
    noStyle
  >
    <Select style={{ width: 70 }}>
      <Select.Option value="INR">INR</Select.Option>
      <Select.Option value="USD">USD</Select.Option>
    </Select>
  </Form.Item>
);

const NewListingForm: React.FC = () => {
  const [form] = useForm();
  const selectAfter = (
    <Select defaultValue="INR">
      <Select.Option value="INR">INR</Select.Option>
      <Select.Option value="USD">USD</Select.Option>
    </Select>
  );
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="w-full lg:flex gap-10">
      <div className="h-full w-full lg:w-[70%]">
        <Form
          name="vw-listing-form"
          size="large"
          form={form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          labelCol={{ span: 5 }}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
          className="font-medium"
        >
          <div className="">
            <div className="flex gap-2 items-center">
              <h2 className="font-SecondaryFont text-3xl">Offer</h2>
              <h3 className="font-medium text-xs">
                ( <span className="text-red-500 text-lg">*</span> Required
                Fields )
              </h3>
            </div>
            <Divider />
          </div>
          <Form.Item<FieldType>
            label="Type Of Watch"
            name="type_of_watch"
            rules={[
              { required: true, message: "Please select your watch type!" },
            ]}
          >
            <Select allowClear>
              <Select.Option value="wrist-watch">Wrist Watch</Select.Option>
              <Select.Option value="pocket-watch">Pocket Watch</Select.Option>
              <Select.Option value="other-watch">Other Watch</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            label="Brand"
            name="brand"
            rules={[
              { required: true, message: "Please enter your watch brand!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Model"
            name="model"
            rules={[
              { required: true, message: "Please enter your watch model!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Reference Number"
            name="reference_number"
            tooltip={{
              title:
                "You can usually find the reference number on the case back, lugs, dial, or in your watch's documents. You also may find it by searching on the internet.",
              icon: <InfoCircleOutlined />,
            }}
            rules={[
              {
                required: false,
                message: "Please enter your watch reference number!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Condition"
            name="condition"
            rules={[
              {
                required: true,
                message: "Please select your watch condition!",
              },
            ]}
          >
            <Select allowClear>
              <Select.Option value="unworm">Unworn</Select.Option>
              <Select.Option value="verygood">Very Good</Select.Option>
              <Select.Option value="good">Good</Select.Option>
              <Select.Option value="fair">Fair</Select.Option>
              <Select.Option value="poor">Poor</Select.Option>
              <Select.Option value="incomplete">Imcomplete</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            label="Scope Of Delivery"
            name="scope_of_delivery"
            tooltip={{
              title:
                "The watch's original box and papers make your listing even more attractive.",
              icon: <InfoCircleOutlined />,
            }}
            rules={[
              {
                required: true,
                message: "Please select your watch scope of delivery!",
              },
            ]}
          >
            <Select allowClear>
              <Select.Option value="watch_only">Watch Only</Select.Option>
              <Select.Option value="watch_with_original_box">
                Watch with Original Box
              </Select.Option>
              <Select.Option value="watch_with_original_papers">
                Watch with Original Papers
              </Select.Option>
              <Select.Option value="watch_with_original_box_and_papers">
                Watch with Original Box & Original Papers
              </Select.Option>
            </Select>
          </Form.Item>

          <div className=" ">
            <div className="flex gap-2 items-center">
              <h2 className=" font-SecondaryFont text-3xl">Basic Info</h2>
              <h3 className="font-medium text-xs">
                ( <span className="text-red-500 text-lg">*</span> Required
                Fields )
              </h3>
            </div>
            <Divider />
          </div>

          <Form.Item<FieldType>
            label="Gender"
            name="gender"
            rules={[
              {
                required: false,
                message: "Please select your watch gender type!",
              },
            ]}
          >
            <Select allowClear>
              <Select.Option value="men_watch">Men's Watch</Select.Option>
              <Select.Option value="women_watch">Women's Watch</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            label="Movement"
            name="movement"
            rules={[
              {
                required: false,
                message: "Please select your watch movement!",
              },
            ]}
          >
            <Select allowClear>
              <Select.Option value="automatic">Automatic</Select.Option>
              <Select.Option value="manual_winding">
                Manual Winding
              </Select.Option>
              <Select.Option value="quartz">Quartz</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            label="Description"
            name="description"
            rules={[
              {
                required: false,
                message: "Please enter your watch description!",
              },
            ]}
          >
            <TextArea
              className="!h-24"
              placeholder="For example, Where did you buy your watch ? Does it still have a warranty ? Has it been repaired ? Is the watch damaged ?"
            />
          </Form.Item>

          <div className=" ">
            <div className="flex gap-2 items-center">
              <h2 className=" font-SecondaryFont text-3xl">Price</h2>
              <h3 className="font-medium text-xs">
                ( <span className="text-red-500 text-lg">*</span> Required
                Fields )
              </h3>
            </div>
            <Divider />
          </div>

          <Form.Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
          </Form.Item>

          <div className=" ">
            <div className="flex gap-2 items-center">
              <h2 className=" font-SecondaryFont text-3xl">
                Additional Features
              </h2>
              <h3 className="font-medium text-xs">( Optional )</h3>
            </div>
            <Divider />
          </div>

          <Form.List
            name="additional_features"
            // rules={[
            //   {
            //     validator: async (_, names) => {
            //       if (!names || names.length < 2) {
            //         return Promise.reject(new Error("At least 2 passengers"));
            //       }
            //     },
            //   },
            // ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item label={"Feature"} required={false} key={field.key}>
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: false,
                          whitespace: true,
                          message: "Please input feature or delete this field.",
                        },
                      ]}
                      noStyle
                    >
                      <Input style={{ width: "90%" }} />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button ml-2"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item wrapperCol={{ offset: 5 }}>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add Feature
                  </Button>
                  {/* <Form.ErrorList errors={errors} /> */}
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item wrapperCol={{ offset: 5 }}>
            <Button
              type="default"
              className="align-middle select-none font-sans font-normal hover:!text-white hover:!bg-gradient-to-tr text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm tracking-wider py-3 px-6 rounded-lg bg-gradient-to-tr from-brown-900 to-brown-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] flex items-center gap-2"
              htmlType="submit"
            >
              Submit Listing
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="sticky h-full top-[100px] hidden lg:block w-[30%]">
        PRODUCT PREVIEW
      </div>
    </div>
  );
};

export default NewListingForm;
