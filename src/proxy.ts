import { NextResponse, type NextRequest } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  console.log(user);
  if (!user) {
    return NextResponse.redirect(new URL("/signIn", request.url));
  }
}

export const config = {
  matcher: ["/studioPage", "/my-bookings", "/booking/:path*"],
};
