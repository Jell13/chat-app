"use client"

import React from 'react'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@components/ui/dialog'
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip'
import { Button } from '@components/ui/button'
import { UserPlus } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form'
import { Input } from '@components/ui/input'
import { useMutationState } from '@hooks/useMutationState'
import { ConvexError } from 'convex/values'
import { api } from '@convex/_generated/api'
import { toast } from 'sonner'

const addFriendFormSchema = z.object({
    email: z.string().min(1,{message: "This field can't be empty"}).email("Please enter a valid email")
})

const AddFriendDialog = () => {

    const {mutate:createReq, pending} = useMutationState(api.request.create)

    const form = useForm({
        resolver: zodResolver(addFriendFormSchema),
        defaultValues:{
            email: "",
        }
    })

    const handleSubmit = async (values) => {
      await createReq({email: values.email}).then(() => {
        form.reset()
        toast.success("Friend request send!")
      }).catch(error => {
        toast.error(error instanceof ConvexError ? error.data : "Unexpected error occured")
      })
    }

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger>
            <Button size="icon" variant="outline">
              <DialogTrigger>
                <UserPlus/>
              </DialogTrigger>
            </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add Friend</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add friend</DialogTitle>
          <DialogDescription>
            Send a request to connect with your friends!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
            <FormField control={form.control} name="email" render={({field}) => (<FormItem>
              <FormLabel>
                Email
              </FormLabel>
              <FormControl>
                <Input placeholder="Email..." {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>)}/>
            <DialogFooter>
                <Button disabled={false} type="submit">Send</Button>
              </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddFriendDialog
