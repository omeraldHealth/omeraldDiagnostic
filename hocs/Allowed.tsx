import React from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/router";

const Allowed = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  if (loading) {
    return <h1 className="grid h-screen place-content-center">Loading...</h1>;
  } else {
    if (user) {
      return children;
    } else {
      router.push("/login");
    }
  }
};
export default Allowed;
