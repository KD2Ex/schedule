import {createContext} from "react";

type ThemeContextType = "light" | "dark";

export const ColorModeContext = createContext({toggleColorMode: () => {}})
export const ColorContext = createContext<ThemeContextType>("dark")
export const AuthContext = createContext({changeAuth: () => {}});
export const ScheduleModalContext = createContext(null);