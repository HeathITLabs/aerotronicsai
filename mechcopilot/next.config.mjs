/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'storageaerotronics.blob.core.windows.net',
            port: '',
            pathname: '/aimaindata/**',
        },
    ],
},
async redirects()
{
    return [
        {
            source: '/',
            destination: '/dashboard',
            permanent: true,
        },
    ]
}
};

export default nextConfig;
