import { withAuth } from 'next-auth/middleware'

export const config = { matcher: ['/((?!auth|images).*)'] }

export default withAuth({
  pages: {
    signIn: '/auth',
  },
})
