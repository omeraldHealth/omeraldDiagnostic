import { PageLayout } from '@/components/layouts/pageLayout';
import Link from 'next/link';
import React from 'react';

function NotFound() {
  return (
    <PageLayout tabDescription="Omerald Page not found" tabName="Diagnostic Omerald | 404">
      <div className="min-h-[70vh] via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-9xl font-extrabold text-orange-400 tracking-widest">
            404
          </h1>
          <div className="bg-white text-green-900 px-2 text-3xl rounded">
            Page Not Found
          </div>
          <div className="mt-16">
            <Link
              href="/"
              className="relative inline-block text-sm font-medium text-green-900 group active:text-indigo-500 focus:outline-none focus:ring"
            >
              <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-orange-300 group-hover:translate-y-0 group-hover:translate-x-0"></span>
              <span className="relative block px-8 py-3 bg-white text-green-900 border border-">
                Go Home
              </span>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default NotFound;
