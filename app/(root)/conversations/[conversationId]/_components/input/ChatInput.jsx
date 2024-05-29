"use client"

import { Card } from '@components/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@components/ui/form'
import { api } from '@convex/_generated/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useConversation } from '@hooks/useConversation'
import { useMutationState } from '@hooks/useMutationState'
import { ConvexError } from 'convex/values'
import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'
import { toast } from 'sonner'
import { z } from 'zod'

const chatMessageSchema = z.object({
  content: z.string().min(1,{message: "This field can't be empty"})
})

const ChatInput = () => {

  const textareaRef = useRef(null)

  const {conversationId} = useConversation()
  const{mutate:createMessage, pending} = useMutationState(api.message.create)

  const form = useForm({
    resolver: zodResolver(chatMessageSchema),
    defaultValues:{
      content: "",
    }
  })

  const handleSubmit = async () => {
    await createMessage({conversationId, type:"text", content: [values.content] }).then(() => {
      form.reset()
    }).catch((error) => {
      toast.error(error instanceof ConvexError ? error.data : "Unexpected error occured")
    })
  }

  const handleInputChange = (event) => {
    const {value, selectionStart} = event.target 
    
    if(selectionStart !== null){
      form.setValue("content", value)
    }
  }
  return (
    <Card className="w-full p-2 rounded-lg relative">
      <div className='flex gap-2 items-end w-full'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='flex gap-2 items-end w-full'>
            <FormField control={form.control} name="content" render={({field}) => {
              return <FormItem className="h-full w-full">
                <FormControl>
                  <TextareaAutosize onKeyDown={async e => {if(e.key === "Enter" && !e.shiftKey){ e.preventDefault(); await form.handleSubmit(handleSubmit)}}} rows={1} maxRows={3} {...field} onChange={handleInputChange} onClick={handleInputChange} placeholder='Type a message...' 
                  className='min-h-full w-full resize-none border-0 outline-0 bg-card text-card-foreground placeholder:text-muted-foreground p-1.5'/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            }}>

            </FormField>
          </form>
        </Form>
      </div>
    </Card>
  )
}

export default ChatInput
