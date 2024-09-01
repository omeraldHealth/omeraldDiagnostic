import React, { FC } from 'react';
import { NavTextProps } from '@utils/index';

const NavFont: FC<NavTextProps> = ({ children }: NavTextProps) => (
  <p className="font-bold text-md text-gray-600 mx-4">{children}</p>
);

export default NavFont;
