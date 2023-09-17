/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "../pages/movies",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
