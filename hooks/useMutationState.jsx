import { useMutation } from "convex/react"
import { useState } from "react"

export const useMutationState = (mutationToRun) => {
    const[pending, setPending] = useState(false)

    const mutationFn = useMutation(mutationToRun)

    const mutate = (payload) => {
        setPending(true)

        return mutationFn(payload).then(res => {return res}).catch(error => {throw error}).finally(() => setPending(false))
    }

    return {mutate, pending}
}