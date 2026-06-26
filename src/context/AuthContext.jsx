import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  fetchMe,
  loginRequest,
  registerRequest,
  logoutRequest,
  updateProfileRequest,
} from '../api/auth'
import { clearToken, getToken } from '../api/client'

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  // Only block on restore when there's a token to validate; guests render instantly.
  const [loading, setLoading] = useState(() => !!getToken())

  // On first load, if a token exists, restore the session via /api/auth/me.
  useEffect(() => {
    let active = true
    async function restore() {
      if (!getToken()) {
        setLoading(false)
        return
      }
      try {
        const me = await fetchMe()
        if (active) setUser(me)
      } catch {
        // Token is invalid/expired — drop it.
        clearToken()
      } finally {
        if (active) setLoading(false)
      }
    }
    restore()
    return () => {
      active = false
    }
  }, [])

  const login = useCallback(async (credentials) => {
    const u = await loginRequest(credentials)
    setUser(u)
    return u
  }, [])

  const register = useCallback(async (details) => {
    const u = await registerRequest(details)
    setUser(u)
    return u
  }, [])

  const logout = useCallback(async () => {
    setUser(null) // optimistic — UI redirects immediately
    await logoutRequest()
  }, [])

  const updateProfile = useCallback(async (patch) => {
    const u = await updateProfileRequest(patch)
    setUser(u)
    return u
  }, [])

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, loading, login, register, logout, updateProfile }),
    [user, loading, login, register, logout, updateProfile],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
