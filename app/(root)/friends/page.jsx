

import ConversationFallback from '@components/conversation/ConversationFallback'
import ItemList from '@components/item-list/ItemList'
import React from 'react'
import AddFriendDialog from './_components/AddFriendDialog'

const FriendsPage = () => {
  return (
    <>
      <ItemList title="Friends" action={<AddFriendDialog/>}>Friends Page</ItemList>
      <ConversationFallback/>
    </>
  )
}

export default FriendsPage
