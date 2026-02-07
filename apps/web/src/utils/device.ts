export const getDeviceId = () => {
  if (typeof window === 'undefined') return 'unknown-device'

  let id = localStorage.getItem('device_id')

  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem('device_id', id)
  }

  return id
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
