/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        backendUrl: 'http://localhost:5550'
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
