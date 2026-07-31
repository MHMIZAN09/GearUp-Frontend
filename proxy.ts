import { JwtPayload } from 'jsonwebtoken';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { getNewAccessToken } from './service/refreshToken';
import { jwtUtils } from './utils/jwt';

const AUTH_ROUTES = ['/login', '/register'];

const PUBLIC_ROUTES = ['/', '/about', '/contact', '/gear', '/category'];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const response = NextResponse.next();

  let decodedAccessToken = accessToken
    ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET as string)
    : null;

  const decodedRefreshToken = refreshToken
    ? jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET as string)
    : null;

  /**
   * Refresh Access Token
   */
  if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
    // console.log('Access token expired. Refreshing...');

    const result = await getNewAccessToken();

    if (result.success) {
      accessToken = result.data.accessToken;

      response.cookies.set('accessToken', accessToken!, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 1000,
      });

      decodedAccessToken = jwtUtils.verifyToken(
        accessToken!,
        process.env.JWT_ACCESS_TOKEN_SECRET as string,
      );
    }
  }

  /**
   * Invalid Access Token
   */
  if (!decodedAccessToken?.success) {
    response.cookies.delete('accessToken');
  }

  let userRole = null;

  if (decodedAccessToken?.success) {
    userRole = (decodedAccessToken.data as JwtPayload).role;
  }

  if (accessToken && AUTH_ROUTES.includes(pathname)) {
    switch (userRole) {
      case 'ADMIN':
        return NextResponse.redirect(new URL('/admin-dashboard', request.url));

      case 'PROVIDER':
        return NextResponse.redirect(new URL('/provider-dashboard', request.url));

      case 'CUSTOMER':
        return NextResponse.redirect(new URL('/dashboard', request.url));

      default:
        return NextResponse.redirect(new URL('/', request.url));
    }
  }

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/'),
  );

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/'),
  );

  if (!accessToken && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname.startsWith('/dashboard') && userRole !== 'CUSTOMER') {
    return NextResponse.redirect(new URL('/not-found', request.url));
  }

  if (pathname.startsWith('/admin-dashboard') && userRole !== 'ADMIN') {
    return NextResponse.redirect(new URL('/not-found', request.url));
  }

  if (pathname.startsWith('/provider-dashboard') && userRole !== 'PROVIDER') {
    return NextResponse.redirect(new URL('/not-found', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
