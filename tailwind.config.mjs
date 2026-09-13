import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default {
  // ...
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: { extend: {} },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

import typography from '@tailwindcss/typography';

