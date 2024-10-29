/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "mangaonline.biz",
				port: "",
				pathname: "/wp-content/uploads/**",
			},
			{
				protocol: "https",
				hostname: "cdn.slimeread.com",
				port: "",
				pathname: "/banners/**",
			},
			{
				protocol: "https",
				hostname: "objects.slimeread.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: 'https',
				hostname: 'black.slimeread.com',
				port: '',
				pathname: '/**',
			},
		],
	},
}

export default nextConfig
