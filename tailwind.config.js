module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#9F7AEA',
          500: '#7C3AED',
          600: '#6B46C1',
          700: '#553C9A',
          900: '#3B2F6B',
        },
        dark: {
          700: '#3E3E5B',
          800: '#2D2D44',
          900: '#1A1A2E',
        },
        safe: {
          100: '#D1FAE5',
          600: '#10B981',
          900: '#065F46',
        },
        unsafe: {
          100: '#FEE2E2',
          600: '#EF4444',
          900: '#991B1B',
        },
        gray: {
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          700: '#4B5563',
        },
      },
      backgroundOpacity: ['responsive', 'hover', 'focus'],
      borderOpacity: ['responsive', 'hover', 'focus'],
      boxShadow: {
        'primary-600': '0 4px 14px 0 rgba(107, 70, 193, 0.3)',
        'dark-800': '0 4px 14px 0 rgba(45, 45, 68, 0.3)',
      },
    },
  },
  plugins: [],
};