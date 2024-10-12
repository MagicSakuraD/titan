/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true, // 启用 WebAssembly 的异步加载支持
    };
    config.output.webassemblyModuleFilename = "static/wasm/[modulehash].wasm"; // 设置 WASM 文件的输出路径
    return config;
  },
  images: {
    domains: ["nextjs.org", "assets.vercel.com"],
  },
};

module.exports = nextConfig;
