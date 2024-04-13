import React from "react";
import { ItemContainer } from "./ItemContainer";

export default function Footer() {
  return (
    <>
      <div className="bg-gray-800 text-white w-full mt-auto">
        <div className="flex items-center justify-center h-full text-center">
          <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-bold md:w-2/5">
            OWL.
          </h1>
        </div>
        <ItemContainer />
        <hr className="my-5 border-gray-200" />
        <div className="flex items-center justify-center h-full text-center">
          <p className="mb-5">&copy;OWL Learning 2024. All Rights Reserved</p>
        </div>
      </div>
    </>
  );
}
