import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
    // declare using Tailwind
    plugins: [
        tailwindcss()
    ],
    // set up "@" alias in imports to allow cleaner import statements
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
});