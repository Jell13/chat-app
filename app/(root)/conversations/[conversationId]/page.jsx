"use client"

import ConversationContainer from '@components/conversation/ConversationContainer'
import { api } from '@convex/_generated/api'
import { useQuery } from 'convex/react'
import { useParams } from 'next/navigation'
import React from 'react'

const ConversationPage = ({params: {conversationId}}) => {
  
  const conversation = useQuery(api.conversation.get, {id: conversationId})

  return (
    <ConversationContainer>
      Conversation Page
    </ConversationContainer>
  )
}

export default ConversationPage
