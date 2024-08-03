import { LogoImage } from "@components/atoms/nav/logo";
import Link from "next/link";
import { navigation } from "utils/static/static";

export function Footer() {
  return (
    <footer className="bg-gray-100 " aria-labelledby="footer-heading">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 text-center">
          {/* Column 1: Logo and Description */}
          <div className="space-y-8 md:col-span-1">
            <LogoImage className="mx-auto" />
            <p className="text-black text-md">
              Omerald is a personalized health report service, which enables
              users to obtain detailed information and reports based on their
              previous reports.
            </p>
          </div>

          {/* Columns 2-4: Links */}
          <div className="grid grid-cols-1 gap-12 md:col-span-3 md:grid-cols-3">
            {/* Support Links */}
            <div>
              <p className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Support
              </p>
              <ul role="list" className="mt-4 space-y-4">
                {navigation.support.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href}>
                      <span className="text-gray-600 hover:text-gray-800">{item.name}</span>
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
                      <span className="text-gray-600 hover:text-gray-800">{item.name}</span>
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
                      <span className="text-gray-600 hover:text-gray-800">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-200 pt-8 text-center">
          <p className="text-black text-md">
            &copy; 2024 <span href="https://omerald.com/" target="_blank" className="text-blue-700">Omerald.com</span>. All rights reserved to Avin Mednologies Private Limited and Omerald.
          </p>
        </div>
      </div>
    </footer>
  );
}
