import { makeToken, readBody } from '../_lib/auth.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed.' })
  const { name, email, password } = await readBody(req)
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' })
  }
  const user = {
    id: 'usr_' + Math.random().toString(36).slice(2, 9),
    name: name || 'New User',
    email,
    role: 'Member',
  }
  return res.status(201).json({ token: makeToken(user), user })
}
