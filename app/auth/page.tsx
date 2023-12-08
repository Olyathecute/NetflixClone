'use client'
import { useCallback, useState } from 'react'
import Input from '@/components/Input'
import { authText, authPageType } from '../data'

type Props = {}

function Auth({}: Props) {
  const [form, setForm] = useState({ email: '', name: '', password: '' })
  console.log(form)

  const [variant, setVariant] = useState<authPageType>('login')

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === 'login' ? 'register' : 'login'))
  }, [])

  const texts = authText[variant]

  return (
    <div className='relative h-full w-full bg-hero bg-no-repeat bg-center bg-fixed bg-cover'>
      <div className='bg-black w-full h-full lg:bg-opacity-50'>
        <nav className='px-12 py-5'>
          <img src='/images/logo.png' alt='logo' className='h-12' />
        </nav>
        <div className='flex justify-center'>
          <div className='bg-black bg-opacity-70 p-12 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
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
            <button className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'>
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
