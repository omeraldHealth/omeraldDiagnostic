import React, { FC } from 'react'

export const SignInButton: FC<any> = ({style,children}:any) => (
	<button className= {`${style} bg-indigo-800 text-white w-[132px] h-[52px] rounded-lg font-sm text-light`}>{children}</button>)

export const SubscribeButton: FC<any> = ({children}) => (
	<button className={`bg-[#00E1F0] text-white px-4 h-[52px] mx-8 font-sm text-light`}>{children}</button>
)

// export const RequestOtpButton: any = (handleRequestOtp:any) => {
// 	return <button onClick={handleRequestOtp} className="block  w-[80%] sm:w-[60%]  bg-blue-800 text-white p-2 text-sm rounded-md">SEND OTP</button>
// }

// export const SubmitOtpButton: any = (handleVerifyOtp:any) => {
// 	return  <button onClick={handleVerifyOtp} type="submit"className="block w-[80%] sm:w-[60%] bg-green-800 text-white p-2 text-sm rounded-md">SUBMIT OTP</button>
// }