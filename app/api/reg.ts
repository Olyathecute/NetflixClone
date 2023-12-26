'use server'
import bcrypt from 'bcrypt'
import prismadb from '@/lib/prismadb'

export async function registerUser(email: string, name: string, password: string) {
  try {
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    })

    if (existingUser) {
      throw new Error('email take')
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: ' ',
        emailVerified: new Date(),
      },
    })

    return user
  } catch (error) {
    console.log('Here', error)
    throw new Error('SOLLY MISTA')
  }
}
