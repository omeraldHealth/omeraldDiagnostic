import Link from 'next/link';
import LogoComponent from '../common/atoms/logo';
import { navigation } from '@/utils/paths';
import LogoIconComponent from '../common/atoms/logoIcon';

export function Footer() {
  return (
    <footer className="sm:max-w-[90%] m-auto" aria-labelledby="footer-heading">
      <div className="container  text-left md:text-center mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 text-center">
          <div className="space-y-8 md:col-span-1 text-left">
            <p className="text-black text-md md:text-lg ml-8">
              Omerald is a personalized health report service, which enables
              users to obtain detailed information and reports based on their
              previous reports.
            </p>
          </div>

          <div className="grid grid-cols-1 text-left ml-8 md:m-0 md:text-center gap-12 md:col-span-3 md:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Support
              </p>
              <ul role="list" className="mt-4 space-y-4">
                {navigation.support.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href}>
                      <span className="text-gray-600 hover:text-gray-800">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <p className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Company
              </p>
              <ul role="list" className="mt-4 space-y-4">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href}>
                      <span className="text-gray-600 hover:text-gray-800">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <p className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Legal
              </p>
              <ul role="list" className="mt-4 space-y-4">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href}>
                      <span className="text-gray-600 hover:text-gray-800">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 text-center">
          <p className="text-black text-md">
            &copy; 2024{' '}
            <Link
              href="https://omerald.com/"
              target="_blank"
              className="text-blue-700"
            >
              Omerald.com
            </Link>
            . All rights reserved to Avin Mednologies Private Limited and
            Omerald.
          </p>
        </div>
      </div>
    </footer>
  );
}
