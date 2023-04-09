import React from "react";
import "react-phone-number-input/style.css";
import {SignUp} from "@clerk/nextjs"

const SignUpComponent = () => {
  return (
    <section className="h-auto my-[10vh] flex justify-center">
        <SignUp redirectUrl="/signIn"/>
    </section>
  );
};

export default SignUpComponent;
