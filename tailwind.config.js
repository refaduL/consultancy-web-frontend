/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },

      colors: {
        // Primary (Minty Green-Blue)
        primary: {
          100: "#DCEFE8",
          300: "#8FB9A8",
          500: "#3F6A8A", // main brand color
          700: "#264656",
        },

        // Secondary (Warm Pink / Coral)
        secondary: {
          100: "#FFE8EB",
          300: "#FCD0BA",
          500: "#F1828D",
          700: "#A03C4E",
        },

        // Accent (Soft Golden Peach)
        accent: {
          100: "#FEFAD4",
          300: "#F2CC8C",
          500: "#DDA54B",
          700: "#9E7132",
        },

        // Neutral
        neutral: {
          100: "#F8F7F5",
          300: "#E0DDD9",
          500: "#B8B1AA",
          700: "#6A625B",
        },

        // Dark Mode Base
        dark: {
          100: "#2A2A2F",
          300: "#202024",
          500: "#1A1A1D",
          700: "#0B0B0D",
        },

        // Utility Colors
        success: {
          100: "#D1FAE5",
          500: "#10B981",
          700: "#047857",
        },
        warning: {
          100: "#FEF3C7",
          500: "#F59E0B",
          700: "#B45309",
        },
        error: {
          100: "#FEE2E2",
          500: "#EF4444",
          700: "#B91C1C",
        },
        info: {
          100: "#DBEAFE",
          500: "#3B82F6",
          700: "#1D4ED8",
        },
      },

      // Shadows
      boxShadow: {
        soft: "0 2px 10px rgba(0, 0, 0, 0.04)",
        medium: "0 4px 20px rgba(0, 0, 0, 0.08)",
        large: "0 8px 35px rgba(0, 0, 0, 0.1)",
        glow: "0 0 25px rgba(143, 185, 168, 0.4)", // soft pastel glow
      },

      // Border Radius
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        full: "9999px",
      },

      // Animations
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "float": "float 3s ease-in-out infinite",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },

      // Gradients
      backgroundImage: {
        "gradient-default": "bg-gradient-to-br from-[#FEFAD4] via-white to-[#F1E6C1]",
        "gradient-primary": "linear-gradient(135deg, #8FB9A8 0%, #F1828D 100%)",
        "gradient-soft": "linear-gradient(135deg, #FEFAD4 0%, #FCD0BA 100%)",
        "gradient-dark": "linear-gradient(135deg, #3F6A8A 0%, #765D69 100%)",
      }
    },
  },
  plugins: [],
};
