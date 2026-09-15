/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repo = process.env.GH_REPO || "";
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: isProd && repo ? `/${repo}` : "",
  assetPrefix: isProd && repo ? `/${repo}/` : "",
};
export default nextConfig;
