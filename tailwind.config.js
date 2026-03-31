module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fir: {
          500: "#10b981",
          600: "#059669",
        },
        sage: {
          50: "#F0F4EF",
          400: "#C7D2B4", 
          500: "#A8B5A2",
          600: "#8A9A7F",
        },
        pinky: {
          50: "#FDF2F2",
          400: "#F4C7C3",
          500: "#E8A0B8",
          600: "#D983A5",
        },
        scandi: {
          100: "#f3f4f6",
          200: "#e5e7eb",
          500: "#6b7280",
        },
        beige: {
          100: "#f5f5dc",
        },
      },
      boxShadow: {
        "glow-fir": "0 0 20px rgba(16, 185, 129, 0.6)",
        "glow-sage": "0 0 20px rgba(168, 181, 162, 0.6)",
        "glow-pinky": "0 0 20px rgba(232, 160, 184, 0.6)",
      },
      animation: {
        shimmer: "shimmer 2s infinite linear",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
