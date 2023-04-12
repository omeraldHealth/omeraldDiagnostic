
import Link from 'next/link'
import React, { Fragment } from 'react'
import { errorImage } from '@utils'
import { TitleText } from '../font'

export default function ErrorComp ({pageName}:any) {
  return (
    <Fragment>
         <div className='my-10 p-20 bg-white rounded-full text-center'>
         <TitleText style="my-10 py-4 text-center">Error fetching {pageName}</TitleText>
         <img src={errorImage} className='w-[24vw] my-10 m-auto'/>
         <Link href='/' className="my-10 font-bold text-orange-500 text-xl py-4 text-center mx-auto"> Visit Home</Link>
        </div>
    </Fragment>
  )
}
