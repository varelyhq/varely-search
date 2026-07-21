import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    allowedDevOrigins: ['ide.varely.co', 'demosearchapp.varely.co', 'port5173.varely.co'],
    // assetPrefix: 'https://ide.varely.co',
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "imgs.search.brave.com",
                port: "",
                pathname: "/**"
            },
        ],
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'no-store, no-cache, must-revalidate',
                    },
                ],
            },
        ]
    },
}

export default nextConfig
