/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors (Azure palette)
        primary: {
          50: '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#2196f3',
          600: '#1e88e5',
          700: '#1976d2',
          800: '#1565c0',
          900: '#0d47a1',
        },
        // Secondary colors (Green palette)
        secondary: {
          50: '#e6f9eb',
          100: '#c1f2ce',
          200: '#70df9c',
          300: '#4ee285',
          400: '#1ec56e',
          500: '#00a85c',
          600: '#008a49',
          700: '#006e37',
          800: '#005323',
          900: '#003910',
        },
        // Tertiary colors (Cyan palette)
        tertiary: {
          50: '#e0f7fa',
          100: '#b2ebf2',
          200: '#80deea',
          300: '#4dd0e1',
          400: '#26c6da',
          500: '#00bcd4',
          600: '#00acc1',
          700: '#0097a7',
          800: '#00838f',
          900: '#006064',
        },
        // Semantic colors (Danger - Red palette)
        danger: {
          50: '#ffebee',
          100: '#ffcdd2',
          200: '#ef9a9a',
          300: '#e57373',
          400: '#ef5350',
          500: '#d32f2f',
          600: '#c62828',
          700: '#b71c1c',
          800: '#8b0000',
          900: '#6a0000',
          DEFAULT: '#d32f2f',
        },
        // Success (Extended green palette)
        success: {
          50: '#e6f9eb',
          100: '#c1f2ce',
          200: '#70df9c',
          300: '#4ee285',
          400: '#1ec56e',
          500: '#00a85c',
          600: '#008a49',
          700: '#006e37',
          800: '#005323',
          900: '#003910',
          DEFAULT: '#00a85c',
        },
      },
      fontFamily: {
        sans: ['Titillium Web', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
