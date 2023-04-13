import { LazyMotion, domAnimation } from "framer-motion"
import React from 'react';

interface AnimationProps {
    children:any
}
export const Animation: React.FC<AnimationProps> = ({children}) => {
  return (
    <LazyMotion features={domAnimation}>
        {children}
    </LazyMotion>
  );
};
