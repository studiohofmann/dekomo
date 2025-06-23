import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    interface FileLoaderRule {
      test?: RegExp;
      issuer?: any;
      resourceQuery?: any;
      use?: any;
      exclude?: RegExp;
      [key: string]: any;
    }

    const fileLoaderRule: FileLoaderRule | undefined = config.module.rules.find(
      (rule: FileLoaderRule) => rule.test?.test?.(".svg")
    );

    if (fileLoaderRule) {
      config.module.rules.push(
        // Reapply the existing rule, but only for svg imports ending in ?url
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/, // *.svg?url
        },
        // Convert all other *.svg imports to React components
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: {
            not: [...(fileLoaderRule.resourceQuery?.not || []), /url/],
          },
          use: ["@svgr/webpack"],
        }
      );

      // Modify the file loader rule to ignore *.svg
      fileLoaderRule.exclude = /\.svg$/i;
    }

    return config;
  },
};

export default nextConfig;
