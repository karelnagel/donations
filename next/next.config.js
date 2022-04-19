/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'akamai',
    path:'', // Todo
    domains: ['ethdon.xyz','localhost','ipfs.io'],
  },
}

module.exports = nextConfig
