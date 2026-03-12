"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }: any) => {

  const [dark, setDark] = useState(false);

  useEffect(() => {

    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }

  }, []);

  const toggleTheme = () => {

    if (dark) {

      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");

    } else {

      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");

    }

    setDark(!dark);
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);