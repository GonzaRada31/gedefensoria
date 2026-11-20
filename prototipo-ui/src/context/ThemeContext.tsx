import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'claro' | 'oscuro' | 'negro';
export type ThemeSetting = 'claro' | 'oscuro' | 'negro' | 'sistema';

interface ThemeContextType {
  theme: Theme;
  themeSetting: ThemeSetting;
  setThemeSetting: (setting: ThemeSetting) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeSetting, setThemeSettingState] = useState<ThemeSetting>(() => {
    return (localStorage.getItem('gedefensoria-theme') as ThemeSetting) || 'sistema';
  });

  const [effectiveTheme, setEffectiveTheme] = useState<Theme>('claro');

  useEffect(() => {
    const updateTheme = () => {
      let resolvedTheme: Theme = 'claro';
      if (themeSetting === 'sistema') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        resolvedTheme = prefersDark ? 'oscuro' : 'claro';
      } else {
        resolvedTheme = themeSetting;
      }

      setEffectiveTheme(resolvedTheme);
      document.documentElement.setAttribute('data-theme', resolvedTheme);
      document.documentElement.setAttribute('data-theme-setting', themeSetting);
      localStorage.setItem('gedefensoria-theme', themeSetting);
    };

    updateTheme();

    if (themeSetting === 'sistema') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => updateTheme();
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [themeSetting]);

  const setThemeSetting = (setting: ThemeSetting) => {
    setThemeSettingState(setting);
  };

  return (
    <ThemeContext.Provider value={{ theme: effectiveTheme, themeSetting, setThemeSetting }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
