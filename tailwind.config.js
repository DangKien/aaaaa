module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#187DE4",
      warning: "#EE9D01",
      danger: "#EE2D41",
      success: "#3699ff",
      info: "#0BB7AF",
      default: "#d7dae7",
    }),
    borderColor: (theme) => ({
      ...theme("colors"),
      default: "#d7dae7",
      primary: "#187DE4",
      warning: "#EE9D01",
      danger: "#EE2D41",
      success: "#3699ff",
      info: "#0BB7AF",
    }),
    textColor: (theme) => ({
      ...theme("colors"),
      muted: "#b5b5c3",
      default: "#27272b",
      primary: "#187DE4",
      warning: "#EE9D01",
      danger: "#EE2D41",
      success: "#3699ff",
      info: "#0BB7AF",
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
