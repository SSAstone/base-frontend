"use client"
import Alignment from '@/components/ui/alignment'
import { Col, Form, Input, Radio, Row } from 'antd'
import React, { useState } from 'react'

const ServicesPage = ({ params }: { params: { service: string[] } }) => {
  const [show, setShow] = useState('')
  const [align, setAlign] = useState('start')

  const [justify, setJustify] = useState('start')
  const [items, setItems] = useState('start')

  return (
    <div className='h-screen flex items-start gap-5 w-full'>
      <div className="w-[345px] hidden md:block h-full">
        <div>
          <h1 className='text-3xl text-white font-bold text-center py-6 '>{show}</h1>
        </div>
        <div className="p-3">

          <Form layout="vertical" onFinish={(values) => console.log(values)}>
            <Form.Item label="Name:" name={'name'}>
              <Input onChange={(e) => setShow(e.target.value)} />
            </Form.Item>
            <Alignment justify={justify} items={items} setJustify={setJustify} setItems={setItems}></Alignment>
            <button>Submit</button>
          </Form>

        </div>
      </div>
      <div className=" w-full h-full">
        <div className={`flex items-${items} justify-${justify}`}>
          <div className="fi gap-5">
            <h1>menu</h1>
            <h1>menu</h1>
            <h1>menu</h1>
            <h1>menu</h1>
          </div>
          <div className="">
            <h1>menu</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServicesPage