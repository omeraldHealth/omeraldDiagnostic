import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { phoneNumberType } from 'utils/store/types';
import { getCountries } from 'react-phone-number-input/input';
import { useState } from 'react';

export const PhoneInputCountry = (phoneData:phoneNumberType) => {

    return (
        <PhoneInput
            placeholder="Enter 10 digit phone number"
            className='text-light font-light border-2 px-2 rounded-lg '
            value={phoneData?.phoneNumber}
            defaultCountry="IN"
            onChange={(e)=>{
                if(phoneData?.handleDisable){
                    if(e && e?.length>7 && e?.length<14)
                    {phoneData?.handleDisable(false)
                    }else{ 
                        phoneData?.handleDisable(true)
                    }
                }
                phoneData?.setPhoneNumber(e)
            }}
            countries={getCountries()}
      />
    )
}