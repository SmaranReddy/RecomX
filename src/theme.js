import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#f7fafc",
      100: "#e6f0fa",
      500: "#232f3e", // Amazon blue
      600: "#ff9900", // Amazon orange
      700: "#febd69", // Lighter orange
      800: "#131921", // Amazon dark header
    },
  },
  fonts: {
    heading: `'Arial', sans-serif`,
    body: `'Arial', sans-serif`,
  },
});

export default theme;