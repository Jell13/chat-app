"use client"

import { UserButton } from "@clerk/nextjs"
import { ModeToggle } from "@components/ThemeToggle"
import { Badge } from "@components/ui/badge"
import { Button } from "@components/ui/button"
import { Card } from "@components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@components/ui/tooltip"
import { useConversation } from "@hooks/useConversation"
import { useNavigation } from "@hooks/useNavigation"
import Link from "next/link"

const MobileNav = () => {

    
    const {isAuthenticated} = useConvexAuth()


    if(isAuthenticated){
      const paths = useNavigation()
    }
    const {isActive} = useConversation()

    if(isActive) return null;

  return (
    <Card className="fixed bottom-4 lg:hidden w-[calc(100vw-32px)] flex items-center h-16 p-2">
        <nav className="w-full">
          <ul className="flex flex-row items-center justify-evenly">
            {paths?.map((path,id) => (
              <li key={id} className="relative">
                <Link href={path.href}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button size="icon" variant={path.active ? "default" : "outline"}>
                        {path.icon}
                      </Button>
                      {path.count ? <Badge className="absolute left-6 bottom-6">{path.count}</Badge>: null}
                    </TooltipTrigger>
                    <TooltipContent>
                      {path.name}
                    </TooltipContent>
                  </Tooltip>
                </Link>
              </li>
            ))}
            <li>
                <ModeToggle/>
            </li>
            <li>
                <UserButton/>
            </li>
          </ul>
        </nav> 
    </Card>
  )
}

export default MobileNav
