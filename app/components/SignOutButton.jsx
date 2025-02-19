import React from "react";

const SignOutButton = () => {
  return (
    <form action="/auth/signout" method="post">
      <button
        type="submit"
        className="w-[100px] h-[40px] rounded-full bg-gray-800 text-gray-200"
      >
        Sign out
      </button>
    </form>
  );
};

export default SignOutButton;
