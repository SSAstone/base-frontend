/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        backendUrl: process.env.API_URL
    },
    images: {
        domains: ['firebasestorage.googleapis.com'],
      },
};

export default nextConfig;
