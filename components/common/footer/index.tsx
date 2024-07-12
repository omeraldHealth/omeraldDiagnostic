
import { LogoRound } from "@components/atoms/nav/logo";
import axios from "axios";

import { navigation } from "utils/static/static";


export function Footer() {
  return (
    <footer className="bg-gray-100" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <LogoRound />
            <p className={"text-black text-md m-0"}>
              Omerald is a personalized health report service, which enables
              users to obtain detailed information and reports based on their
              previous reports.
            </p>
            <div className="flex space-x-6">
              {navigation?.social.map((item) => (
                <a
                  target={"_blank"}
                  rel="noreferrer"
                  key={item?.name}
                  href={item?.href}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">{item?.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <p className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Policies
                </p>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.policies.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <p className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Support
                </p>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <p className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Company
                </p>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <p className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Legal
                </p>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className={"text-black text-md text-center"}>
            &copy; 2024 <a href="https://omerald.com/" target="_blank" className="text-blue-700">Omerald.com. 
              </a> All rights reserved to Avin Mednologies Private Limited and Omerald
          </p>
        </div>
      </div>
    </footer>
  );
}

