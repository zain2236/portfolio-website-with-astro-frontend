// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  // image: {
  //   domains: ['localhost' , 'angeline-fanatical-kaylene.ngrok-free.dev'],
  // },
  image: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.ngrok-free.dev', // Ye sab tarah ke ngrok links allow karega
      },
      {
        protocol: 'https',
        hostname: '**.ngrok.io', // Alternative ngrok domain
      },
      {
        protocol: 'https',
        hostname: '**.ngrok.app', // Newer ngrok domain
      },
      {
        protocol: 'http',
        hostname: 'localhost', // For local development
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1', // For local development
      },
    ],
  },

  integrations: [react()],
  adapter: vercel()
});