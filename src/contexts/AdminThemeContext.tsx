import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type AdminTheme = 'dark' | 'light';

interface AdminThemeContextValue {
  theme: AdminTheme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: AdminTheme) => void;
}

const STORAGE_KEY = 'admin_theme';

const AdminThemeContext = createContext<AdminThemeContextValue | undefined>(undefined);

const getInitialTheme = (): AdminTheme => {
  if (typeof window === 'undefined') return 'dark';
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === 'light' || saved === 'dark' ? saved : 'dark';
};

export const AdminThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<AdminTheme>(getInitialTheme);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = (next: AdminTheme) => setThemeState(next);
  const toggleTheme = () => setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      toggleTheme,
      setTheme,
    }),
    [theme]
  );

  return <AdminThemeContext.Provider value={value}>{children}</AdminThemeContext.Provider>;
};

export const useAdminTheme = () => {
  const context = useContext(AdminThemeContext);
  if (!context) {
    throw new Error('useAdminTheme must be used within AdminThemeProvider');
  }
  return context;
};
