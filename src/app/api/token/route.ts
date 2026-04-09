import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { randomBytes } from 'crypto'
import { addDays } from 'date-fns'

export async function POST() {
  try {
    const tokenStr = randomBytes(32).toString('hex')
    const expiresAt = addDays(new Date(), 7) // Validade de 7 dias

    const token = await prisma.registrationToken.create({
      data: {
        token: tokenStr,
        expiresAt,
      }
    })

    return NextResponse.json({
      success: true,
      token: token.token,
      url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/cadastro-externo/${token.token}`
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erro ao gerar token' }, { status: 500 })
  }
}
