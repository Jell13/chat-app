"use client"

import { Button } from '@components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@components/ui/dialog'
import { DropdownMenu } from '@components/ui/dropdown-menu'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@components/ui/form'
import { Input } from '@components/ui/input'
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip'
import { api } from '@convex/_generated/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutationState } from '@hooks/useMutationState'
import { useQuery } from 'convex/react'
import { ConvexError } from 'convex/values'
import { CirclePlus } from 'lucide-react'
import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const createGroupFormSchema = z.object({
    name: z.string().min(1, {message: "This field can't be empty"}),
    members: z.string().array().min(1, {message: "You must select at least 1 friend"})
})

const CreateGroupDialog = () => {

    const friends = useQuery(api.friends.get)
    const {mutate: createGroup, pending} = useMutationState(api.conversation.createGroup)

    const form = useForm({
        resolver: zodResolver(createGroupFormSchema),
        defaultValues:{
            name: "",
            members: []
        }
    })

    const members = form.watch("members", [])
    const unselectedFriends = useMemo(() => {
        return friends ? friends.filter(friend => !members.includes(friend._id)) : []
    }, [members.length, friends?.length])
  
    const handleSubmit = async (values) => {
        await createGroup({name: values.name, members: values.members}).then(() => {
            form.reset()
            toast.success("Group created!")
        }).catch(error => {
            toast.error(error instanceof ConvexError ? error.data : "Unexpected error occured")
        })
    }
    return (
    <Dialog>
        <Tooltip>
            <TooltipTrigger>
                <Button size="icon" variant="outline">
                    <DialogTrigger asChild>
                        <CirclePlus/>
                    </DialogTrigger>
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Create Group</p>
            </TooltipContent>
        </Tooltip>

        <DialogContent className="block">
            <DialogHeader>
                <DialogTitle>Create group</DialogTitle>
                <DialogDescription>Add your friends to get started</DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}
                className='space-y-8'>
                    <FormField control={form.control} name="name"
                    render={({field}) => {
                        return <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl><Input placeholder="Group name..." {...field}></Input></FormControl>
                        </FormItem>
                    }}/>

                    <FormField control={form.control} name="members"
                    render={() => {
                        return <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl><DropdownMenu></DropdownMenu></FormControl>
                        </FormItem>
                    }}/>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
  )
}

export default CreateGroupDialog
