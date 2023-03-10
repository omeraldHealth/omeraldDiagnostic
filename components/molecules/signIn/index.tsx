import React, { useEffect, useRef, useState } from "react";
import PhoneInputWithCountrySelect, {
  isValidPhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  UserCredential,
} from "firebase/auth";
import OtpInput from "react-otp-input";
import 'react-toastify/dist/ReactToastify.css';
import { BodyText_2 } from "@components/atoms/font";
import { errorAlert, successAlert } from "@components/atoms/alerts/alert";
import { Spinner } from "@components/atoms/loader";
import { useAuthContext } from "utils/context/auth.context";
import { useDispatch,useSelector } from "react-redux";
import { rootReducerType } from "utils/store/types";
import { useRouter } from "next/router";

const SignInComponent = () => {
  const auth = getAuth();
  const {user,signIn,diagnosticDetails} = useAuthContext()
  const phoneInputRef = useRef(null);
  const [isPhoneInputFocusedOnce, setIsPhoneInputFocusedOnce] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [expandForm, setExpandForm] = useState(false);
  const [loadOtp, setLoadOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [seconds, setSeconds] = useState(0);
  const dispatch = useDispatch()
  const reducer = useSelector((state:rootReducerType) => state);
  auth.languageCode = "en";
  const route = useRouter()


  useEffect(() => {
    // Exit early when timer reaches 0
    if (seconds === 0) {
      return;
    }

    // Decrease timer every second
    const timer = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);

    // Clear interval when component unmounts
    return () => clearInterval(timer);
  }, [seconds]);

  // useEffect(()=>{
  //   if(diagnosticDetails?.phoneNumber){
  //     route.push("/dashboard")
  //   }
  // },[])

  const [isPhoneNumberDisabled, setPhoneNumberDisabled] = useState(false);

  const generateRecaptcha = () => {
    if (window.recaptchaVerifier) {
      const recaptchaElement = document.getElementById('recaptcha-container');
      // If the element has a reCAPTCHA widget rendered in it
      if (recaptchaElement?.childNodes && recaptchaElement?.childNodes.length > 0) {
        // Remove the existing reCAPTCHA widget
        recaptchaElement.removeChild(recaptchaElement.childNodes[0]);
       
      }
      window.recaptchaVerifier.clear()
    }
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {},
      },
      auth
    );

  };
  
  const checkIfFocused = () => {
    if (
      typeof window !== "undefined" &&
      document.activeElement === phoneInputRef.current
    ) {
      if (!isPhoneInputFocusedOnce) {
        setIsPhoneInputFocusedOnce(true);
      }
      return true;
    } else return false;
  };

  const requestOTP: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (isValidPhoneNumber(phoneNumber)) {
      setLoadOtp(true)
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          successAlert("OTP Sent")
          setExpandForm(true);
          setLoadOtp(false)
          setPhoneNumberDisabled(true);
        })
        .catch((error) => {
          setLoadOtp(false)
          errorAlert("Error sending otp "+error )
        });
    }else{
      errorAlert("Length should be of min 8 digits");
    }
    setSeconds(30)
  };

  const verifyOTP: React.FormEventHandler<HTMLFormElement> = (e) => {
    dispatch({type:"SET_LOADING",payload:true})
    e.preventDefault();
    setError("");
    if (otp.length === 6) {
      setLoadOtp(true)
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then(async (result: UserCredential) => {
          dispatch({ type: 'LOGIN_SUCCESS', payload: true });
          setLoadOtp(false)
          signIn(result.user, "/dashboard");
        })
        .catch((error: any) => {
          if (error?.code === "auth/invalid-verification-code") {
            setError("Invalid OTP");
            errorAlert("Invalid OTP ");
          }
          dispatch({ type: 'LOGIN_FAILED', payload: error });
          setLoadOtp(false)
        });
    } else {
      setError("Length should be of 6 digits");
      errorAlert("Otp Length should be of 6 digits")
    }
  };

  return (<section className="lg:h-[70vh] my-[10vh] ">
          <section className="w-[90vw] sm:w-[80vw] lg:w-[40vw] sm:h-[30vh] lg:h-[45vh] rounded-lg bg-white shadow-xl m-auto self-center p-1 py-10 sm:p-10 text-center"> 
              <BodyText_2 style="text-black">Welcome Back 👋</BodyText_2>
              <p className="text-black font-md text-xl mb-10">Sign In to your Account</p>
              <form onSubmit={verifyOTP}>
                    <div id="phoneNumber" className="pb-4">
                      {!expandForm &&<div
                        className={`border-2 border-gray-200 rounded-md pl-2 w-[80%] sm:w-[60%] m-auto text-xs font-extralight 
                        ${
                          isPhoneInputFocusedOnce
                            ? isValidPhoneNumber(phoneNumber)
                              ? " border-gray-900"
                              : " border-red-500"
                            : " border-gray-300"
                        }
                        `}
                      >
                        <PhoneInputWithCountrySelect
                          ref={phoneInputRef}
                          disabled={isPhoneNumberDisabled}
                          name="phoneNumberInput"
                          defaultCountry="IN"
                          placeholder="Enter mobile number"
                          value={phoneNumber}
                          onChange={(value) =>
                            value === undefined
                              ? setPhoneNumber("")
                              : setPhoneNumber(value)
                          }
                        />
                      </div>
                      }
                      {!isValidPhoneNumber(phoneNumber) && checkIfFocused() && (
                        <span className="mt-1 text-sm text-red-600 w-full block">
                              Please Enter a valid Number
                          </span>
                      )} 
                    </div>
                    {!expandForm && (
                      <div className="flex justify-center">
                        <button
                          onClick={(e) => requestOTP(e)}
                          className="block  w-[80%] sm:w-[60%]  bg-blue-800 text-white p-2 text-sm rounded-md"
                        >SEND OTP</button>
                      </div>
                    )}
                    {expandForm && (
                      <div >
                        <section className="m-auto w-100 flex justify-center">
                          <OtpInput
                            value={otp}
                            onChange={(e)=>{setOtp(e)}}
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
                        <div className="flex justify-center mt-4">
                          <button name="Submit" type="submit"
                            className="block w-[80%] sm:w-[60%] bg-blue-800 text-white p-2 text-sm rounded-md"
                          >SUBMIT OTP</button>
                        </div>
                        <section className="mt-4">
                          {seconds > 0 && <p>Did'nt receive otp? resend in <span className="text-red-500">{seconds}</span> seconds</p>}
                          {seconds == 0 && <button onClick={requestOTP} className="p-2 border-2 bg-gray-300 rounded-lg">Resend</button>}
                        </section>
               
                      </div>
                    )}
                    <div id="recaptcha-container"></div>
              </form>
              {loadOtp && <Spinner/>}
          </section>
    </section>
  );
};

export default SignInComponent;
