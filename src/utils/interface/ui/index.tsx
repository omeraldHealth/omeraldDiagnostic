export interface NavigationItem {
  name: string;
  href: string;
}

export interface NavigationInterface {
  support: NavigationItem[];
  company: NavigationItem[];
  legal: NavigationItem[];
  social: NavigationItem[];
}

export interface PageLayoutProps {
  tabName: string;
  tabDescription: string;
  children: React.ReactNode;
  requiredRole?: string;
  showNavbar?: boolean;
  showFooter?: boolean;
}
