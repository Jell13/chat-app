"use client"

import { api } from "@convex/_generated/api";
import { useConvexAuth, useMutation } from "convex/react";
import { useEffect } from "react";

export default function Home() {

  const store = useMutation(api.users.store)
  const {isAuthenticated} = useConvexAuth()

  useEffect(() => {
    if(isAuthenticated){
      store()
    }
  })
  return (
    null
  );
}
