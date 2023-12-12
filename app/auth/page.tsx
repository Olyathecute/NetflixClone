'use client'
import { useCallback, useState } from 'react'
import Input from '@/components/Input'
import { authText, authPageType } from '../data'
import { registerUser } from '../api/reg'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type Props = {}

function Auth({}: Props) {
  const router = useRouter()

  const [form, setForm] = useState({ email: '', name: '', password: '' })
  console.log(form)

  const [variant, setVariant] = useState<authPageType>('login')
  const texts = authText[variant]

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === 'login' ? 'register' : 'login'))
  }, [])

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email: form.email,
        password: form.password,
        redirect: false,
        callbackUrl: '/',
      })

      router.push('/')
    } catch (error) {
      console.log('Error in login', error)
    }
  }, [form.email, form.password, router])

  const register = useCallback(async () => {
    try {
      registerUser(form.email, form.name, form.password)
      login()
    } catch (error) {
      console.log('Error in register', error)
    }
  }, [form])

  return (
    <div className='relative h-full w-full bg-hero bg-no-repeat bg-center bg-fixed bg-cover'>
      <div className='bg-black w-full h-full lg:bg-opacity-50'>
        <nav className='px-12 py-5'>
          <img src='/images/logo.png' alt='logo' className='h-12' />
        </nav>
        <div className='flex justify-center'>
          <div className='bg-black bg-opacity-70 p-12 self-center mt-2 rounded-md w-full sm:w-4/5 lg:w-2/5 lg:max-w-md '>
            <h2 className='text-white text-4xl mb-8 font-semibold'>{texts.title}</h2>
            <div className='flex flex-col gap-4'>
              {variant === 'register' && (
                <Input
                  id='name'
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  value={form.name}
                  label='Username'
                />
              )}
              <Input
                id='email'
                type='email'
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                value={form.email}
                label='Email'
              />
              <Input
                id='password'
                type='password'
                onChange={(event) => setForm({ ...form, password: event.target.value })}
                value={form.password}
                label='Password'
              />
            </div>
            <button
              onClick={variant === 'login' ? login : register}
              className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'
            >
              {texts.button}
            </button>
            <p className='text-neutral-500 mt-12'>
              {texts.message}
              <span onClick={toggleVariant} className='text-white ml-1 hover:underline cursor-pointer'>
                {texts.link}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
