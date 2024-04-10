import Link from "next/link";
import React from "react";

const Card = () => {
  return (
    <>
      <Link
        href={"/listing/listing-name"}
        className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
      >
        <div className="aspect-[3/4]">
          <img
            className="object-cover object-center h-full w-full"
            src="https://images.pexels.com/photos/47856/rolex-wrist-watch-clock-gmt-47856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
        <div className="p-4 text-black/[0.9] space-y-1">
          <h2 className="text-sm text-gray-700 font-medium">Rolex</h2>
          <h2 className="text-base leading-snug line-clamp-1">
            Vintage watch eligant watch in now available
          </h2>
          <div className="flex items-center ">
            <p className="mr-2 text-lg text-gray-700 font-semibold">$20.00</p>
            <p className="ml-auto text-sm font-medium text-green-500">
              New Deal
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
