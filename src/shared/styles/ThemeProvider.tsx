import React, { useEffect } from 'react';
import { useAppCommon } from 'src/hooks';
import {NativeModules} from 'react-native';
import { DEFAULT_LIGHT_THEME, CustomThemeType, DEFAULT_DARK_THEME, LIGHT_THEME_ID, DARK_THEME_ID } from './colors';
import { Theme } from 'src/redux/appCommon/types';
import { isAndroid } from '../utils';

interface ProvidedValue {
  themeData: CustomThemeType;
  toggleTheme: () => void;
}


const Context = React.createContext<ProvidedValue>({
  themeData: DEFAULT_LIGHT_THEME,
  toggleTheme: () => {
    console.log('ThemeProvider is not rendered!')
  }
})

interface Props {
  initial: CustomThemeType;
  children?: React.ReactNode;
}
const { ReactTheme, ThemeManager } = NativeModules;
export const ThemeProvider = React.memo<Props>((props) => {
  const { theme } = useAppCommon()

  const [themeData, setTheme] = React.useState<CustomThemeType>(props.initial)

  useEffect(() => {
    if (theme === Theme.DARK) {
      setTheme(DEFAULT_DARK_THEME)
    } else if (theme === Theme.LIGHT) {
      setTheme(DEFAULT_LIGHT_THEME)
    }
    if (isAndroid) {
      ReactTheme?.getReactTheme(theme)
    } else {
      ThemeManager?.setTheme(theme)
    }
  }, [theme])


  const ToggleThemeCallback = React.useCallback(() => {
    setTheme((currentTheme) => {
      if (currentTheme.id === LIGHT_THEME_ID) {
        return DEFAULT_DARK_THEME
      }
      if (currentTheme.id === DARK_THEME_ID) {
        return DEFAULT_LIGHT_THEME
      }
      return currentTheme
    })
  }, [])


  const MemoizedValue = React.useMemo(() => {
    return {
      themeData,
      toggleTheme: ToggleThemeCallback,
    };
  }, [themeData, ToggleThemeCallback]);

  return (
    <Context.Provider value={MemoizedValue}>
      {props.children}
    </Context.Provider>
  )
})


export const useTheme = () => React.useContext(Context);
