import React from "react";
import PhotoUploader from "./PhotoUploader";
import PhotoGrid from "./PhotoGrid";
import Nav from "./Nav";

const Photos = () => {
  return (
    <main className="flex flex-col justify-center items-center">
      <Nav />
      <div>
        <div className="text-center">
          <h1 className="font-bold text-[32px] md:text-[52px] mt-4">
            Photo Store
          </h1>
          <p className="font-semibold text-[14px] md:text-[24px] mb-8 md:mb-4">
            Space to store yout favorite photos
          </p>

          <PhotoUploader />
        </div>
        <PhotoGrid />
      </div>
    </main>
  );
};

export default Photos;
