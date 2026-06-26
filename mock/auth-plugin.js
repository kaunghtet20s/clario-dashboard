/**
 * Mock auth backend — a Vite plugin that intercepts `/api/auth/*` during
 * `npm run dev` and `npm run preview`. It issues JWT-shaped tokens and keeps an
 * in-memory user store so the frontend can talk to a real HTTP API.
 *
 * 👉 To use a real backend instead: remove `mockAuthApi()` from vite.config.js
 *    and point VITE_API_URL at your server. The frontend endpoints are unchanged.
 */

const TOKEN_TTL = 60 * 60 // seconds (1 hour)
const SECRET = 'clario-dev-secret'
const LATENCY = 600 // ms — simulate a network round-trip

// In-memory "database". Seeded with the demo account.
const USERS = [
  {
    id: 'usr_alex',
    name: 'Alex Morgan',
    email: 'alex@clario.io',
    password: 'password',
    role: 'Product Lead',
  },
]

const b64url = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url')

// Deterministic, NON-cryptographic stand-in for a real HMAC signature.
function sign(payloadB64) {
  let h = 0
  const s = payloadB64 + SECRET
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  return Buffer.from(String(h >>> 0)).toString('base64url')
}

function makeToken(user) {
  const now = Math.floor(Date.now() / 1000)
  const header = b64url({ alg: 'HS256', typ: 'JWT' })
  const payload = b64url({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    iat: now,
    exp: now + TOKEN_TTL,
  })
  return `${header}.${payload}.${sign(payload)}`
}

function verifyToken(token) {
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

const publicUser = ({ password, ...rest }) => rest

const readBody = (req) =>
  new Promise((resolve) => {
    let data = ''
    req.on('data', (chunk) => (data += chunk))
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {})
      } catch {
        resolve({})
      }
    })
  })

function send(res, status, body) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

async function handler(req, res, next) {
  const url = req.url?.split('?')[0]
  if (!url || !url.startsWith('/api/auth/')) return next()

  await new Promise((r) => setTimeout(r, LATENCY))

  // POST /api/auth/login
  if (url === '/api/auth/login' && req.method === 'POST') {
    const { email, password } = await readBody(req)
    const user = USERS.find((u) => u.email.toLowerCase() === String(email ?? '').toLowerCase())
    if (!user || user.password !== password) {
      return send(res, 401, { message: 'Invalid email or password.' })
    }
    return send(res, 200, { token: makeToken(user), user: publicUser(user) })
  }

  // POST /api/auth/register
  if (url === '/api/auth/register' && req.method === 'POST') {
    const { name, email, password } = await readBody(req)
    if (!email || !password) {
      return send(res, 400, { message: 'Email and password are required.' })
    }
    if (USERS.some((u) => u.email.toLowerCase() === String(email).toLowerCase())) {
      return send(res, 409, { message: 'An account with this email already exists.' })
    }
    const user = {
      id: 'usr_' + Math.random().toString(36).slice(2, 9),
      name: name || 'New User',
      email,
      password,
      role: 'Member',
    }
    USERS.push(user)
    return send(res, 201, { token: makeToken(user), user: publicUser(user) })
  }

  // POST /api/auth/forgot-password
  if (url === '/api/auth/forgot-password' && req.method === 'POST') {
    await readBody(req)
    return send(res, 200, { message: 'If an account exists, a reset link has been sent.' })
  }

  // GET /api/auth/me  (Bearer token required)
  if (url === '/api/auth/me' && req.method === 'GET') {
    const token = String(req.headers['authorization'] ?? '').replace(/^Bearer /, '')
    const payload = verifyToken(token)
    const user = payload && USERS.find((u) => u.id === payload.sub)
    if (!user) return send(res, 401, { message: 'Unauthorized.' })
    return send(res, 200, { user: publicUser(user) })
  }

  // PATCH /api/auth/me  — update the signed-in user's profile
  if (url === '/api/auth/me' && req.method === 'PATCH') {
    const token = String(req.headers['authorization'] ?? '').replace(/^Bearer /, '')
    const payload = verifyToken(token)
    const user = payload && USERS.find((u) => u.id === payload.sub)
    if (!user) return send(res, 401, { message: 'Unauthorized.' })
    const patch = await readBody(req)
    // Merge allowed fields only — never let id/password be overwritten here.
    const { id, password, ...rest } = patch
    Object.assign(user, rest)
    return send(res, 200, { user: publicUser(user) })
  }

  // POST /api/auth/logout
  if (url === '/api/auth/logout' && req.method === 'POST') {
    return send(res, 200, { message: 'Logged out.' })
  }

  return send(res, 404, { message: 'Not found.' })
}

export function mockAuthApi() {
  return {
    name: 'clario-mock-auth-api',
    configureServer(server) {
      server.middlewares.use(handler)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler)
    },
  }
}
