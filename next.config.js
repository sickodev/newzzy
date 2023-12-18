/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.clerk.com",
            },
            {
                protocol: "https",
                hostname: "st3.depositphotos.com",
            },
            {
                protocol: "https",
                hostname: "live-production.wcms.abc-cdn.net.au",
            },
        ],
    },
};

module.exports = nextConfig;
