"use client";
import Logo from "@/components/logo";
import Image from "next/image";

import GoogleLogo from "@/public/google-logo.png";

import { signIn } from "next-auth/react";
import { useState } from "react";

const LoginPage = () => {
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoginLoading(true);
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
    } finally {
      setIsLoginLoading(false);
    }
  };
  return (
    <div className="h-[100dvh] w-full flex items-center justify-center">
      <div
        className="border dark:border-white shadow-sm flex flex-col justify-center
      w-[500px] items-center dark:bg-[#323232] rounded-sm px-3 py-10"
      >
        <Logo width={250} height={60} className="hidden md:flex" />
        <Logo width={150} height={45} className="flex md:hidden" />

        <h2 className="mt-6">Login and create your own Optido!</h2>
        <div className="mt-10">
          <div
            className="flex items-center cursor-pointer border py-2 px-4 mb-10 dark:hover:bg-black hover:bg-slate-100"
            role="button"
            onClick={handleGoogleLogin}
          >
            <div
              className="flex items-center justify-center"
              style={{ width: 320 }}
            >
              <Image
                src={GoogleLogo}
                alt="google-logo"
                height={30}
                width={30}
                style={{ marginRight: 10 }}
              />
              <p className="font-bold">Google Login</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
