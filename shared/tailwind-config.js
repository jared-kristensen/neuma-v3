tailwind.config = {
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'ui-sans-serif', 'system-ui'],
          mono: ['JetBrains Mono', 'ui-monospace'],
        },
        colors: {
          /* Neuma brand · cobalt-driven primary scale */
          brand: {
            50:  '#eef1ff',
            100: '#dde2ff',
            200: '#bcc7ff',
            300: '#8e9eff',
            400: '#6c7aff',
            500: '#4a5bff',   /* cobalt — electric signal */
            600: '#3a48e6',
            700: '#2a2fa6',   /* indigo — line & rule */
            800: '#1f258a',
            900: '#141c55',   /* deep — elevated surface */
          },
          /* Neuma neutrals — warm paper family */
          ink:    '#05061a',
          navy:   '#0b0e2e',
          paper:  '#f3efe7',
          bone:   '#e8e2d3',
          mist:   '#b7bee6',
          ember:  '#ff7a4d',
          cyan:   '#6fe3ff',
        },
        boxShadow: {
          'soft': '0 1px 2px 0 rgb(0 0 0 / 0.04), 0 1px 3px 0 rgb(0 0 0 / 0.04)',
          'card': '0 1px 2px 0 rgb(0 0 0 / 0.04), 0 8px 24px -8px rgb(11 14 46 / 0.10)',
        }
      }
    }
  }
