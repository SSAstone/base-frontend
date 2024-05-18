"use client"
import { UserContext } from '@/context/user_context';
import ApiFetcher from '@/hooks/use_fetch';

import React from 'react';

const UserProvider = ({ children }: { children: React.ReactNode }) => {

    const {Get} = new ApiFetcher();

    const { data, isLoading, refetch } = Get('/user/me');
    
    const logout = () => {
        document.cookie = "accessToken=;";
        localStorage.removeItem("accessToken");
    }

    const value = { user: data?.data, isLoading, logout, refetch };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;