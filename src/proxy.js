import { NextResponse } from 'next/server'
import { auth } from "@/lib/auth" 

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  
  if (pathname === '/ideas') {
    return NextResponse.next();
  }


  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set("callbackUrl", pathname); 
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/add-idea/:path*',
    '/my-ideas/:path*',
    '/interactions/:path*',
    '/profile/:path*',
    '/ideas/:path*' 
  ],  
}