/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="oscuro"]'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-bg)',
        surface: {
          DEFAULT: 'var(--color-surface)',
          hover: 'var(--color-surface-hover)',
          alt: 'var(--color-surface-alt)',
          active: 'var(--color-surface-active)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          subtle: 'var(--color-border-subtle)',
          strong: 'var(--color-border-strong)',
        },
        foreground: {
          DEFAULT: 'var(--color-text)',
          muted: 'var(--color-text-muted)',
          subtle: 'var(--color-text-subtle)',
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          active: 'var(--color-primary-active)',
          subtle: 'var(--color-primary-subtle)',
          border: 'var(--color-primary-border)',
          fg: 'var(--color-primary-fg)',
          solid: 'var(--color-primary-solid)',
          'solid-hover': 'var(--color-primary-solid-hover)',
          'solid-fg': 'var(--color-primary-solid-fg)',
        },
        // Marco de la app (chrome: lateral oscuro en todos los temas)
        chrome: {
          bg: 'var(--color-chrome-bg)',
          border: 'var(--color-chrome-border)',
          text: 'var(--color-chrome-text)',
          muted: 'var(--color-chrome-text-muted)',
          hover: 'var(--color-chrome-hover)',
          active: 'var(--color-chrome-active)',
          'active-fg': 'var(--color-chrome-active-fg)',
          'active-edge': 'var(--color-chrome-active-edge)',
        },
        // Estados semánticos (accesibles, con soporte color + texto)
        status: {
          success: {
            text: 'var(--color-success-text)',
            bg: 'var(--color-success-bg)',
            border: 'var(--color-success-border)',
          },
          warning: {
            text: 'var(--color-warning-text)',
            bg: 'var(--color-warning-bg)',
            border: 'var(--color-warning-border)',
          },
          danger: {
            text: 'var(--color-danger-text)',
            bg: 'var(--color-danger-bg)',
            border: 'var(--color-danger-border)',
          },
          info: {
            text: 'var(--color-info-text)',
            bg: 'var(--color-info-bg)',
            border: 'var(--color-info-border)',
          },
          violet: {
            text: 'var(--color-violet-text)',
            bg: 'var(--color-violet-bg)',
            border: 'var(--color-violet-border)',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        // Mínimo 12px absoluto según guía de diseño institucional
        '2xs': ['11px', '14px'],
        xs: ['12px', '16px'],
        sm: ['13px', '18px'],
        base: ['14px', '20px'],
        md: ['15px', '22px'],
        lg: ['16px', '24px'],
        xl: ['18px', '26px'],
        '2xl': ['20px', '28px'],
        '3xl': ['24px', '32px'],
        '4xl': ['30px', '38px'],
      },
      borderRadius: {
        control: '10px',
        card: '15px',
        panel: '15px',
      },
      boxShadow: {
        // Sombras mínimas y tenues (nada de glows ni sombras pesadas)
        subtle: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        card: 'var(--shadow-card)',
        drawer: '-4px 0 24px 0 rgba(0, 0, 0, 0.15)',
        dropdown: '0 4px 12px 0 rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}
