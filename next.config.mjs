/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "usdehkallnfsvdlfhwie.supabase.co", // Add your Supabase hostname here
      },
    ],
  },
};

export default nextConfig;
