import NewListingForm from "@/components/Forms/NewListingForm";
import { Info } from "lucide-react";
import React from "react";

const NewListingDetails = () => {
  return (
    <>
      <div className="relative px-5 py-8 md:p-10 lg:px-40 lg:py-10 space-y-5">
        <div>
          <h2 className="text-3xl lg:text-4xl">Listing Details</h2>
          <div className="flex gap-2 items-center border border-brown-500 p-3 rounded-lg my-2 shadow-sm">
            <div>
              <Info size={15} />
            </div>
            <h3 className="text-xs lg:text-sm">
              Please fill out the watch details correctly and make sure not to
              enter fake details, Miss leading may lead to your account banned.
            </h3>
          </div>
        </div>
        <hr />
        <NewListingForm />
      </div>
    </>
  );
};

export default NewListingDetails;
