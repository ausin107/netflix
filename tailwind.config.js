module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      height: {
        '8vh': '80vh',
        '17': '4.25rem',
        '21': '5.7rem'
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'purple': '#3f3cbb',
        'midnight': '#121063',
        'metal': '#565584',
        'tahiti': '#3ab7bf',
        'silver': '#ecebff',
        'bubble-gum': '#ff77e9',
        'bermuda': '#78dcca',
      },
      spacing: {
        '15': '3.75rem',
        '0.2': '0.2vw',
        '1.5vw': '1.5vw',
        '0.5': '0.5vw',
        '1.6vw': '1.6vw',
        '3.4vw': '3.9vw'
      },
      inset: {
        '19vh': '19vh',
        '45': '45%'
      },
      fontSize: {
        '1.4': '1.4vw',
        '5.5': '5.5vw'
      },
      colors: {
        'buttonColor' : 'rgba(109,109,110,0.7)',
        'backgroundColor':  '#0d0e0e',
      }
    },
  },
  plugins: [],
}
