import Link from "next/link";
import React from "react";
import SignOutButton from "./SignOutButton";

const Nav = () => {
  return (
    <nav className="h-12 bg-gray-300 text-gray-800  w-full flex items-center justify-start md:justify-center">
      <ul className="flex gap-8 text-[14px] md:text-[18px] ml-5 md:ml-0 ">
        <Link href={"/photos"}>
          <li className="hover:underline">Photos</li>
        </Link>
        <Link href={"/favorites"}>
          <li className="hover:underline">Favorites</li>
        </Link>
      </ul>
      <div className="absolute top-2 md:top-1 right-2 md:right-4">
        <SignOutButton />
      </div>
    </nav>
  );
};

export default Nav;
