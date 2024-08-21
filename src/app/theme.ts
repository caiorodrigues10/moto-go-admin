import { createTheme } from "@nextui-org/react";

const customTheme = createTheme({
  type: "light", // ou "dark" dependendo do tema que você está usando
  theme: {
    colors: {
      primary: "#0070F3", // substitua pela cor primária desejada
      primaryLight: "#D3E5FF",
      primaryDark: "#005BB5",
      // outros ajustes de cores se necessário
    },
  },
});

export default customTheme;