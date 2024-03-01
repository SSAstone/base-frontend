"use client"
import { Form, Input } from 'antd';
import React, { useEffect, useMemo } from 'react'
import { io } from 'socket.io-client';

const Messages = () => {
    const socket: any = useMemo(() => io("http://localhost:5000", {
        withCredentials: true,
    }), []);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected", socket.id);
        });
        socket.on("test-response", (data: any) => {
            console.log("message", data);
        })
        // return () => {
        //     socket.disconnect();
        // };
    }, [socket]);



    return (
        <div>
            <Form layout="inline" onFinish={(val) => {
                console.log(val)
                socket.emit("test", val.message)
            }}>
                <Form.Item name="message">
                    <Input />
                </Form.Item>
                <button>Submit</button>
            </Form>
        </div>
    )
}

export default Messages