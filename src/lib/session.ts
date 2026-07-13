import { getServerSession } from "next-auth/next";
import { getAuthOptions } from "./auth";

export async function getCurrentUser() {
  const session = await getServerSession(getAuthOptions());
  return session?.user;
}

export async function getSession() {
  return await getServerSession(getAuthOptions());
}
