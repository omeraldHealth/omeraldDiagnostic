import React, { FC } from 'react'


export const SignInButton: FC<any> = ({children}:any) => (
	<button className='bg-btnPrimary-600 text-white w-[132px] h-[52px] rounded-lg mx-8 font-sm text-light'>{children}</button>
)

