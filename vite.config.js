import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative assets support both GitHub project Pages and other static hosts.
  base: './',
  test: { environment: 'jsdom', setupFiles: './tests/setup.js' },
});
