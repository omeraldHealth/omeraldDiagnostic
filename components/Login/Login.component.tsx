import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
  const { user, loading, signIn } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [expandForm, setExpandForm] = useState(false);
  const [otp, setOtp] = useState("");
  const router = useRouter();
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
  const verifyOTP: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then(async (result: UserCredential) => {
          const res = await signIn(result.user, "/dashboard", phoneNumber);
          console.log(res);
          if (res.data.user) {
            router.push("/dashboard");
          } else {
            router.push("/onboard");
          }

          // if (res.status == 200) {
          // } else if (res.status == 404) {
          //   router.push("/onboard");
          // }
        })
        .catch((error: Error) => {
          console.error(error);
        });
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
