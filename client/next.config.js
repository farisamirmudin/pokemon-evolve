/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: "./",
  images: {
    domains: ['gateway.ipfscdn.io']
  }
};

module.exports = nextConfig;
