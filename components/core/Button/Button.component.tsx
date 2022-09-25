import { MailIcon } from "@heroicons/react/solid";
import React, { ReactEventHandler } from "react";
import { classNames } from "@/utils/helper";

type ButtonProps = {
  name: string;
  type?: "button" | "reset" | "submit";
  styles?: "basic";
  classNames?: string;
  onClick?: ReactEventHandler;
};
const ButtonStyles = {
  basic: {
    btnStyle:
      " px-6 py-3 shadow-sm text-xs rounded-md text-white bg-indigo-700 hover:bg-primary active:shadow-lg ",
  },
  default: {
    btnStyle:
      "inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-btnPrimary-500 hover:bg-btnPrimary-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
  },
};
const Button = ({ type = "button", ...props }: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      type={type}
      className={`
       ${
         props.styles == "basic"
           ? ButtonStyles.basic.btnStyle
           : ButtonStyles.default.btnStyle
       } " "
       ${props.classNames}
      `}
    >
      {props.styles !== "basic" && (
        <MailIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
      )}
      {props.name}
    </button>
  );
};

export default Button;
