/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Primary Colors
        'primary': '#FF6B35', // orange-500
        'primary-foreground': '#FFFFFF', // white
        
        // Secondary Colors
        'secondary': '#4A90E2', // blue-500
        'secondary-foreground': '#FFFFFF', // white
        
        // Accent Colors
        'accent': '#E74C3C', // red-500
        'accent-foreground': '#FFFFFF', // white
        
        // Background Colors
        'background': '#1A1D23', // slate-900
        'surface': '#2C3E50', // slate-700
        
        // Text Colors
        'text-primary': '#FFFFFF', // white
        'text-secondary': '#BDC3C7', // gray-400
        
        // Status Colors
        'success': '#27AE60', // green-600
        'success-foreground': '#FFFFFF', // white
        'warning': '#F39C12', // amber-500
        'warning-foreground': '#FFFFFF', // white
        'error': '#C0392B', // red-700
        'error-foreground': '#FFFFFF', // white
        
        // Border Colors
        'border': '#374151', // gray-700
        'border-light': '#4B5563', // gray-600
        
        // Muted Colors
        'muted': '#374151', // gray-700
        'muted-foreground': '#9CA3AF', // gray-400
        
        // Card Colors
        'card': '#2C3E50', // slate-700
        'card-foreground': '#FFFFFF', // white
        
        // Popover Colors
        'popover': '#2C3E50', // slate-700
        'popover-foreground': '#FFFFFF', // white
        
        // Input Colors
        'input': '#374151', // gray-700
        'input-foreground': '#FFFFFF', // white
        
        // Ring Colors
        'ring': '#FF6B35', // orange-500
        
        // Destructive Colors
        'destructive': '#C0392B', // red-700
        'destructive-foreground': '#FFFFFF', // white
        
        // Foreground
        'foreground': '#FFFFFF', // white
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'caption': ['Inter', 'sans-serif'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      fontWeight: {
        'heading-normal': '400',
        'heading-semibold': '600',
        'heading-bold': '700',
        'body-normal': '400',
        'body-medium': '500',
        'caption-normal': '400',
        'data-normal': '400',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'gaming': '0 4px 8px rgba(0, 0, 0, 0.2)',
        'gaming-lg': '0 8px 16px rgba(0, 0, 0, 0.2)',
      },
      transitionTimingFunction: {
        'gaming-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      zIndex: {
        '100': '100',
        '200': '200',
        '1000': '1000',
        '1001': '1001',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}