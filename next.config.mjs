/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ["mongoose"], // ✅ pindahkan ke luar experimental

    images: {
        domains: ['lh3.googleusercontent.com'],
    },

    webpack(config) {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        };
        return config;
    }
};

export default nextConfig;
