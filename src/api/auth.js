// Auth API surface. Each call maps to a `/api/auth/*` endpoint.
import { apiFetch, setToken, clearToken } from './client'

export async function loginRequest({ email, password }) {
  const { token, user } = await apiFetch('/api/auth/login', {
    method: 'POST',
    auth: false,
    body: { email, password },
  })
  setToken(token)
  return user
}

export async function registerRequest({ name, email, password }) {
  const { token, user } = await apiFetch('/api/auth/register', {
    method: 'POST',
    auth: false,
    body: { name, email, password },
  })
  setToken(token)
  return user
}

export function forgotPasswordRequest({ email }) {
  return apiFetch('/api/auth/forgot-password', {
    method: 'POST',
    auth: false,
    body: { email },
  })
}

export async function fetchMe() {
  const { user } = await apiFetch('/api/auth/me')
  return user
}

export async function updateProfileRequest(patch) {
  const { user, token } = await apiFetch('/api/auth/me', { method: 'PATCH', body: patch })
  // The API may re-issue a token carrying the updated profile (stateless backend).
  if (token) setToken(token)
  return user
}

export async function logoutRequest() {
  // Clear the local token first so the UI updates instantly, then notify the
  // server (best-effort — a failed call shouldn't keep the user logged in).
  clearToken()
  try {
    await apiFetch('/api/auth/logout', { method: 'POST', auth: false })
  } catch {
    /* ignore */
  }
}
