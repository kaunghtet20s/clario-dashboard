import { readBody } from '../_lib/auth.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed.' })
  await readBody(req)
  return res.status(200).json({ message: 'If an account exists, a reset link has been sent.' })
}
