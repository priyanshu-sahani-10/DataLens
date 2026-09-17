import { NextResponse } from "next/server";

// NOTE: JWT lives in localStorage (client-only), so this middleware cannot
// validate it server-side. Real route protection happens in
// `components/ProtectedRoute.js` (validates via GET /auth/me) and in
// `app/dashboard/page.jsx`. Keep this as a pass-through until auth moves
// to httpOnly cookies, at which point verify the cookie here.
export function middleware(request) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};