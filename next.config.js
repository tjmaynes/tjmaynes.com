/** @type {import('next').NextConfig} */
module.exports = {
  distDir: 'build',
  serverRuntimeConfig: {
    isDevMode: process.env.NODE_ENV == 'development',
  },
}
