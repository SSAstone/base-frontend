"use client"
import UploadImage from '@/components/ui/upload_Image'
import ApiFetcher from '@/hooks/use_fetch'
import { Form, Input, Select, Upload } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React from 'react'
import imageCompression from 'browser-image-compression';

const AddPage = () => {
    const { Get, Post, Delete, formPost } = new ApiFetcher()
    const [form] = Form.useForm()
    const { data, isLoading, refetch } = Get("/category") as any
    const { mutation, isSuccess, isPending } = Post("/product") as any
    const { mutation: imageMutation } = formPost("/product") as any

    return (
        <div className='mt-5'>
            <Form form={form} layout="vertical" className='w-1/2' onFinish={async (values) => {
                // const formData = new FormData()
                // formData.append("name", values.name);
                // formData.append("price", values.price);
                // formData.append("description", values.description);
                // formData.append("category", values.category);
                // formData.append("image", values.image[0].originFileObj)
                // try {
                //     const response = await fetch('http://192.168.0.104:5550/product', {
                //         method: 'POST',
                //         body: formData
                //     });

                //     const data = await response.json();
                //     console.log("🚀 ~ handleSubmit ~ data:", data)
                // } catch (error) {
                //     console.error('Error uploading image:', error);
                // }

                const data = {
                    ...values,
                    image: values?.image && values?.image[0]?.originFileObj
                }
                console.log("🚀 ~ <Formform={form}layout=", data)

                await imageMutation.mutate(data)

                // await mutation.mutate(values)

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
                <Form.Item label="Category" name={"category"}>
                    <Select>
                        {
                            data?.data?.map((category: any) => <Select.Option key={category._id} value={category._id}>{category.name}</Select.Option>)
                        }
                    </Select>
                </Form.Item>
                <button className='btn'>Add Product</button>
            </Form>
        </div>
    )
}

export default AddPage