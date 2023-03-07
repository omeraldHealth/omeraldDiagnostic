import { errorImage } from '@utils'
import Link from 'next/link'
import React from 'react'
import { TitleText } from '../font'

export const ErrorComp = ({pageName}:any) => {
  return (
    <div className='my-10 p-20 bg-white rounded-full text-center'>
        <TitleText style="my-10 py-4 text-center">Error fetching {pageName}</TitleText>
         <img src={errorImage} className='w-[24vw] my-10'/>
         <Link href='/' className="my-10 font-bold text-orangeBg text-xl py-4 text-center mx-auto"> Visit Home</Link>
    </div>
  )
}
