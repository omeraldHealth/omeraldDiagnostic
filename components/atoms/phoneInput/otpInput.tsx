

import PhoneInput from 'react-phone-input-2'
import {otpInputType} from 'utils/store/types'
import OtpInput from 'react-otp-input'

export const OtpInputComp = ({otp,setOtp}:otpInputType) => {
    return (
        <section className="m-auto w-100 flex justify-center">
        <OtpInput
            value={otp}
            onChange={(e:any)=>{setOtp(e)}}
            numInputs={6}
            isInputNum={true}
            shouldAutoFocus={true}
            inputStyle={{
            width: "35px",
            height: "35px",
            margin: "4px",
            borderRadius:"5px",
            backgroundColor:"#f5f6f7",
            color: "grey",
            }}
        />
        </section>
    )
}

export default OtpInputComp