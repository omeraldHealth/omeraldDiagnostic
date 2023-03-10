import React, { FC } from 'react'


export const SignInButton: FC<any> = ({style,children}:any) => (
	<button className= {`${style} bg-btnPrimary-600 text-white w-[132px] h-[52px] rounded-lg font-sm text-light`}>{children}</button>)

export const SubscribeButton: FC<any> = ({children}) => (
	<button className={`bg-[#00E1F0] text-white px-4 h-[52px] mx-8 font-sm text-light`}>{children}</button>
)
