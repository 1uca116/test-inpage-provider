/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primaryText: {
        900: generateColorClass('color-primary-t-900'),
      },
      secondaryText: {
        900: generateColorClass('color-secondary-t-900'),
      },
      tertiaryText: {
        900: generateColorClass('color-tertiary-t-900'),
      },
      primaryBg: {
        900: generateColorClass('color-primary-bg-900'),
        800: generateColorClass('color-primary-bg-800'),
        700: generateColorClass('color-primary-bg-700'),
      },
      primaryBorder: {
        900: generateColorClass('color-primary-bd-900'),
        800: generateColorClass('color-primary-bd-800'),
      },
      accent: 'var(--color-accent)',
      success: 'var(--color-success)',
      danger: 'var(--color-danger)',
      backdrop: 'var(--color-backdrop)',
      transparent: 'transparent',
    },

    extend: {
      screens: {
        '2xl': '1400px',
        '3xl': '1600px',
      },
    },
  },
  plugins: [],
}

function generateColorClass(variable) {
  return ({ opacityValue }) =>
      opacityValue
          ? `rgba(var(--${variable}), ${opacityValue})`
          : `rgb(var(--${variable}))`;
}
