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
          <h1 className="font-bold text-[52px]">Favorites</h1>
          <p className="font-semibold text-[24px] mb-4">
            See your favorite photos here
          </p>

          {/* <PhotoUploader /> */}
        </div>
        <PhotoGrid favorites={true} />
      </div>
      <div className="absolute top-4 right-4">
        <SignOutButton />
      </div>
    </main>
  );
};

export default Photos;
