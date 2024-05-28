import { Card } from '@components/ui/card'
import { CircleArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Header = ({imageUrl, name}) => {
  return (
    <Card className='w-full flex rounded-lg items-center p-2 justify-between'>
        <div className='flex items-center gap-2'>
            <Link className='block lg:hidden'>
                <CircleArrowLeft/>
            </Link>
        </div>
    </Card>
  )
}

export default Header
