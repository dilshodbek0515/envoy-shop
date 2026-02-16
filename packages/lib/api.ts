// lib/api.ts
import axios, { AxiosRequestConfig } from 'axios'
import { tokenManager } from './tokenManager'

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean
  _retry?: boolean
}

/* ================= AXIOS INSTANCE ================= */

export const api = axios.create({
  baseURL: 'http://envoyshop.webcoder.uz',
  withCredentials: true, // refresh cookie uchun SHART
  timeout: 15000
})

/* ================= REFRESH QUEUE ================= */

let isRefreshing = false

let failedQueue: Array<{
  resolve: (token?: string) => void
  reject: (err?: any) => void
}> = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })
  failedQueue = []
}

/* ================= REQUEST ================= */

api.interceptors.request.use((config: CustomAxiosRequestConfig) => {
  const access = tokenManager.getAccess()

  if (!config.skipAuth && access) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${access}`
    }
  }

  return config
})

/* ================= RESPONSE ================= */

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config as CustomAxiosRequestConfig

    if (
      error.response?.status === 401 &&
      !originalRequest?.skipAuth &&
      !originalRequest?._retry
    ) {
      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then(token => {
          if (token) {
            originalRequest.headers.Authorization = `Bearer ${token}`
          }
          return api(originalRequest)
        })
      }

      isRefreshing = true

      try {
        const response = await api.post(
          '/api/auth/token-refresh/',
          {},
          { skipAuth: true }
        )

        const { access } = response.data

        tokenManager.setAccess(access)

        processQueue(null, access)

        originalRequest.headers.Authorization = `Bearer ${access}`
        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        tokenManager.clear()
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)
