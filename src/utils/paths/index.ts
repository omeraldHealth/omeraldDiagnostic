import { NavigationInterface } from "../interface/ui";

export const ROUTES_WITHOUT_SIDEBAR: string[] = [
    '/',
    '/404',
    '/contact',
    '/verifyUser',
    '/signIn',
    '/signUp',
    '/onboard',
    '/info/features',
    '/info/knowledge',
    '/info/pricing',
    '/info/blog',
    '/info/about',
    '/info/faq',
    '/info/consent',
    '/info/disclaimer',
    '/info/terms',
    '/info/privacy',
    '/chooseDc',
];
  
export const navigation: NavigationInterface = {
    legal: [
      { name: 'Terms of Service', href: '/info/terms' },
      { name: 'Platform Consent', href: '/info/consent' },
      { name: 'Privacy Policy', href: '/info/privacy' },
      { name: 'Disclaimer', href: '/info/disclaimer' },
    ],
    support: [
      { name: 'FAQ', href: '/info/faq' },
      { name: 'Contact', href: '/contact' },
    ],
    company: [
      { name: 'Blog', href: 'https:/blog.omerald.com/' },
      { name: 'Register', href: '/signUp' },
      { name: 'About', href: '/info/about' },
    ],
    social: [],
};