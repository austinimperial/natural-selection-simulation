import type { NextConfig } from 'next';

const SECURITY_HEADERS = [
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
];

const TRANSPILE_PACKAGES = [
  '@repo/ui',
  '@repo/utils',
  '@repo/ui',
  '@repo/config',
  'next-mdx-remote',
];

const PAGE_EXTENSIONS = ['ts', 'tsx'];

const isDevelopmentOrTest = ['development', 'test'].includes(
  process.env.APP_ENV || ''
);

// biome-ignore lint/suspicious/noExplicitAny: --
const configureSvgLoader = (config: any) => {
  const svgFileLoaderRule = config.module.rules.find(
    (rule: { test?: { test?: (str: string) => boolean } }) =>
      rule.test?.test?.('.svg')
  );

  if (!svgFileLoaderRule) return config;

  config.devtool = false;

  config.module.rules.push(
    {
      ...svgFileLoaderRule,
      test: /\.svg$/i,
      resourceQuery: /url/, // *.svg?url
    },
    {
      test: /\.svg$/i,
      issuer: svgFileLoaderRule.issuer,
      resourceQuery: { not: [...svgFileLoaderRule.resourceQuery.not, /url/] },
      use: ['@svgr/webpack'],
    }
  );

  svgFileLoaderRule.exclude = /\.svg$/i;

  return config;
};

const nextConfig: NextConfig = {
  experimental: {
    mdxRs: isDevelopmentOrTest,
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: SECURITY_HEADERS,
      },
    ];
  },

  pageExtensions: PAGE_EXTENSIONS,
  reactStrictMode: true,

  // Transpile packages
  transpilePackages: TRANSPILE_PACKAGES,

  // Turbopack configuration
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  // Webpack configuration
  webpack: configureSvgLoader,
};

export default nextConfig;
