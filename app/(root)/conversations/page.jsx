"use client"

import React from 'react'

import { api } from "@convex/_generated/api";
import { useConvexAuth, useMutation } from "convex/react";
import { useEffect } from "react";
import { SignOutButton, UserButton } from '@clerk/nextjs';

const converPage = () => {

    const store = useMutation(api.users.store)
    const {isAuthenticated} = useConvexAuth()

    useEffect(() => {
        if(isAuthenticated){
            store({})
        }
    })
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      Main Shit
      <UserButton/>
    </div>
  )
}

export default converPage
