/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        backendUrl: process.env.API_URL
    }
};

export default nextConfig;
