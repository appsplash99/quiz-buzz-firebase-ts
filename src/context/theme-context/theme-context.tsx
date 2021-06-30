import React, { useContext, createContext, useState } from 'react';

export type ThemeContextType = {
  theme?: object;
  setTheme?: (theme: object) => void;
  handleToggleTheme?: () => void;
};

/**
 * THEMES
 */
export const themeLight: React.CSSProperties = {
  color: 'var(--dark)',
  backgroundColor: 'var(--light)',
};
export const themeDark: React.CSSProperties = {
  color: 'var(--dark)',
  backgroundColor: 'var(--light)',
};
/** */

const ThemeContext = createContext<ThemeContextType>({
  // theme: themeLight,
});

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<object>(themeLight);

  const handleToggleTheme = () => {
    theme === themeLight ? setTheme(themeDark) : setTheme(themeLight);
  };

  /**
   * DOES NOT WORK, TODO: FIX THIS
   */
  return (
    <ThemeContext.Provider value={{ theme, setTheme, handleToggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
