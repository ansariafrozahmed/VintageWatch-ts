import Card from "@/components/ProductCard/Card";
import React from "react";

const MyListing = () => {
  return (
    <div className="px-3 py-5 lg:px-10 lg:py-5">
      <h2 className="font-SecondaryFont text-3xl">My Listings</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5 py-5">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default MyListing;
