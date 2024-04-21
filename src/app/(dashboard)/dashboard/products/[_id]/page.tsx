"use client"
import UploadImage from '@/components/ui/upload_Image'
import ApiFetcher from '@/hooks/use_fetch'
import { Form, Input, Select, Upload } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { categoryData, productData, uploadImage } from '@/lib/end_piont'

const Page = ({ params }: { params: { _id: string } }) => {
  console.log("🚀 ~ Page ~ params:", params)
  const { Get, Post, Delete, formPost } = new ApiFetcher()
  const [form] = Form.useForm()
  const { data } = Get(categoryData) as any
  const { mutation, isPending } = Post(productData, {}) as any
  const { mutation: imageMutation } = formPost(uploadImage) as any
  const router = useRouter()
  if (params._id) {
    const { data: product } = Get(productData, params._id) as any
    console.log("🚀 ~ useEffect ~ product:", product)
    form.setFieldsValue({
      ...product?.data,
      image: product?.data?.image ? [
        {
          url: product?.data?.image
        }
      ] : []
    })
  }

  return (
    <div className='mt-5'>
      <Form form={form} layout="vertical" className='w-1/2' onFinish={(values) => {
        const data = {
          image: values?.image && values?.image[0]?.originFileObj
        }
        imageMutation.mutate(data, {
          onSuccess: (data: any) => {
            mutation.mutate({
              ...values,
              image: data?.data && data?.data
            })
          }
        })

      }}>
        <Form.Item label="Product Name" name={"name"}>
          <Input className='w-full p-2 border border-slate-300 rounded focus:outline-none' type="text" placeholder="Enter product name" />
        </Form.Item>
        <Form.Item label="Price" name={"price"}>
          <Input className='w-full p-2 border border-slate-300 rounded focus:outline-none' type="number" placeholder="Enter price" />
        </Form.Item>
        <Form.Item label="Description" name={"description"}>
          <TextArea className='w-full p-2 border border-slate-300 rounded focus:outline-none' placeholder="Enter description" rows={4} />
        </Form.Item>
        <UploadImage label="Image" name={"image"}></UploadImage>

        <Form.Item label="Category" name={"categoryId"}>
          <Select allowClear>
            {
              data?.data?.map((category: any) => <Select.Option key={category._id} value={category._id}>{category.name}</Select.Option>)
            }
          </Select>
        </Form.Item>
        <button disabled={isPending} className='btn'>Add Product</button>
      </Form>
    </div>
  )
}

export default Page