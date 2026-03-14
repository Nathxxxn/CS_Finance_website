import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all paths except Sanity studio, API routes, static files
    "/((?!studio|api|_next|_vercel|.*\\..*).*)",
  ],
};
