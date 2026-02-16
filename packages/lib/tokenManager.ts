// lib/tokenManager.ts

let accessToken: string | null = null // memory

export const tokenManager = {
  setAccess: (access: string | null) => {
    accessToken = access
  },
  getAccess: () => accessToken,
  clear: () => {
    accessToken = null
  }
}