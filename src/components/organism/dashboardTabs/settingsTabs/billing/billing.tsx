import React from "react";
import { giftBoxImage } from "@utils/index";

export const Billing = () => {
  return (
    <div>
      <section className="w-full sm:h-auto h-auto">
        {/* Display a gift box image */}
        <img
          src={giftBoxImage}
          className="w-full md:w-[50%] lg:w-[40%] xl:w-[30%] m-auto my-10"
          alt="Gift Box"
        />

        {/* Display a message about the free service */}
        <p className="text-orange-500 md:text-lg text-center xl:w-[50%] m-auto">
          <span className="font-bold py-4 text-green-800">
            Great news! Our service is completely free of charge.
          </span>
          <br className="mb-5" />
          We're happy to offer this service to you for free, and we hope that
          you continue to find it helpful.
        </p>
      </section>
    </div>
  );
};
