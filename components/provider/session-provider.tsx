"use client";
import { SessionProvider } from "next-auth/react";
const NextAuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <NextAuthProvider>{children}</NextAuthProvider>;
};

export default SessionProvider;
