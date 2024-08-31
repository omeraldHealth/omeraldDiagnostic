import { ReactNode, SVGProps } from 'react';

export interface LogoProps {
  width: number;
  height: number;
}

export interface NavTextProps {
  children: any;
}
export interface FontTextProp {
  style?: string;
  children: any;
}

export interface HeadProps {
  title?: string;
  description?: string;
  url?: string;
  ogImage?: string;
}

export interface PageTemplateProps {
  navigation: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}

export type Query = {
  phoneNumber: String;
  name: String;
  email: String;
  branch: String;
  subject: String;
  message: String;
};

export type OnboardStepsType = {
  id: number;
  name: string;
};

export type NavigationType = {
  name: string;
  href: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  current: boolean;
};

export interface DashCardTyes {
  href: string;
  style: string;
  icon: any;
  tipInfo: string;
  icon2: any;
  title: string;
  value: number;
}

export const DIAGNOSTIC_PROFILE = 'DIAGNOSTIC_PROFILE';
