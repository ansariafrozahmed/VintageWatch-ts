"use client";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { BACKEND_URL } from "@/app/page";

const ProductSlider = () => {
  return (
    <div className="py-10 lg:py-20 mx-5 lg:mx-14">
      <div className="flex items-center justify-between leading-none font-SecondaryFont">
        <div>
          <h3 className="md:text-xl">Check out !</h3>
          <h2 className="text-3xl md:text-5xl">NewArrivals</h2>
        </div>
        <div className="group">
          <Link className="flex items-center gap-1" href={"/"}>
            <h2 className=" md:text-xl">View All</h2>
            <ChevronRight
              strokeWidth={1}
              className="transition-all ease-in-out group-hover:scale-150"
            />
          </Link>
        </div>
      </div>
      <div>
        <Swiper
          className="!py-10"
          spaceBetween={10}
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Navigation, Pagination]}
          slidesPerView={6}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            // when window width is >= 1200px (desktop)
            1200: {
              slidesPerView: 5,
            },
            1000: {
              slidesPerView: 5,
            },
            800: {
              slidesPerView: 4,
            },
            600: {
              slidesPerView: 3,
            },
            400: {
              slidesPerView: 2,
            },
            300: {
              slidesPerView: 2,
            },
          }}
        >
          {Array(10)
            .fill()
            .map((index) => (
              <SwiperSlide key={index}>
                <div className="border border-gray-600 shadow-md ">
                  <Link href={"/"}>
                    <div className="aspect-[3/4]">
                      <img
                        className="object-cover object-center h-full w-full"
                        src="https://images.pexels.com/photos/47856/rolex-wrist-watch-clock-gmt-47856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt=""
                      />
                    </div>
                    <div className="px-5 py-2 space-y-1 text-center">
                      <h2 className="text-gray-700 text-sm">Rolex</h2>
                      <h3 className="line-clamp-1">
                        Vintage watch and many more watches
                      </h3>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          <div className="swiper-button-next !text-white"></div>
          <div className="swiper-button-prev !text-white"></div>
        </Swiper>
      </div>
    </div>
  );
};

export default ProductSlider;
