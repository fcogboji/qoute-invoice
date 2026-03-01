import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const appUrl = process.env.NEXT_PUBLIC_APP_URL;
// Include localhost, production with and without www so auth works in all environments
const authorizedParties = Array.from(
  new Set([
    "http://localhost:3000",
    appUrl || "https://tradeinvoice.co.uk",
    "https://tradeinvoice.co.uk",
    "https://www.tradeinvoice.co.uk",
  ].filter(Boolean))
);

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/pricing",
  "/privacy",
  "/terms",
  "/cookies",
  "/api/webhooks(.*)",
  "/api/cron(.*)",
]);

export default clerkMiddleware(
  async (auth, req) => {
    if (!isPublicRoute(req)) {
      await auth.protect();
    }
  },
  {
    authorizedParties,
  }
);

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", "/(api|trpc)(.*)"],
};
