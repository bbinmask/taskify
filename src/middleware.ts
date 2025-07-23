import { RedirectToSignIn } from "@clerk/nextjs";
import {
  clerkMiddleware,
  createRouteMatcher,
  auth as clerkAuth,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;
  const isPublic = isPublicRoute(req);

  const { userId, orgId, redirectToSignIn } = await auth();

  if (!userId && !isPublic) {
    return redirectToSignIn({ returnBackUrl: new URL("sign-in", req.url) });
  }

  if (orgId && isPublic) {
    return NextResponse.redirect(new URL(`/organization/${orgId}`, req.url));
  }
  if (!orgId && userId && pathname !== "/select-org") {
    return NextResponse.redirect(new URL("/select-org", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
