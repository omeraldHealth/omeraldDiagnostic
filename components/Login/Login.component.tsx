import React, { useState } from "react";
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
    <div className="grid grid-cols-2  m-20 border-primary border-2 rounded-md">
      <div className="rounded-md">
        <img src="/icons/diagnosticLogin.webp" />
      </div>
      <div className="p-10 ">
        <div id="heading" className="pb-10">
          <h2 className="font-medium text-3xl text-gray-600">Login</h2>
        </div>
        <form onSubmit={verifyOTP}>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <div id="phoneNumber" className="pb-4">
            <PhoneInputWithCountrySelect
              disabled={isPhoneNumberDisabled}
              name="phoneNumberInput"
              defaultCountry="IN"
              value={phoneNumber}
              onChange={(value) =>
                value === undefined ? setPhoneNumber("") : setPhoneNumber(value)
              }
            />

            {isValidPhoneNumber(phoneNumber) ? null : (
              <span className="text-red-500">Please Enter a valid Number</span>
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
