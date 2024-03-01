"use client"
import { Form, Input } from 'antd'
import { useAuth } from '@/context/user_context'
import { useRouter } from 'next/navigation'
import React from 'react'

const Commerce = () => {
  const router = useRouter()
  const { user } = useAuth()
  console.log("🚀 ~ ECommercePage ~ user:", user)

  if (user?.role === "user_service") {
    router.push("/")
  }
  const [show, setShow] = React.useState('')
  return (
    <div className='h-screen flex items-start gap-5 w-full'>
      <div className="bg-slate-600 w-[345px] hidden md:block h-full">
        <div>
          <h1 className='text-3xl text-white font-bold text-center py-6 '>{show}</h1>
        </div>
        <div className="p-3">

        <Form layout="vertical">
          <Form.Item label="Name:">
            <Input onChange={(e) => setShow(e.target.value)} />
          </Form.Item>
        </Form>
        </div>
      </div>
      <div className="bg-slate-700 w-full h-full">aa</div>
    </div>
  )
}

export default Commerce