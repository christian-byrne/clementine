/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === 'production';
const basePath = isProduction ? '/clementine' : '';

const nextConfig = {
    basePath: basePath,
};

export default nextConfig;
