"use client";
import { React, useState } from "react";
import supabase from "@/app/utils/supabaseClient";
import { useRouter } from "next/navigation";

const AuthForm = () => {
  const [isNewUser, setIsNewUser] = new useState(false);
  const [email, setEmail] = new useState("");
  const [password, setPassword] = new useState("");
  const [isSigningIn, setisSigningIn] = new useState(false);
  const [isSigningUp, setisSigningUp] = new useState(false);
  const router = useRouter();

  async function handleSignUp(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (!error) {
      setisSigningUp(true);
    }
    console.log({ data, error });
  }

  async function handleSignIn(e) {
    e.preventDefault();
    setisSigningIn(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log({ error, data });

    if (!error) {
      router.push("/photos");
    } else {
      setisSigningIn(false);
    }
  }

  let signInMessage = "Sign In";

  if (isSigningIn) {
    signInMessage = "Signing In";
  } else if (isNewUser) {
    signInMessage = "Sign Up";
  }

  const signUpMessage = (
    <p>Email Sent! Please check your email to confirm Sign up.</p>
  );

  return (
    <form
      className="flex flex-col gap-4 pt-6 items-center justify-center"
      onSubmit={isNewUser ? handleSignUp : handleSignIn}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="text-gray-800 bg-gray-300 h-[50px] w-[300px] px-3 border-2 rounded-xl outline-none"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        className="text-gray-800 bg-gray-300 h-[50px] w-[300px] px-3 border-2 rounded-xl outline-none"
      />
      <button
        type="submit"
        className="w-[150px] h-[50px] rounded-full bg-gray-900 text-gray-100"
      >
        {signInMessage}
      </button>
      <p className="text-center mt-10">
        {isNewUser ? (
          <>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setIsNewUser(false)}
              className="text-blue-950 underline"
            >
              Sign In
            </button>
          </>
        ) : (
          <>
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => setIsNewUser(true)}
              className="text-blue-950 underline"
            >
              Sign Up
            </button>
          </>
        )}
      </p>
      {isSigningUp && signUpMessage}
    </form>
  );
};

export default AuthForm;
