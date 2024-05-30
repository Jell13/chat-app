"use client"

import { api } from '@convex/_generated/api'
import { useConversation } from '@hooks/useConversation'
import { useQuery } from 'convex/react'
import React from 'react'
import Message from './Message'

const Body = () => {

  const {conversationId} = useConversation()

  const messages = useQuery(api.messages.get, {
    id: conversationId
  })

  return (
    <div className='flex-1 w-full flex overflow-y-scroll flex-col-reverse gap-2 p-3 no-scrollbar'>
      {messages?.map(({message, senderImage, senderName, isCurrentUser}, index) => {
        const lastByUser = messages[index-1]?.message.senderId === messages[index].message.senderId

        return <Message key={message._id} fromCurrentUser={isCurrentUser} senderImage={senderImage} senderName={senderName} lastByUser={lastByUser} content={message.content}
        createdAt={message._creationTime} type={message.type}/>
      })}
    </div>
  )
}

export default Body
