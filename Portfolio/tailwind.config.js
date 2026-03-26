/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-space': '#0a0e27',
        'bg-nebula': '#131830',
        'bg-constellation': '#1a1f3a',
        'bg-hover': '#242947',
        'accent-cyan': '#00d4ff',
        'accent-magenta': '#ff006e',
        'accent-purple': '#7b2ff7',
        'text-primary': '#ffffff',
        'text-secondary': '#b4b8d0',
        'text-muted': '#6c7293',
        'text-accent': '#00d4ff',
        'success': '#00ff88',
        'warning': '#ffd000',
        'error': '#ff3864',
        'info': '#00d4ff',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #00d4ff 0%, #7b2ff7 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #ff006e 0%, #ff8c42 100%)',
        'gradient-mesh': 'radial-gradient(circle at 20% 50%, rgba(0, 212, 255, 0.15), transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 0, 110, 0.15), transparent 50%)',
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '32': '128px',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.6)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        drawPath: {
          'to': { strokeDashoffset: '0' },
        }
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
        fadeInDown: 'fadeInDown 0.6s ease-out forwards',
        fadeInLeft: 'fadeInLeft 0.6s ease-out forwards',
        fadeInRight: 'fadeInRight 0.6s ease-out forwards',
        scaleUp: 'scaleUp 0.5s ease-out forwards',
        glowPulse: 'glowPulse 2s infinite',
        gradientShift: 'gradientShift 10s ease infinite',
        float: 'float 6s ease-in-out infinite',
        drawPath: 'drawPath 2s ease-out forwards',
      }
    },
  },
  plugins: [],
}
