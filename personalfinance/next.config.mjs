/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true, 
      },
      {
        source: '/signup',
        destination: '/signup',
        permanent: false, 
      },
    ];
  },
};

export default nextConfig;
