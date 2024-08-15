import React, { FC, ReactNode } from "react";

interface ButtonProps {
  style?: string;
  children: ReactNode;
}

export const SignInButton: FC<ButtonProps> = ({ style, children }) => (
  <button
    className={`${style} bg-indigo-800 text-white w-[132px] h-[52px] rounded-lg font-sm text-light`}
  >
    {children}
  </button>
);

export const SubscribeButton: FC<{ children: ReactNode }> = ({ children }) => (
  <button
    className={`bg-[#00E1F0] text-white px-4 h-[52px] mx-8 font-sm text-light`}
  >
    {children}
  </button>
);

export const CustomButton: FC<ButtonProps> = ({ style, children }) => (
  <button
    className={`${style} px-4 py-2 bg-blue-500 text-white font-sm rounded-lg`}
  >
    {children}
  </button>
);

// Add more button components as needed, following the same pattern.

// Note: Arrange imports and components based on their code length in descending order.
// Import statements go here.
