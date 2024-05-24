"use client"

import React from 'react'

import { api } from "@convex/_generated/api";
import { useConvexAuth, useMutation } from "convex/react";
import { useEffect } from "react";
import { SignOutButton, UserButton } from '@clerk/nextjs';

const ConversationsPage = () => {

    const store = useMutation(api.users.store)
    const {isAuthenticated} = useConvexAuth()

    useEffect(() => {
        if(isAuthenticated){
            store({})
        }
    })
  return (
    <div>
      Conversations page
    </div>
  )
}

export default ConversationsPage
