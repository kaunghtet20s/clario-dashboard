import { DEMO_USER, publicUser, makeToken, readBody } from '../_lib/auth.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed.' })
  const { email, password } = await readBody(req)
  if (String(email ?? '').toLowerCase() !== DEMO_USER.email || password !== DEMO_USER.password) {
    return res.status(401).json({ message: 'Invalid email or password.' })
  }
  const user = publicUser(DEMO_USER)
  return res.status(200).json({ token: makeToken(user), user })
}
