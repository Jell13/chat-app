"use client"

import ConversationContainer from '@components/conversation/ConversationContainer'
import { api } from '@convex/_generated/api'
import { useQuery } from 'convex/react'
import { Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import React from 'react'
import Header from './_components/Header'
import Body from './_components/body/Body'
import ChatInput from './_components/input/ChatInput'

const ConversationPage = ({params: {conversationId}}) => {
  
  const conversation = useQuery(api.conversation.get, {id: conversationId})

  return (
    conversation === undefined ? <div className='w-full h-full flex items-center justify-center'><Loader2 className='h-8 w-8'/></div> : 
    conversation === null ? <p className='w-full h-full flex items-center justify-center'>Conversation not found</p> : <ConversationContainer>
      <Header name={conversation.isGroup ? conversation.name : conversation.otherMember.username || ""} imageUrl={conversation.isGroup ? undefined : conversation.otherMember.imageUrl}/>
      <Body/>
      <ChatInput/>
    </ConversationContainer>
  )
}

export default ConversationPage
