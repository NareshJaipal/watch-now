/**
 * @type {import('next').NextConfig}
 */
nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.com",
      },
    ],
  },
  output: "standalone",
};

module.exports = nextConfig;
