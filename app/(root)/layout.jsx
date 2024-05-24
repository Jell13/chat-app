import Sidebarwrapper from '@components/SidebarWrapper'
import React from 'react'

const Layout = ({children}) => {
  return (
    <Sidebarwrapper>
        {children}
    </Sidebarwrapper>
  )
}

export default Layout
