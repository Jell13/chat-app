
import ItemList from '@components/item-list/ItemList'
import React from 'react'

const ConversationsLayout = ({children}) => {
  return (
    <>
      <ItemList title="Conversations">
        Conversation Page
      </ItemList>
      {children}
    </>
  )
}

export default ConversationsLayout
