import { fetchUserByEmail } from '../src/authService3'

export async function login(email: string, password: string) {
  const user = await fetchUserByEmail(email)

  if (!user) {
    throw new Error('user not found')
  }

  if (user.password !== password) {
    throw new Error('invalid password')
  }

  return {
    id: user.id,
    email: user.email
  }
}