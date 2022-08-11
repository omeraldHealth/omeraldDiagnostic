import { MailIcon } from "@heroicons/react/solid";
import React, { ReactEventHandler } from "react";

type ButtonProps = {
  name: string;
  type?: "button" | "reset" | "submit";
  onClick?: ReactEventHandler;
};

const Button = ({ type = "button", ...props }: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      type={type}
      className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <MailIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
      {props.name}
    </button>
  );
};

export default Button;
