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

const LoginComponent = () => {
  const auth = getAuth();
  auth.languageCode = "en";

  const { user, loading, signIn } = useAuth();
  const phoneInputRef = useRef(null);
  const [isPhoneInputFocusedOnce, setIsPhoneInputFocusedOnce] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [expandForm, setExpandForm] = useState(false);
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
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setExpandForm(true);
          setPhoneNumberDisabled(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const verifyOTP: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setError("");
    if (otp.length === 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then(async (result: UserCredential) => {
          signIn(result.user, "/dashboard");
        })
        .catch((error: any) => {
          if (error?.code === "auth/invalid-verification-code") {
            setError("Invalid OTP");
          }
          console.log(JSON.stringify(error));
        });
    } else {
      setError("Length should be of 6 digits");
    }
  };

  return (
    <div className="grid grid-cols-3 gap-10 m-20 border-primary border-2 rounded-md">
      <div className="rounded-md col-span-2 ">
        <img src="/icons/diagnosticLogin.webp" />
      </div>
      <div className="py-10 pr-10">
        <div id="heading" className="pb-10">
          <h2 className="font-medium text-3xl text-gray-600 pb-2">Login</h2>
          <span className="font-extralight text-sm text-gray-500">
            Enter your phone number to proceed
          </span>
        </div>
        <form onSubmit={verifyOTP}>
          <label className="block text-sm font-medium text-gray-700 pb-1">
            Phone number
          </label>
          <div id="phoneNumber" className="pb-4">
            <div
              className={`border-2 rounded-md pl-2 
              ${
                isPhoneInputFocusedOnce
                  ? isValidPhoneNumber(phoneNumber)
                    ? " border-primary "
                    : " border-red-500"
                  : " border-gray-500"
              }
              `}
            >
              <PhoneInputWithCountrySelect
                ref={phoneInputRef}
                // containerClass=" PhoneInputContainerStyle "
                // inputClass="border-2 border-primary"
                // containerStyle={{ border: "10px solid #45A19E" }}
                disabled={isPhoneNumberDisabled}
                name="phoneNumberInput"
                defaultCountry="IN"
                value={phoneNumber}
                onChange={(value) =>
                  value === undefined
                    ? setPhoneNumber("")
                    : setPhoneNumber(value)
                }
              />
            </div>

            {!isValidPhoneNumber(phoneNumber) && checkIfFocused() && (
              <span className="mt-1 text-sm text-red-600 w-full block">
                Please Enter a valid Number
              </span>
            )}
          </div>

          {!expandForm && (
            <div>
              <Button
                name="Send OTP"
                styles="basic"
                onClick={(e) => requestOTP(e)}
                // className="block border-2 border-black bg-blue-500 active:bg-blue-900"
              />
            </div>
          )}
          {expandForm && (
            <div>
              <InputGroup
                value={otp}
                labelName="OTP"
                inputName="otp"
                inputType="number"
                error={error}
                register={() => {}}
                onChange={(e) => setOtp(e.target.value)}
              />
              {/* <input
                className="block border-2 border-black"
                type={"number"}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              /> */}
              <div className="pt-2">
                <Button name="Submit" type="submit" />
              </div>
            </div>
          )}
          {/* {error.length > 0 && <span className="text-red-500">{error}</span>} */}

          <div id="recaptcha-container"></div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
