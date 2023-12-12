'use client'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Input from '@/components/Input'
import { registerUser } from '../api/reg'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { authText, authPageType } from '../data'

type Props = {}

function Auth({}: Props) {
  const router = useRouter()

  const [form, setForm] = useState({ email: '', name: '', password: '' })

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
            <div className='flex flex-row items-center justify-center gap-4 mt-8'>
              <div
                onClick={() => signIn('google', { callbackUrl: '/' })}
                className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn('github', { callbackUrl: '/' })}
                className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className='text-neutral-500 mt-8'>
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
