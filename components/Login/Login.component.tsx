import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInputWithCountrySelect, {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { sign } from "crypto";
import firebase from "../../lib/firebase";
import { useAuth } from "../../lib/auth";

const LoginComponent = () => {
  // const {
  //   register,
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();
  // console.log(control);
  const auth = getAuth();
  auth.languageCode = "en";
  const { user, loading, signInWithOtp } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [expandForm, setExpandForm] = useState(false);
  const [otp, setOtp] = useState("");

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
  const requestOTP = (e) => {
    e.preventDefault();
    if (isValidPhoneNumber(phoneNumber)) {
      console.log("aachs");
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          console.log("aachs2");

          window.confirmationResult = confirmationResult;
          setExpandForm(true);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("enter valid phone number");
    }
  };
  const verifyOTP = (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      signInWithOtp(otp);
      //   let confirmationResult = window.confirmationResult;
      //   confirmationResult
      //     .confirm(Number(otp))
      //     .then((result) => {
      //       console.log(result);
      //     })
      //     .catch((error) => {
      //       console.error(error);
      //     });
    }
  };

  return (
    <div>
      <form onSubmit={verifyOTP}>
        <label>Phone Number</label>

        <PhoneInputWithCountrySelect
          // {...register("phoneNumberInput", {})}
          name="phoneNumberInput"
          defaultCountry="IN"
          value={phoneNumber}
          onChange={(value) =>
            value === undefined ? setPhoneNumber("") : setPhoneNumber(value)
          }
          rules={{ required: true, validate: isValidPhoneNumber }}
        />

        {isValidPhoneNumber(phoneNumber) ? null : (
          <span className="text-red-500">Please Enter a valid Number</span>
        )}
        {!expandForm && (
          <button
            onClick={(e) => requestOTP(e)}
            className="block border-2 border-black bg-blue-500 active:bg-blue-900"
          >
            Send OTP
          </button>
        )}
        {expandForm && (
          <>
            <input
              className="block border-2 border-black"
              type={"number"}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              type="submit"
              className="border-2 border-black bg-blue-500 active:bg-blue-900"
            >
              Submit
            </button>
          </>
        )}

        <div id="recaptcha-container"></div>
      </form>
    </div>
  );
};

export default LoginComponent;
