import Link from 'next/link'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className="grid grid-cols-4 gap-4">
                <Link className="btn" href="/dashboard/products">All Products</Link>
                <Link className="btn" href="/dashboard/products/add">Add Product</Link>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}
