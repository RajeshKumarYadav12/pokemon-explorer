// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Add the domain for PokeAPI sprites here
    domains: ['raw.githubusercontent.com'],
  },
};

export default nextConfig;
