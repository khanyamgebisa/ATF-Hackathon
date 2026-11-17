export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0f172a',
        brand: '#0f766e',
        accent: '#14b8a6',
        soft: '#f8fafc'
      },
      boxShadow: {
        panel: '0 10px 30px rgba(15, 23, 42, 0.08)'
      }
    }
  },
  plugins: []
};
