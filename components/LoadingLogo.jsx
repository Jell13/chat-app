import Image from 'next/image'
import React from 'react'

const LoadingLogo = ({size = 100}) => {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <Image src="./logo.svg" alt='logo' className='animate-pulse' width={size} height={size}/>
    </div>
  )
}

export default LoadingLogo
