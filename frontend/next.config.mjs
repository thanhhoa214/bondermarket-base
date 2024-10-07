/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  webpack(config) {
    config.externals.push('pino-pretty', 'encoding');
    return config;
  },
  images: {
    domains: ['picsum.photos'],
  },
};

export default nextConfig;
