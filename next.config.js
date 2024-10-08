/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'omerald.s3.ap-northeast-1.amazonaws.com',
      'omerald-diag-preprod.s3.amazonaws.com',
      'omerald-*.s3.amazonaws.com',
      'diagnostic.omerald.com',
      'omerald-diag-prod.s3.amazonaws.com',
      'res.cloudinary.com',
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        // Matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      // Rewrite everything to `pages/index`
      // {
      //   source: '/:any*',
      //   destination: '/',
      // },
    ];
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    SSR: false,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    SSR: false,
  },
  webpack(config) {
    config.optimization.splitChunks.maxSize = 200000;
    return config;
  },
};

const withAntdLess = require('next-plugin-antd-less');
({
  modifyVars: {
    '@primary-color': 'green',
  },
  lessVarsFilePath: './src/styles/theme.less',
  lessVarsFilePathAppendToEndOfContent: false,

  // Other Next.js config options here
  webpack(config) {
    return config;
  },
});

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withAntdLess(withBundleAnalyzer(nextConfig));
