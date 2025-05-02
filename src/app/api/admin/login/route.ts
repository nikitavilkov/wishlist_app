import { NextResponse } from 'next/server'
import { z } from 'zod'
import { cookies } from 'next/headers'

const loginSchema = z.object({
  password: z.string().min(1, 'Пароль обязателен'),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = loginSchema.parse(body)

    if (validatedData.password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Неверный пароль' },
        { status: 401 }
      )
    }

    const cookieStore = cookies()
    cookieStore.set('isAdmin', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60, // 30 дней
      path: '/',
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error logging in:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Неверные входные данные', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
} 