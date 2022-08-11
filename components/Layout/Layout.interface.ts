import { SVGProps } from "react";

export type LayoutProps = {
  children: any;
  //   navigation: Navigation[];
};

export type NavigationType = {
  name: string;
  href: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  current: boolean;
};
