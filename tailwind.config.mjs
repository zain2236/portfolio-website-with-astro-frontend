/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
    theme: {
      extend: {
        fontFamily: {
            // Aapke professional fonts yahan perfectly set hain
            ovo: ['Ovo', 'serif'],
            outfit: ['Outfit', 'sans-serif'],
          },
      },
    },
    // Note: In Tailwind v4, plugins are imported via CSS using @plugin directive
    // See src/styles/global.css for @plugin "@tailwindcss/typography"
  };
  

