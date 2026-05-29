import { createContext } from "react";

export type ThemeScheme = "light" | "dark";

export type ThemeContextType = {
  scheme: ThemeScheme;
  toggleScheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  scheme: "light",
  toggleScheme: () => {},
});
