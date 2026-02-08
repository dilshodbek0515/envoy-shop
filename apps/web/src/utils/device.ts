export const getDeviceName = () => {
  if (typeof navigator === 'undefined') return 'unknown'

  const ua = navigator.userAgent

  // Android modelini olish
  const androidMatch = ua.match(/Android.*;\s([^)]+)\)/)
  if (androidMatch) {
    return androidMatch[1] // Tecno KI7 kabi
  }

  // iPhone / iPad
  if (/iPhone/.test(ua)) return 'iPhone'
  if (/iPad/.test(ua)) return 'iPad'

  // Windows PC
  if (/Windows/.test(ua)) return 'Windows PC'

  // Mac
  if (/Macintosh/.test(ua)) return 'Mac'

  return 'Unknown device'
}

export const getClientIp = async () => {
  try {
    const res = await fetch('https://api.ipify.org?format=json')
    const data = await res.json()
    return data.ip
  } catch {
    return '0.0.0.0'
  }
}
