"use client"
import React, { useState } from 'react'
import MenuFoldOutlined from '@ant-design/icons/MenuFoldOutlined'
import HomeOutlined from '@ant-design/icons/HomeOutlined'
import ShopOutlined from '@ant-design/icons/ShopOutlined'
import Link from 'next/link'
import { useAuth } from '@/context/user_context'
import { useRouter } from 'next/navigation'

const items = [
  {
    key: '1',
    label: 'Dashboard',
    icon: <HomeOutlined />,
    link: '/dashboard',
  },
  {
    key: '2',
    label: 'Products',
    icon: <ShopOutlined />,
    link: '/dashboard/products',
  },
  {
    key: '3',
    label: 'Dashboard',
    icon: <HomeOutlined />,
    link: '/dashboard',
  },
  {
    key: '4',
    label: 'Category',
    icon: <HomeOutlined />,
    link: '/dashboard/category',
  }
]

const Layout = ({ children }: { children: React.ReactNode }) => {

  const { data, isLoading } = useAuth()
    const router = useRouter()

  if (data?.data?.role !== "admin") {
    isLoading ? null : router.push('/')
  }

  const [show, setShow] = useState(false)
  return (
    <div className='h-screen flex items-start w-full'>
      <div className={`${show ? 'w-[80px]' : 'w-[345px] '} hidden md:block h-full`}>
        <div className="bg-white h-full p-5 rounded space-y-2">
          <div className="flex justify-between items-center mt-3 mb-8">
            { !show && <h1 className='text-2xl text-bold'>Dashboard</h1>}
            <MenuFoldOutlined onClick={() => setShow(!show)} className={`text-xl cursor-pointer relative z-50 ${show ? 'rotate-180 mx-auto' : 'rotate-0'}`} />
          </div>
          <div className="space-y-2">
            {
              items?.map((item, index) => <Link  key={index} href={item?.link} className={`flex text-base bg-slate-100 hover:bg-slate-400 hover:text-white rounded py-2 ${show ? 'px-2' : 'px-4'} cursor-pointer items-center gap-3`}>
                {item.icon}
                { !show && <h1>{item.label}</h1>}
              </Link>)
            }
          </div>
        </div>

      </div>
      <div className=" w-full h-full p-4">
        {children}
      </div>
    </div>
  )
}

export default Layout