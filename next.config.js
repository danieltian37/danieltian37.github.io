/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  webpack: (config, { isServer }) => {
    // Fix source map warnings
    if (!isServer) {
      config.devtool = 'source-map';
    }
    return config;
  },
};

module.exports = nextConfig; 