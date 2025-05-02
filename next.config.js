/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    domains: [
      'ae04.alicdn.com',
      'ae01.alicdn.com',
      'ae02.alicdn.com',
      'ae03.alicdn.com',
      'ae05.alicdn.com',
      'ae06.alicdn.com',
      'ae07.alicdn.com',
      'ae08.alicdn.com',
      'ae09.alicdn.com',
      'ae10.alicdn.com',
      'ae11.alicdn.com',
      'ae12.alicdn.com',
      'ae13.alicdn.com',
      'ae14.alicdn.com',
      'ae15.alicdn.com',
      'ae16.alicdn.com',
      'ae17.alicdn.com',
      'ae18.alicdn.com',
      'ae19.alicdn.com',
      'ae20.alicdn.com',
    ],
  },
}

module.exports = nextConfig 