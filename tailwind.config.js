/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-purple': 'linear-gradient(135deg, #8a5cf6 0%, #6366f1 100%)',
        'radial-gradient': 'radial-gradient(circle, var(--tw-gradient-stops))',
        'border-image-gradient': 'linear-gradient(90deg, transparent, #8a5cf6, #6366f1, transparent)',
      },
    },
  },
  plugins: [],
}

