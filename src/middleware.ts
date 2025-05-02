import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin')
  const isLoginPath = request.nextUrl.pathname === '/admin'
  const isApiPath = request.nextUrl.pathname.startsWith('/api/admin')
  
  // Пропускаем запросы к API и странице входа
  if (isApiPath || isLoginPath) {
    return NextResponse.next()
  }
  
  // Проверяем авторизацию для админских путей
  if (isAdminPath) {
    const isAdmin = request.cookies.get('isAdmin')?.value === 'true'
    
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
} 