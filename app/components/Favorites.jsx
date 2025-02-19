import React from "react";
import SignOutButton from "./SignOutButton";
import PhotoGrid from "./PhotoGrid";
import Nav from "./Nav";

const Photos = () => {
  return (
    <main className="flex flex-col justify-center items-center">
      <Nav />
      <div>
        <div className="text-center">
          <h1 className="font-bold text-[32px] md:text-[52px] mt-4">
            Favorites
          </h1>
          <p className="font-semibold text-[14px] md:text-[24px] mb-8 md:mb-4">
            See your favorite photos here
          </p>

          {/* <PhotoUploader /> */}
        </div>
        <PhotoGrid favorites={true} />
      </div>
    </main>
  );
};

export default Photos;
