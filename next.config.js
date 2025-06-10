// next.config.js
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "export", // 如果你需要静态导出
};

module.exports = nextConfig;
