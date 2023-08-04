import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  afterAuth(auth, req, evt) {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    // redirect them to organization selection page
    if (auth.userId && !auth.orgId && req.nextUrl.pathname !== "/") {
      const orgSelection = new URL("/", req.url);
      return NextResponse.redirect(orgSelection);
    }
  },
  publicRoutes: ["/sign-in", "sign-out"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
