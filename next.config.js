/** @type {import('next').NextConfig} */

const hostnames = ['lh3.googleusercontent.com']

const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	optimizeFonts: false,
	images: {
		remotePatterns: hostnames.map((hostname) => ({
			protocol: 'https',
			hostname,
		})),
	},
	env: {
		APP_ENV: process.env.REACT_APP_ENV,
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
		APP_URL: process.env.REACT_APP_URL,
		APP_SERVER_URL: process.env.APP_SERVER_URL,
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'https://vast-lime-brown-bear-robe.cyclic.app/api/:path*',
			},
			{
				source: '/uploads/:path*',
				destination:
					'https://vast-lime-brown-bear-robe.cyclic.app/uploads/:path*',
			},
		]
	},
}

module.exports = nextConfig
