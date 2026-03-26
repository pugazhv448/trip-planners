/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        accent: ["var(--font-display)", "Georgia", "serif"]
      },
      colors: {
        primary: "var(--color-primary)",
        "primary-light": "var(--color-primary-light)",
        accent: "var(--color-accent)",
        "accent-light": "var(--color-accent-light)",
        earth: "var(--color-earth)",
        cream: "var(--color-cream)",
        charcoal: "var(--color-charcoal)",
        mist: "var(--color-mist)",
        white: "var(--color-white)"
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,0.08)",
        "card-hover": "0 12px 40px rgba(0,0,0,0.15)"
      },
      borderRadius: {
        card: "16px",
        image: "12px",
        pill: "9999px"
      }
    }
  },
  plugins: []
};
