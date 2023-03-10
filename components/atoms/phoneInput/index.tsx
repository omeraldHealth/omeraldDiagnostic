import PhoneInput from 'react-phone-input-2'
import { phoneNumberType } from 'utils/store/types'
import 'react-phone-input-2/lib/style.css'

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