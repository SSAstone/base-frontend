"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext<any>(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children } : { children: React.ReactNode }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io('http://localhost:5550') as any; // Backend URL
    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
