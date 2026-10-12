/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.ibb.co.com',
      },
      {
        protocol: 'https',
        hostname: '**.ibb.co',
      },
    ],
  },
};

export default nextConfig;
