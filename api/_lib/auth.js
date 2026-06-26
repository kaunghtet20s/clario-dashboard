// Shared, stateless auth helpers for the Vercel serverless functions.
// Tokens are JWT-shaped and self-contained: the user lives in the payload,
// so no database is required for this demo. (Not cryptographically secure —
// a deterministic stand-in suitable for a public demo only.)

const TOKEN_TTL = 60 * 60 // seconds (1 hour)
const SECRET = 'clario-demo-secret'

export const DEMO_USER = {
  id: 'usr_alex',
  name: 'Alex Morgan',
  email: 'alex@clario.io',
  password: 'password',
  role: 'Product Lead',
}

export const publicUser = ({ password, ...rest }) => rest

const b64url = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url')

export function sign(payloadB64) {
  let h = 0
  const s = payloadB64 + SECRET
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  return Buffer.from(String(h >>> 0)).toString('base64url')
}

// `claims` already represent the public user (id, name, email, role, …extras).
export function makeToken(claims) {
  const now = Math.floor(Date.now() / 1000)
  const header = b64url({ alg: 'HS256', typ: 'JWT' })
  const payload = b64url({ ...claims, iat: now, exp: now + TOKEN_TTL })
  return `${header}.${payload}.${sign(payload)}`
}

export function verifyToken(token) {
  if (!token) return null
  const parts = token.split('.')
  if (parts.length !== 3) return null
  const [, payloadB64, sig] = parts
  if (sign(payloadB64) !== sig) return null
  let payload
  try {
    payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString())
  } catch {
    return null
  }
  if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null
  return payload
}

// Strip token metadata, leaving the public user object.
export function userFromToken(payload) {
  const { iat, exp, ...user } = payload
  return user
}

export async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body)
    } catch {
      return {}
    }
  }
  return await new Promise((resolve) => {
    let data = ''
    req.on('data', (c) => (data += c))
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {})
      } catch {
        resolve({})
      }
    })
  })
}

export const bearer = (req) =>
  String(req.headers['authorization'] || '').replace(/^Bearer /, '')
