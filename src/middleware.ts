import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_PATHS = ['/', '/api/gifts']
const ADMIN_PATHS = ['/admin', '/admin/gifts']
const LOGIN_PATH = '/admin/login'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Разрешаем доступ к публичным путям
  if (PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // Разрешаем доступ к API и странице входа
  if (pathname.startsWith('/api/') || pathname === LOGIN_PATH) {
    return NextResponse.next()
  }

  // Проверяем авторизацию для админских путей
  if (ADMIN_PATHS.some(path => pathname.startsWith(path))) {
    const isAdmin = request.cookies.get('isAdmin')?.value === 'true'

    if (!isAdmin) {
      const url = new URL(LOGIN_PATH, request.url)
      url.searchParams.set('from', pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
} 