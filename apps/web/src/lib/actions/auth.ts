"use server";

import { signIn, signOut } from "@/auth";

export const login = async () => {
  await signIn("github", { redirectTo: "/admin/dashboard" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};
