"use client"
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import ApiFetcher, { deleteData } from '@/hooks/use_fetch'
import Image from 'next/image'
import Link from 'next/link'
import { productData } from '@/lib/end_piont'



export default function Products() {
  const { Get } = new ApiFetcher()
  const { data, refetch, getData } = Get(productData) as any
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getData({ page: currentPage, limit: '3' })
  }, [currentPage])

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead className="">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.docs?.map((invoice: any) => (
            <TableRow key={invoice._id}>
              <TableCell className="font-medium">{invoice._id}</TableCell>
              <TableCell className="">
                <Image className='w-[40px] h-[40px]' src={invoice?.image} alt={"image"} width={50} height={50}></Image>
              </TableCell>
              <TableCell>{invoice?.name}</TableCell>
              <TableCell>{invoice?.category?.name}</TableCell>
              <TableCell className='space-x-3 text-right'>
                <Link className='btn' href={`/dashboard/products/${invoice._id}`}>Edit</Link>
                <button onClick={async () => {
                  await deleteData(`/product/${invoice._id}`).then(() => refetch())
                }} className='btn'>Delete</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="w-full">
          <TableRow>
            <TableCell><p>
              Page {currentPage} of {data?.totalDocs}
            </p></TableCell>
            <TableCell colSpan={4} className="text-right space-x-5">
              <button className='btn' onClick={() => setCurrentPage(currentPage - 1)} disabled={!data?.prevPage}>
                Prev Page
              </button>
              <button className='btn' onClick={() => setCurrentPage(currentPage + 1)} disabled={!data?.nextPage}>
                Next Page
              </button>

            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
