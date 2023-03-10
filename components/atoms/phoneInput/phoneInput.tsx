import PhoneInput from 'react-phone-input-2'
import { phoneNumberType } from 'utils/store/types'
import PhoneInputWithCountrySelect from 'react-phone-number-input'
import 'react-phone-input-2/lib/style.css'

export const PhoneInputCountry = (phoneData:phoneNumberType) => {
    return (
        <PhoneInputWithCountrySelect
            name="phoneNumberInput"
            defaultCountry="IN"
            placeholder="Enter mobile number"
            value = {phoneData?.phoneNumber}
            onChange={(value:any)=>{phoneData?.setPhoneNumber(value)}}
        />
    )
}

export default PhoneInput