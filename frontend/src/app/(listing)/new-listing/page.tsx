import Image from "next/image";
import Link from "next/link";
import React from "react";

const NewListing = () => {
  const steps = [
    {
      title: "Create a free listing",
      desc: "Start by registering or logging into your account. Fill out the details of your vintage watch, upload high-quality photos, set your asking price, and publish your listing to make it visible to potential buyers.",
    },
    {
      title: "Find potential buyers",
      desc: "Share your listing on social media platforms and relevant forums or groups to attract potential buyers. Engage with inquiries promptly, offer special promotions, and monitor your listing's performance to optimize visibility.",
    },
    {
      title: "Crack the deal!",
      desc: "Negotiate the final terms of the sale with interested buyers, ensuring secure payment and shipping arrangements. Pack your vintage watch securely, confirm receipt upon delivery, and complete the transaction smoothly.",
    },
  ];

  return (
    <div className="w-full ">
      <div className="flex px-5 py-7 lg:py-10 lg:px-28 flex-col lg:flex-row gap-10 w-full">
        <div className="w-full lg:w-1/2 my-auto space-y-1">
          <h2 className="text-[1.1rem] leading-tight lg:text-[1.2rem] text-brown-500 font-SecondaryFont">
            A watch becomes vintage when it is more than 20 – 25 years old.
          </h2>
          <h2 className="text-[3.5rem] lg:text-7xl font-medium leading-none font-SecondaryFont">
            Start Listing on vintage watch
          </h2>
          <h3 className="text-[1rem] font-SecondaryFont text-gray-800">
            What watch would you like to sell ?
          </h3>
        </div>
        <div className="w-full lg:w-1/2 h-auto lg:h-[350px] shadow-lg overflow-hidden rounded-2xl">
          <Image
            height={1000}
            width={1000}
            className="h-full w-full object-cover"
            src={
              "https://images.pexels.com/photos/1034064/pexels-photo-1034064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt="vinatge watch"
          />
        </div>
      </div>
      <div className="bg-gray-100 px-5 py-7 lg:py-12 lg:px-28">
        <div className="text-center">
          <h2 className="text-[1.1rem] leading-tight lg:text-[1.2rem] text-brown-500 font-SecondaryFont">
            Success in 3 Simple Steps!
          </h2>
          <h2 className="text-2xl lg:text-4xl font-medium leading-none font-SecondaryFont">
            How listing on Vintage Watch Works
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 py-12">
          {steps.map((item, index) => (
            <div key={index} className="space-y-2 text-center lg:text-left">
              <span className="text-brown-400 font-extrabold text-6xl">
                0{index + 1}
              </span>
              <h2 className="capitalize text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-800 text-[0.95rem]">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <Link href={"/new-listing/details"}>
            <button
              className="align-middle hover:scale-105 select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gradient-to-tr from-brown-900 to-brown-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] flex items-center gap-2"
              type="button"
            >
              {/* <svg
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
            </svg> */}
              Start Listing
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewListing;
