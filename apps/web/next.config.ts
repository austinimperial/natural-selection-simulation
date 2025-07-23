// import contentSecurityPolicyGetHeader from '@repo/utils/contentSecurityPolicy/getHeader.ts';
import type { NextConfig } from 'next';

const securityHeaders = [
  // {
  //   key: 'Content-Security-Policy',
  //   value: contentSecurityPolicyGetHeader().replace(/\n/g, ''),
  // },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
];

const config: NextConfig = {
  experimental: {
    // FUTURE: MDX, change to `mdxRs: true` once plugins are supported
    mdxRs: ['development', 'test'].includes(process.env.APP_ENV),
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },
  pageExtensions: ['ts', 'tsx'],
  reactStrictMode: true,
  transpilePackages: [
    '@repo/ui',
    '@repo/utils',
    '@repo/vitest-config',
    'next-mdx-remote',
  ],
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  typescript: {
    // ignoreBuildErrors: process.env.SKIP_BUILD_TYPE_CHECK === 'true',
    // Disabling entirely for now, until at least typescript-go is supported
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    const svgFileLoaderRule = config.module.rules.find(
      (rule: { test?: { test?: (str: string) => boolean } }) =>
        rule.test?.test?.('.svg')
    );

    // Disable Webpack source maps
    if (process.env.PRODUCTION_SOURCE_MAPS !== 'true') {
      config.devtool = false;
    }

    config.module.rules.push(
      {
        ...svgFileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert *.svg imports not ending in ?url to React components
      {
        test: /\.svg$/i,
        issuer: svgFileLoaderRule.issuer,
        resourceQuery: { not: [...svgFileLoaderRule.resourceQuery.not, /url/] },
        use: ['@svgr/webpack'],
      }
    );

    svgFileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default config;
