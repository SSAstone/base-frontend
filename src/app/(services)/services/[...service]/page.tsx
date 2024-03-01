import Link from 'next/link'
import React from 'react'

const ServicesPage = ({ params }: { params: { service: string[] } }) => {
  
  console.log("🚀 ~ ServicesPage ~ params:", params)
  return (
    <div className='h-screen'>ServicesPage
      <Link href={'/services'}>services</Link>
    </div>
  )
}

export default ServicesPage