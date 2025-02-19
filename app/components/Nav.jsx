import Link from "next/link";
import React from "react";
import SignOutButton from "./SignOutButton";

const Nav = () => {
  return (
    <nav className="h-12 bg-gray-300 text-gray-800  w-full flex items-center justify-center">
      <ul className="flex gap-8 text-[18px]">
        <Link href={"/photos"}>
          <li className="hover:underline">Photos</li>
        </Link>
        <Link href={"/favorites"}>
          <li className="hover:underline">Favorites</li>
        </Link>
      </ul>
      <div className="absolute top-1 right-4">
        <SignOutButton />
      </div>
    </nav>
  );
};

export default Nav;
