"use server";

import { cookies } from "next/headers";

export async function setAuthCookie(accessToken: string) {
  const cookieStore = await cookies();

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",        // or 'lax' if needed
    path: "/",
    maxAge: 60 * 60 * 24 * 7,  // 7 days (adjust as needed)
  });
}
