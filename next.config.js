/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   config.external.push({
  //     "utf-8-validate": "commonjs utf-8-validate",
  //     bufferutil: "commonjs bufferutil",
  //   });
  // },
  images: {
    domains: ["rrfnbimioxwxorufoapz.supabase.co"],
  },
};

module.exports = nextConfig;
