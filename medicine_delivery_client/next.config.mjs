/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images:{
		remotePatterns:[
			{
				protocol: 'http',
				hostname: "localhost",
				port: "3000"
			},
			{
				protocol: 'https',
				hostname: "ihor.fun",
			}
		]
	},
};

export default nextConfig;
