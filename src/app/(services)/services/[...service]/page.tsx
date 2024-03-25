"use client"
import Alignment from '@/components/ui/alignment'
import { Col, ColorPicker, Form, Input, Radio, Row, Slider } from 'antd'
import React, { useEffect, useState } from 'react'
import type { ColorPickerProps, GetProp } from 'antd';

type Color = GetProp<ColorPickerProps, 'value'>;
type Format = GetProp<ColorPickerProps, 'format'>;

const ServicesPage = ({ params }: { params: { service: string[] } }) => {
  const [form] = Form.useForm()
  const [data, setData] = useState({
    name: 'web',
    padding_x: 10,
    padding_y: 26,
    rounding: 12,
    bg_color: '#1677ff',
    color: '#ffffff',
    items: 'center',
    justify: 'between',
  });
  const [show, setShow] = useState('')
  const [align, setAlign] = useState('start')
  const [paddingX, setPaddingX] = useState(0)
  const [paddingY, setPaddingY] = useState(0)
  const [justify, setJustify] = useState('between')
  const [items, setItems] = useState('start')
  const [bg_color, setBgColor] = useState('#1677ff')
  const [color, setColor] = useState('#ffffff')
  const [round, setRound] = useState(0)

  useEffect(() => {
    console.log("🚀 ~ ServicesPage ~ data:", data)
    form.setFieldsValue(data)
  }, [data, form])

  return (
    <div className='h-screen flex items-start gap-5 w-full'>
      <div className="w-[345px] hidden md:block h-full">
        <div>
          <h1 className='text-3xl text-white font-bold text-center py-6 '>{data.name}</h1>
        </div>
        <div className="p-3">

          <Form form={form} layout="vertical" onFinish={(values) => console.log(values)}>
            <Form.Item label="Name:" name={'name'}>
              <Input onChange={(e) => data.name = e.target.value} />
            </Form.Item>
            <Alignment justify={justify} items={items} setJustify={setJustify} setItems={setItems}></Alignment>            
            <Form.Item label="Padding-x:" name={'padding_x'}>
              <Slider onChange={(e: any) => setPaddingX(e)} min={0} max={30}></Slider>
            </Form.Item>
            <Form.Item label="Padding-y:" name={'padding_y'}>
              <Slider onChange={(e: any) => setPaddingY(e)} min={0} max={30}></Slider>
            </Form.Item>
            <Form.Item label="Rounding:" name={'rounding'}>
              <Slider onChange={(e: any) => setRound(e)} min={0} max={30}></Slider>
            </Form.Item>
            <Row>
              <Col span={12}>
                <Form.Item label="BG Color" name={'bg_color'}>
                  <ColorPicker format={'hex'}  onChange={(e) => setBgColor(e.toHexString())}></ColorPicker>
                </Form.Item>

              </Col>
              <Col span={12}>

                <Form.Item label="Color"  name={'color'}>
                  <ColorPicker format={'hex'} onChange={(e) => setColor(e.toHexString())}></ColorPicker>
                </Form.Item>
              </Col>
            </Row>
            <button>Submit</button>
          </Form>

        </div>
      </div>
      <div className=" w-full h-full">
        <div className={`flex items-${items} justify-${justify}`} style={{ padding: `${paddingY}px ${paddingX}px`, backgroundColor: `${bg_color}`, color: `${color}`, borderRadius: `${round}px` }}>
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