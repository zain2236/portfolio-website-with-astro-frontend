// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  // image: {
  //   domains: ['localhost' , 'angeline-fanatical-kaylene.ngrok-free.dev'],
  // },
  image: {
    remotePatterns: [{
      protocol: 'https',
      hostname: '**.ngrok-free.dev', // Ye sab tarah ke ngrok links allow karega
    }],
  },
  
  integrations: [react()]
});