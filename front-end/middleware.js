import { NextResponse } from 'next/server';

// This is a simplified middleware that doesn't use JWT
// It's not as secure as the JWT version, but it's simpler to implement
export function middleware(request) {
  // We can't access localStorage in middleware, so we'll use cookies instead
  // For a real application, you should implement proper authentication

  // For now, we'll just let all requests through
  // The authentication will be handled client-side in the components
  return NextResponse.next();
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: ['/admin/:path*'],
};
