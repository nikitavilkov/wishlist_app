import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    
    // В реальном приложении здесь должна быть проверка пароля через хеширование
    if (password === 'password') {
      const response = NextResponse.json({ success: true })
      
      // Устанавливаем cookie на 30 дней
      response.cookies.set('isAdmin', 'true', {
        maxAge: 30 * 24 * 60 * 60, // 30 дней
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })
      
      return response
    }
    
    return NextResponse.json(
      { error: 'Неверный пароль' },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Произошла ошибка при входе' },
      { status: 500 }
    )
  }
} 