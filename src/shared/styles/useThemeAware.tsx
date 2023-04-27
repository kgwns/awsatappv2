import React from 'react';
import { CustomThemeType } from './colors';
import { useTheme } from './ThemeProvider';

type Generator<T extends {}> = (theme: CustomThemeType) => T;
const useThemeAwareObject = <T extends {}>(fn: Generator<T>) => {
  const { themeData } = useTheme();
  return React.useMemo(
    () => fn(themeData),
    [fn, themeData]
  );
};
export { useThemeAwareObject };
