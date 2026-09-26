/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.js', './src/**/*.{js,jsx}'],
  presets: [require('nativewind/preset')],
  theme: { extend: { colors: { brand: '#4F46E5', ink: '#0F172A', muted: '#64748B', canvas: '#F8FAFC' } } },
  plugins: []
};

