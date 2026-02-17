import { router } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import PhoneInput from 'src/components/PhoneInput/PhoneInput'
import { Colors, Spacing } from 'src/shared/token'
import ButtonApp from 'src/shared/ui/Button/button'
import Constants from 'expo-constants'
import { RegisterFn } from '../../../../../../packages/api/register/register'

const getClientIp = async (): Promise<string> => {
  try {
    const res = await fetch('https://api.ipify.org?format=json')
    const data = await res.json()
    return data.ip
  } catch {
    return '0.0.0.0'
  }
}

const getDeviceId = () => Constants.deviceId ?? 'unknown-device-id'

export default function Register () {
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSendOtp = async () => {
    setLoading(true)

    try {
      const digitsOnly = phone.replace(/\D/g, '')
      const fullPhone = digitsOnly.startsWith('998')
        ? `+${digitsOnly}`
        : `+998${digitsOnly}`

      const device_id = getDeviceId()
      const ip = await getClientIp()

      const data = {
        phone: fullPhone,
        ip_address: ip,
        device_id: device_id,
        purpose: 'verify_phone'
      }

      const response = await RegisterFn(data)
      if (response.message === 'Verification code sent')
        router.replace('/Register/sms/sms')
      console.log('API response:', response)
    } catch (error) {
      console.log('API error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <PhoneInput value={phone} onChangeText={setPhone} />
      <ButtonApp
        label={loading ? 'Yuborilmoqda...' : 'Davom etish'}
        onPress={handleSendOtp}
        disabled={phone.replace(/\D/g, '').length < 9}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.horizontal
  }
})
