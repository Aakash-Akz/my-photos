"use client";
import { React, useState } from "react";
import supabase from "@/app/utils/supabaseClient";
import { useRouter } from "next/navigation";

const AuthForm = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSigningIn, setisSigningIn] = useState(false);
  const [isSigningUp, setisSigningUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  async function handleSignUp(e) {
    e.preventDefault();
    setErrorMessage("");

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (!error) {
      router.push("/photos");
      setisSigningUp(true);
    } else {
      setErrorMessage(error.message);
    }
    console.log({ data, error });
  }

  async function handleSignIn(e) {
    e.preventDefault();
    setErrorMessage("");
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
      setErrorMessage("Incorrect email or password.");
    }
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  let signInMessage = "Sign In";

  if (isSigningIn) {
    signInMessage = "Signing In...";
  } else if (isNewUser) {
    signInMessage = "Sign Up";
  }

  const signUpMessage = (
    <p>Email Sent! Please check your email to confirm sign-up.</p>
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
      <div className="relative">
        <input
          type={isPasswordVisible ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="text-gray-800 bg-gray-300 h-[50px] w-[300px] px-3 border-2 rounded-xl outline-none"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-4 top-[50%] transform -translate-y-[50%] text-gray-600"
        >
          {isPasswordVisible ? "Hide" : "Show"}
        </button>
      </div>
      {isNewUser && (
        <input
          type={isPasswordVisible ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="text-gray-800 bg-gray-300 h-[50px] w-[300px] px-3 border-2 rounded-xl outline-none"
        />
      )}
      <button
        type="submit"
        className="w-[150px] h-[50px] rounded-full bg-gray-900 text-gray-100"
      >
        {signInMessage}
      </button>
      {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
      <p className="text-center mt-10">
        {isNewUser ? (
          <>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => {
                setIsNewUser(false);
                setErrorMessage("");
              }}
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
              onClick={() => {
                setIsNewUser(true);
                setErrorMessage("");
              }}
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
