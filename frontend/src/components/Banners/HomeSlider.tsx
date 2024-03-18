"use client";
import React from "react";
import { Carousel, Typography } from "@material-tailwind/react";

interface SlideDataItem {
  id: number;
  image: string;
  text: string;
}

const HeroSlider: React.FC = () => {
  const slideData: SlideDataItem[] = [
    {
      id: 1,
      image:
        "https://images.secondmovement.com/media/banners/hm-hero/rolex-desktop-20-11-2023.jpg",
      text: "Nothing more functional and fantastic than this Rolex Submariner Blueberry",
    },
    {
      id: 2,
      image:
        "https://images.secondmovement.com/media/banners/hm-hero/hublot-desktop-22-11-2023.jpg",
      text: "Nothing more functional and fantastic than this Rolex Submariner Blueberry",
    },
    {
      id: 3,
      image:
        "https://images.secondmovement.com/media/banners/hm-hero/jaeger-desktop-20-11-2023.jpg",
      text: "Nothing more functional and fantastic than this Rolex Submariner Blueberrys",
    },
  ];

  return (
    <Carousel
      className="h-[88vh]"
      loop={true}
      autoplay={true}
      prevArrow={() => <></>}
      nextArrow={() => <></>}
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      {slideData?.map((item) => (
        <div className="relative h-full w-full" key={item.id}>
          <img
            src={item.image}
            alt="image 2"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 grid h-full w-full items-end bg-gradient-to-t from-black">
            <div className="w-3/4 pl-5 md:w-[50%] md:pl-20 lg:pl-20 ">
              <Typography
                variant="h2"
                color="white"
                className="mb-20 text-[1.5rem] lg:text-[2.5rem] font-normal font-SecondaryFont"
              >
                {item.text}
              </Typography>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default HeroSlider;
