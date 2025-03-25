/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 't3.ftcdn.net',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

export default nextConfig