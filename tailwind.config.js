module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#f1e0dc ",
          DEFAULT: "#ebd1cc",
          dark: "#b18a8a",
          card: "#fefefefe",
          bg: "#f1f3f5",
        },
        text: {
          light: "#9d9d9d",
          DEFAULT: "#454545",
        },
      },
      zIndex: {
        "minus-1": "-1",
      },
      height: {
        adjustable: "calc(100vh - 168px)",
        "adjustable-min": "calc(100vh - 176px)",
        88: "88px",
        80: "80px",
      },
      maxHeight: {
        460: "460px",
        900: "900px",
      },
      minHeight: {
        adjustable: "calc(100vh - 168px)",
        "adjustable-min": "calc(100vh - 176px)",
      },
      fontFamily: {
        headline: "Poppins, sans-serif",
        paragraph: "Titillium Web, sans-serif",
      },
      fontWeight: {
        bold: 700,
        normal: 400,
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.text.DEFAULT"),
            fontFamily: theme("fontFamily.paragraph"),
            h1: {
              color: "#81312f",
              fontFamily: theme("fontFamily.headline"),
            },
            h2: {
              color: "#81312f",
              fontFamily: theme("fontFamily.headline"),
            },
            h3: {
              color: "#81312f",
              fontFamily: theme("fontFamily.headline"),
            },
            h4: {
              color: theme("colors.brand.dark"),
              fontFamily: theme("fontFamily.headline"),
            },
            h5: {
              color: theme("colors.brand.dark"),
              fontFamily: theme("fontFamily.headline"),
            },
            h6: {
              color: theme("colors.brand.dark"),
              fontFamily: theme("fontFamily.headline"),
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
