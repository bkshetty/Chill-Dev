module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0em' }],
        'base': ['1rem', { lineHeight: '1.7', letterSpacing: '-0.01em' }],
        'lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        'xl': ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.02em' }],
        '3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        '4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
      },
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