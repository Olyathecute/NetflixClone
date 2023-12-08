// AUTH

export type authPageType = 'register' | 'login'

type authPageTextsType = {
  title: string
  button: string
  message: string
  link: string
}

export const authText: Record<authPageType, authPageTextsType> = {
  register: {
    title: 'Register',
    button: 'Sign Up',
    message: 'Already have an account?',
    link: 'Log In',
  },
  login: {
    title: 'Sign In',
    button: 'Log In',
    message: 'First time using Netflix?',
    link: 'Create an account',
  },
}
