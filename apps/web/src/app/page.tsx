'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()

  useEffect(() => {
    const access = localStorage.getItem('token')
    if (!access) {
      router.replace('/login')
    }
  }, [router])

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontSize: '50px'
      }}
    >
      Asosiy sahifa
    </div>
  )
}

export default Page
