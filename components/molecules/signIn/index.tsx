import React, { useEffect, useState } from "react";
import {
  isValidPhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  UserCredential,
} from "firebase/auth";
import 'react-toastify/dist/ReactToastify.css';
import { BodyText_2 } from "@components/atoms/font";
import { errorAlert, successAlert } from "@components/atoms/alerts/alert";
import { Spinner } from "@components/atoms/loader";
import { useAuthContext } from "utils/context/auth.context";
import { PhoneInputCountry } from "@components/atoms/phoneInput/phoneInput";
import OtpInputComp from "@components/atoms/phoneInput/otpInput";

const SignInComponent = () => {
  const auth = getAuth();
  const {signIn} = useAuthContext()
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpRequestSent, setOtpRequestSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (seconds === 0) {
      return;
    }

    const timer = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const generateRecaptcha = () => {
    const recaptchaElement = document.getElementById("recaptcha-container")
    if (!window.recaptchaVerifier || (recaptchaElement && recaptchaElement?.childNodes.length==0) ){
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {},
        },
        auth
      );
    }
  };
  
  const requestOTP = (e:any) => {
    e.preventDefault();

    if (isValidPhoneNumber(phoneNumber)) {
      setLoading(true)
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          successAlert("OTP Sent")
          setLoading(false)
          setOtpRequestSent(true);
        })
        .catch((error) => {
          setLoading(false)
          errorAlert("Error sending otp "+error )
        });
    }else{
      errorAlert("Length should be of min 8 digits");
    }
    setSeconds(30)
  };

  const verifyOTP: React.FormEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      setLoading(true)
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then(async (result: UserCredential) => {
          setLoading(false)
          signIn(result.user, "/dashboard");
        })
        .catch((error: any) => {
          if (error?.code === "auth/invalid-verification-code") {
            errorAlert("Invalid OTP ");
          }
          setLoading(false)
        });
    } else {
      errorAlert("Otp Length should be of 6 digits")
    }
  };

  return (
    <section className="h-auto my-[10vh]">
          <section className="w-[90vw] sm:w-[80vw] lg:w-[40vw] sm:h-[30vh] lg:h-[45vh] rounded-lg bg-white shadow-xl m-auto self-center p-1 py-10 sm:p-10 text-center"> 
              <BodyText_2 style="text-black">Welcome Back 👋</BodyText_2>
              <p className="text-black font-md text-xl mb-10">Sign In to your Account</p>
              <section>
                    <section className="sm:w-[60%] w-[80%] m-auto border-2 border-gray-200 rounded-md px-1 text-center ">
                      {!otpRequestSent? <PhoneInputCountry phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} isPhoneNumberDisabled={false} />:
                      <OtpInputComp otp={otp} setOtp={setOtp} />}
                    </section>
                    <div className="flex justify-center my-4">
                      {!otpRequestSent? 
                      <button onClick={requestOTP} className="block  w-[80%] sm:w-[60%]  bg-blue-800 text-white p-2 text-sm rounded-md">SEND OTP</button>:
                      <button onClick={verifyOTP} type="submit"className="block w-[80%] sm:w-[60%] bg-green-800 text-white p-2 text-sm rounded-md">SUBMIT OTP</button>
                      }
                    </div>
                    {otpRequestSent && <><section className="mt-4">
                          {seconds > 0 && <p>Did'nt receive otp? resend in <span className="text-red-500">{seconds}</span> seconds</p>}
                          {seconds == 0 &&<p>Did'nt receive otp? <a href="#" onClick={requestOTP} className="text-green-900">Resend Otp</a></p>}
                    </section></>}
                    <div id="recaptcha-container"></div>
              </section>
              {loading && <Spinner/>}
          </section>
    </section>
  );
};

export default SignInComponent;
