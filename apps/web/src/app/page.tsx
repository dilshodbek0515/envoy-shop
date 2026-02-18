'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AddProducts from './(products)/add-products/page'

const Page = () => {
  const router = useRouter()

  useEffect(() => {
    const access_token = localStorage.getItem('token')

    if (!access_token) {
      router.replace('/login')
    }
  }, [router])

  return (
    <>
      <AddProducts />
    </>
  )
}

export default Page
