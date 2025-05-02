// frontend\next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'm.media-amazon.com',
      'images.unsplash.com',
      'images.pexels.com',
      'i.imgur.com',
      'example.com',
      'placehold.co',
      'placekitten.com',
      'picsum.photos'
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
};

export default nextConfig;
