import { NextResponse } from 'next/server'

export function middleware(req) {
  const { pathname } = req.nextUrl

  const accessToken = req.cookies.get('accessToken')?.value
  const loggedIn = !!accessToken

  // Prevent unauthorized access to any route except for login, register, public, etc.
  const isPublicRoute =
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/public')

  if (!loggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Prevent logged-in users from visiting login/register again
  if (
    loggedIn &&
    (pathname.startsWith('/login') || pathname.startsWith('/signup'))
  ) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/'],
}
