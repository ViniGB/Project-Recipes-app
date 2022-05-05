module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        brand: {
          button: "#ff8906",
          buttonText: "#fffffe",
          background: "#0f0e17",
          paragraph: "#a7a9be",
          secondary: "#f25f4c",
          highlight: "#ff8906",
          tertiary: "#e53170",
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
  ],
}
