/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        backendUrl: process.env.API_URL
    },
    images: {
        domains: ['firebasestorage.googleapis.com'],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
            port: '',
            pathname: '/images/**',
          }
        ]
      },
};

export default nextConfig;
