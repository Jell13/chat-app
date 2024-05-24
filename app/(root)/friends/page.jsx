import ConversationFallback from '@components/conversation/ConversationFallback'
import ItemList from '@components/item-list/ItemList'
import React from 'react'

const FriendsPage = () => {
  return (
    <>
      <ItemList title="Friends">Friends Page</ItemList>
      <ConversationFallback/>
    </>
  )
}

export default FriendsPage
