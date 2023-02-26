import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


interface phoneNumberType  {
    isPhoneNumberDisabled: boolean | undefined,
    phoneNumber: string,
    setPhoneNumber: (phone:string) => void
}

export const PhoneInputCountry = (phoneData:phoneNumberType) => {
    return (
        <PhoneInput
            country={'ind'}
            value={phoneData?.phoneNumber}
            onChange={phoneData?.setPhoneNumber}
        />
    )
}

export default PhoneInput