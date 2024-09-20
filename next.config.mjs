/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [   // Esto para hacer usar el upload de imagenes en cloudinary 
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com'
            }
        ]
    }
};

export default nextConfig;
