import { verifyToken, userFromToken, makeToken, readBody, bearer } from '../_lib/auth.js'

export default async function handler(req, res) {
  const payload = verifyToken(bearer(req))
  if (!payload) return res.status(401).json({ message: 'Unauthorized.' })

  if (req.method === 'GET') {
    return res.status(200).json({ user: userFromToken(payload) })
  }

  if (req.method === 'PATCH') {
    const patch = await readBody(req)
    // Never let token internals be overwritten by the client.
    const { id, password, iat, exp, ...rest } = patch
    const updated = { ...userFromToken(payload), ...rest }
    // Re-issue the token so the updated profile survives a reload (stateless).
    return res.status(200).json({ user: updated, token: makeToken(updated) })
  }

  return res.status(405).json({ message: 'Method not allowed.' })
}
