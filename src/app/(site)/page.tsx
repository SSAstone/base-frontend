"use client"
import React, { useEffect } from 'react';
import Image from 'next/image';
import UserOutlined from '@ant-design/icons/UserOutlined';
import { Dropdown, Menu, Rate } from 'antd';
import ApiFetcher, { deleteData, useGet } from '@/hooks/use_fetch';
import { MdDeleteOutline, MdOutlineAddBox, MdOutlineBookmarkAdd, MdOutlineBookmarkAdded } from "react-icons/md";
import Link from 'next/link';
import { IoCartOutline } from "react-icons/io5";
import { categoryData, productData } from '@/lib/end_piont';
import { LuMinusSquare } from "react-icons/lu";
interface Item {
  name: string;
  image: string | { name: string; image: string }[];
}

const items: Item[] = [
  {
    name: 'Fanion',
    image: '/e-comm/bank.jpg',
  },
  {
    name: 'Hester',
    image: '/e-comm/com.jpg',
  },
  {
    name: 'Hester',
    image: '/e-comm/send.jpg',
  },
  {
    name: 'group',
    image: [
      {
        name: 'Hester',
        image: '/e-comm/mony.jpg',
      },
      {
        name: 'Hester',
        image: '/e-comm/send.jpg',
      },
      {
        name: 'Fanion',
        image: '/e-comm/bank.jpg',
      },
      {
        name: 'Hester',
        image: '/e-comm/com.jpg',
      }
    ],
  },
  {
    name: 'Fanion',
    image: '/e-comm/bank.jpg',
  },
  {
    name: 'Hester',
    image: '/e-comm/com.jpg',
  },
  {
    name: 'Hester',
    image: '/e-comm/mony.jpg',
  },
  {
    name: 'Hester',
    image: '/e-comm/com.jpg',
  },
  {
    name: 'Hester',
    image: '/e-comm/mony.jpg',
  },
  {
    name: 'Hester',
    image: '/e-comm/com.jpg',
  }
]

export default function Home() {
  const indexArr = items.findIndex(item => Array.isArray(item.image));
  const [bookmark, setBookmark] = React.useState([] as object[]);;
  const { Get } = new ApiFetcher();
  const { data, getData } = Get(productData) as any;
  const { data: bookmarkProductData, getData: getBookmark, refetch } = Get(productData) as any;
  console.log("🚀 ~ Home ~ bookmarkProductData:", bookmarkProductData)
  const { data: category } = Get(categoryData) as any;

  useEffect(() => {
    const bookmark = localStorage.getItem('bookmarks_items');
    if (bookmark) {
      try {
        const bookmarkParse = JSON.parse(bookmark);
        const bookmarkId = bookmarkParse?.map((e: any) => e?._id);
        setBookmark(bookmarkParse);
        getBookmark({ ids: `${[...bookmarkId].join('/')}` })
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
    getData({ page: 1, limit: 10 })
  }, []);
  
  return (
    <div className="">
      <div className="container">
        <div className='flex gap-5 justify-end'>
          <Dropdown overlay={
            <div className='bg-white p-3 rounded space-y-2'>
              {bookmark.length > 0 &&
                bookmarkProductData?.data?.map((item: any, index: number) => <div key={index}>
                  {(bookmark.find((ite: any) => ite._id === item._id) as any)?.quantity > 0 &&
                    <div key={index} className='flex gap-3 p-2 rounded items-center justify-between bg-slate-200'>
                      <div className="flex gap-3 items-center">
                        <Image className='w-10 h-10' src={item?.image} alt={item?.name} width={45} height={45} />
                        <div>
                          <p className="text-lg font-medium">{item?.name}</p>
                          <p className="text-sm">{item?.price}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center text-2xl">
                        <div className=" flex items-center">
                          <MdOutlineAddBox onClick={() => {
                            const bookmark = JSON.parse(localStorage.getItem('bookmarks_items') || '[]');
                            const itemIndex = bookmark.findIndex((ite: any) => ite._id === item._id);
                            if (itemIndex !== -1) {
                              bookmark[itemIndex].quantity = bookmark[itemIndex].quantity + 1;
                              setBookmark(bookmark);
                            }
                            localStorage.setItem('bookmarks_items', JSON.stringify(bookmark));
                          }} className="cursor-pointer" />
                          <span className="px-1">{(bookmark.find((ite: any) => ite._id === item._id) as any)?.quantity || 0}</span>
                          <LuMinusSquare onClick={() => {
                            const bookmark = JSON.parse(localStorage.getItem('bookmarks_items') || '[]');
                            const itemIndex = bookmark.findIndex((ite: any) => ite._id === item._id);
                            if (itemIndex !== -1) {
                              bookmark[itemIndex].quantity = bookmark[itemIndex].quantity - 1;
                              setBookmark(bookmark);
                            }
                            localStorage.setItem('bookmarks_items', JSON.stringify(bookmark));
                          }} className="cursor-pointer" />
                        </div>
                        <MdDeleteOutline className="cursor-pointer" onClick={async () => {
                          const bookmarksItems = bookmark.filter((bookmarks: any) => bookmarks._id !== item._id);
                          setBookmark(bookmarksItems);
                          localStorage.setItem('bookmarks_items', JSON.stringify(bookmarksItems));
                        }}></MdDeleteOutline>
                      </div>
                    </div>
                  }
                </div>)
              }
              <div className="flex justify-between items-center gap-2">
                <button className="w-full py-2 rounded bg-slate-200 text-center">Bay</button>
                <button className="w-full py-2 rounded bg-slate-200 text-center">Clear</button>
              </div>
            </div>
          }>
            <IoCartOutline className="text-3xl cursor-pointer" />
          </Dropdown>
          <Dropdown overlay={
            <div className='bg-white p-5 rounded space-y-2'>
              <p className="text-lg">Logout</p>
              <p className="text-lg">Profile</p>
            </div>
          }>
            <UserOutlined className=" text-2xl cursor-pointer" />
          </Dropdown>
        </div>
        <div className="text-center pt-32 pb-20 ">
          <h1 className="text-5xl font-bold">E-Commerce</h1>
          <p>Make your own e-commerce</p>
        </div>

        <div className="">
          <div className="bg-white py-5 flex justify-center gap-8 items-center ">
            <h1>Make your</h1>
            <h1>Make your</h1>
            <h1>Make your</h1>
            <h1>Make your</h1>
            <h1>Make your</h1>
          </div>
          <div className="mt-5">
            <div className="bg-slate-300 grid grid-cols-8 gap-2">
              {
                Array.from({ length: 10 }, (_, index) => category?.data[index % category?.data.length]).map((item: any, index: number) => (
                  <div key={index} className={`relative overflow-hidden bg-white 
                    ${index === indexArr && 'col-span-2 row-span-2 '}
                    ${index === 1 && 'row-span-2'} 
                    ${index === 5 && 'col-span-2'} 
                    ${index === 8 && 'col-span-2'}
                  }`}>
                    <h1 className="absolute bottom-0 w-full text-center bg-slate-200 py-2 bg-opacity-60">{item?.name}</h1>
                    <div className="items-center h-28 justify-center">
                      {Array.isArray(item?.image) ? (
                        <div className="w-full grid grid-cols-2 gap-2 p-2 bg-slate-500">
                          {item?.image.map((subItem: any, subIndex: number) => (
                            <div key={subIndex} className="w-full overflow-hidden">
                              <Image className='object-cover h-28 hover:scale-125 duration-300' src={subItem?.image} alt="ecommerce" width={1000} height={1000} />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Image className='object-fill hover:scale-125 duration-300' src={item?.image} alt="ecommerce" width={1000} height={1000} />
                      )}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className='mt-12'>
          <h1 className="text-5xl font-bold fredoka">For You</h1>
          <div className="grid grid-cols-6 gap-4 mt-3">
            {
              Array.from({ length: 9 }, (_, index) => data?.data?.docs[index % data?.data?.docs?.length]).map((item: any, index: number) => <div key={index} className={`bg-white  ${index === 2 ? ' row-span-2 col-span-2' : 'h-52'} overflow-hidden p-5 relative`}>
                <Link href={`/products/${item?._id}`}>
                  <div className="w-full ">
                    <Image className={` ${index === 2 ? '' : ''}`} src={item?.image} alt="ecommerce" width={1000} height={1000} />
                  </div>
                </Link>
                <div className="absolute left-0 right-0 bottom-0 w-full px-3 bg-slate-400 py-2 bg-opacity-60 text-base">
                  <div className="flex justify-between items-center">
                    <Link href={`/products/${item?._id}`}>
                      <h1>{item?.name.length > 12 ? item?.name.slice(0, 12) + '...' : item?.name}</h1>
                    </Link>
                    <h1>{item?.price}</h1>
                  </div>
                  <div className="flex justify-between items-center">
                    {item?.rating ? <Rate allowHalf defaultValue={item?.rating} className='text-sm'></Rate> : <Rate allowHalf value={5} className='text-sm'></Rate>}
                    <div className="flex items-center gap-2 relative z-10">
                      {!bookmark?.map((e: any) => e?._id)?.includes(item?._id) ? <MdOutlineBookmarkAdd onClick={() => {
                        const bookmarkProduct = [...bookmark, { _id: item._id, quantity: 1 }]
                        setBookmark(bookmarkProduct);
                        const getItem = JSON.stringify(bookmarkProduct)
                        localStorage.setItem('bookmarks_items', getItem);
                        const bookmarkId = bookmarkProduct?.map((e: any) => e?._id)
                        getBookmark({ ids: `${[...bookmarkId].join('/')}` })
                      }} className="text-xl cursor-pointer" /> : <MdOutlineBookmarkAdded className='text-xl ' />}
                    </div>
                  </div>
                </div>

              </div>)
            }
          </div>
        </div>
        {/* <div className='mt-12'>
          <h1 className="text-5xl font-bold">Best Sellers</h1>
          <div className="grid grid-cols-6 gap-4 mt-3">
            <div className="bg-white row-span-2 col-span-2">
              <div className="w-full ">
                <Image className='object-fill h-52 hover:scale-125 duration-300' src="/e-comm/mony.jpg" alt="ecommerce" width={1000} height={1000} />
              </div>
            </div>
            {
              [1, 2, 3, 4, 5, 6, 7, 8].map((item: number, index) => <div key={index} className='bg-white'>
                <div className="w-full h-52">
                  <Image className='object-fill hover:scale-125 duration-300' src="/e-comm/mony.jpg" alt="ecommerce" width={1000} height={1000} />
                </div>
              </div>)
            }
          </div>
        </div> */}
        {/*
        <div className='mt-12'>
          <h1 className="text-5xl font-bold">Trending</h1>
          <div className="grid grid-cols-6 gap-4 mt-3">
            <div className="bg-white row-span-2 col-span-2">
              <div className="w-full ">
                <Image className='object-fill h-52 hover:scale-125 duration-300' src="/e-comm/mony.jpg" alt="ecommerce" width={1000} height={1000} />
              </div>
            </div>
            {
              [1, 2, 3, 4, 5, 6, 7, 8].map((item: number, index) => <div key={index} className='bg-white'>
                <div className="w-full h-52">
                  <Image className='object-fill h-52 hover:scale-125 duration-300' src="/e-comm/mony.jpg" alt="ecommerce" width={1000} height={1000} />
                </div>
              </div>)
            }

          </div>
        </div> */}
      </div>
    </div>
  );
}
