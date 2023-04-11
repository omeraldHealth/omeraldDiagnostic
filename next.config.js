/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Apply the middleware to all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS, *' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, *' },
        ],
      },
    ];
  },
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:["omerald.s3.ap-northeast-1.amazonaws.com"]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
