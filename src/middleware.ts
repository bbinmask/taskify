import {
  clerkMiddleware,
  createRouteMatcher,
  auth as clerkAuth,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  const { userId, orgId } = await clerkAuth();

  let path = "/select-org";
  if (userId && isPublicRoute(req)) {
    path = `/organization/${orgId}`;
  }

  const orgSelection = new URL(path, req.url);
  return NextResponse.redirect(orgSelection);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
