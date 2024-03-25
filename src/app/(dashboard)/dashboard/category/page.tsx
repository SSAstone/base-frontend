"use client"
import { Form, Input } from 'antd'
import React, { useEffect } from 'react'

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import ApiFetcher from '@/hooks/use_fetch'

const CategoryPage = () => {
    const apiFetcher = new ApiFetcher();
    const { data, refetch, mutation, deleteData } = apiFetcher.generateFetcher('/category') as any

    return (
        <div>
            <Form layout="vertical" className='w-1/2' onFinish={async (values) => {
                await mutation.mutateAsync(values)
                await refetch()
            }}>
                <Form.Item label="Category Name" name={"name"}>
                    <Input className='w-full p-2 border border-slate-300 rounded focus:outline-none' placeholder="Enter category name"></Input>
                </Form.Item>

                <button className='btn'>Add Category</button>
            </Form>

            <div>
                <Table className='w-full'>
                    <TableHeader className='w-full'>
                        <TableRow className='w-full'>
                            <TableHead>Invoice</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className='w-full'>
                        {data?.data.map((item: any) => (
                            <TableRow key={item._id} className='w-full'>
                                <TableCell className="font-medium">{item._id}</TableCell>
                                <TableCell>
                                    <div className='flex group items-center relative'>
                                        <Form  layout="vertical" className='w-full'>
                                            <Form.Item name={"name"}>
                                                <input onBlur={(e) => mutation.mutate({ _id: item?._id, name: e.target.value })} className='w-full p-2 border border-none bg-transparent rounded focus:outline-none' defaultValue={item?.name} type="text" />
                                                {/* {<button>
                                                    <CheckOutlined className='hidden cursor-pointer group-hover:block absolute right-0' />
                                                </button>} */}
                                            </Form.Item>
                                        </Form>
                                    </div>
                                </TableCell>
                                <TableCell className='space-x-3'>
                                    <button onClick={() => console.log(item._id)} className='btn'>Edit</button>
                                    <button onClick={async () => {
                                        await deleteData(`/${item._id}`).then(() => refetch())
                                    }} className='btn'>Delete</button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">$2,500.00</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>

            </div>

        </div>
    )
}

export default CategoryPage