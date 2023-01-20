import React, { useRef, useState } from "react";
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
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/router";
import Button from "../core/Button/Button.component";
import InputGroup from "../core/InputGroup/InputGroup.component";
import {logoIcon, signDoctorImage, thoughtsImage} from "../../components/core/images/image"
import OtpInput from "react-otp-input";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {errorAlert, successAlert} from "../../components/alerts/alert"
import { contains } from "@firebase/util";
import {LoaderComp} from "../../components/alerts/loader" 

const LoginComponent = () => {
  const auth = getAuth();
  auth.languageCode = "en";

  const { user, loading, signIn } = useAuth();
  const phoneInputRef = useRef(null);
  const [isPhoneInputFocusedOnce, setIsPhoneInputFocusedOnce] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [expandForm, setExpandForm] = useState(false);
  const [loadOtp, setLoadOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const [isPhoneNumberDisabled, setPhoneNumberDisabled] = useState(false);

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // onSignInSubmit();
        },
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
          console.error(error);
          setLoadOtp(false)
          errorAlert("Error sending otp "+error )
        });
    }else{
      errorAlert("Length should be of min 8 digits");
    }
  };

  const verifyOTP: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setLoadOtp(true)
    setError("");
    if (otp.length === 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then(async (result: UserCredential) => {
          setLoadOtp(false)
          successAlert("User logged in succesfully")
          signIn(result.user, "/dashboard");
        })
        .catch((error: any) => {
          if (error?.code === "auth/invalid-verification-code") {
            setError("Invalid OTP");
            errorAlert("Invalid OTP ")
          }
          setLoadOtp(false)
          // console.log(JSON.stringify(error));
        });
    } else {
      setError("Length should be of 6 digits");
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-signBanner content-between flex" >
        <div className="w-[90vw] sm:w-[80vw] lg:w-[65vw] h-auto xl:w-[50vw] py-5 xl:py-2 m-auto grid grid-cols-3 bg-white">
          <div className="hidden sm:block col-span-1 text-center px-4 xl:px-8 border-r-2">
            <img className="my-10" src={signDoctorImage} alt="banner-doctor-img" />
            <p className="text-orange-500 font-bold mb-3 font-serif">Reporting Simplified</p>
            <p className="font-extralight text-sm">Store, Analyse and share test reports with omerald at your fingertips </p>
            <a href={process.env.NEXT_PUBLIC_OMERALD_PROD} target="_blank">
              <button className="bg-orange-100 text-sm p-2 my-5 font-light text-orange-500 rounded-xl">Know more</button>
            </a>
          </div>
          <div  className="col-span-3 p-4 sm:col-span-2 text-center">
          <div>
        </div>
              <section className="flex justify-center w-[100%] mt-2" id="logo">
                <img src={logoIcon} className="w-[50px] h-[50px] m-2" alt="logo-icon" />
                <p className="pt-4 text-orange-400 text-lg">OMERALD</p>
              </section>
              <p className="text-md font-light text-gray-500"><span className="font-semibold text-lightBlue-800">Sign In</span> to get started with omerald diagnostics</p>
              <img src={thoughtsImage} alt="thought-process" className="m-auto my-8 w-[220px] " />
              <form onSubmit={verifyOTP}>
                <div id="phoneNumber" className="pb-4">
                  {!expandForm &&<div
                    className={`border-2 rounded-md pl-2 w-[80%] sm:w-[60%] m-auto text-xs font-extralight 
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
                  </div>
                )}
                <div id="recaptcha-container"></div>
              </form>
          </div>
        </div>
        {loadOtp? <LoaderComp/>:<></>}
    </div>
  );
};

export default LoginComponent;
