"use client"

import { api } from "@convex/_generated/api"
import { useConvexAuth, useMutation } from "convex/react"
import Link from "next/link"
import { useEffect } from "react"

export default function Home() {

  const store = useMutation(api.user.store)
    const {isAuthenticated} = useConvexAuth()

    useEffect(() => {
        if(isAuthenticated){
            store({})
        }
    })

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card>
        <h1>Welcome to chat app</h1>
        <Link href={"/conversations"}>Enter Chat-App</Link>
      </Card>
    </div>
  )
}
