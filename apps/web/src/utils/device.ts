export const getDeviceId = () => {
  if (typeof window === 'undefined') return 'server'

  const KEY = 'device_id'
  let id = localStorage.getItem(KEY)

  if (!id) {
    // ✅ safe UUID generator
    if (window.crypto && 'randomUUID' in window.crypto) {
      id = window.crypto.randomUUID()
    } else {
      // ✅ fallback
      id =
        'dev_' + Math.random().toString(36).slice(2) + Date.now().toString(36)
    }

    localStorage.setItem(KEY, id)
  }

  return id
}

export const getClientIp = async (): Promise<string> => {
  if (typeof window === 'undefined') return 'server'

  try {
    const controller = new AbortController()

    const timeout = setTimeout(() => {
      controller.abort()
    }, 4000)

    const res = await fetch('https://api.ipify.org?format=json', {
      signal: controller.signal
    })

    clearTimeout(timeout)

    if (!res.ok) throw new Error('IP fetch failed')

    const data = await res.json()

    return data.ip || '0.0.0.0'
  } catch (err) {
    console.log('IP fetch error:', err)
    return '0.0.0.0'
  }
}
