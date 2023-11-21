import {
  createContext,
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
} from 'react'
import { useTheme } from 'next-themes'
import { useCallback } from 'react'

export enum ElementColorType {
  backgroundColor,
  textColor,
  buttonColor,
  colorSwitcherButtonColor,
}

export enum ColorMode {
  dark = 'dark',
  light = 'light',
}

type CustomColorTheme = Record<ColorMode, Record<ElementColorType, string>>

const customColorTheme: CustomColorTheme = {
  [ColorMode.dark]: {
    [ElementColorType.backgroundColor]: '#002b36',
    [ElementColorType.textColor]: '#839496',
    [ElementColorType.buttonColor]: '#859900',
    [ElementColorType.colorSwitcherButtonColor]: 'yellow',
  },
  [ColorMode.light]: {
    [ElementColorType.backgroundColor]: '#fdf6e3',
    [ElementColorType.textColor]: '#657b83',
    [ElementColorType.buttonColor]: '#2aa198',
    [ElementColorType.colorSwitcherButtonColor]: 'white',
  },
}

export const CustomColorThemeContext = createContext({
  colorMode: ColorMode.dark,
  switchColorMode: () => {},
  getColorForElement: (colorType: ElementColorType) =>
    customColorTheme[ColorMode.dark][colorType],
})

export const CustomColorThemeProvider = ({ children }: PropsWithChildren) => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const colorMode = theme === 'light' ? ColorMode.light : ColorMode.dark

  const switchColorMode = useCallback(() => {
    console.log('theme', theme === 'light' ? 'dark' : 'light')
    setTheme(theme === 'light' ? 'dark' : 'light')
  }, [setTheme, theme])

  const getColorForElement = (colorType: ElementColorType) =>
    customColorTheme[colorMode][colorType]

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <CustomColorThemeContext.Provider
      value={{
        colorMode,
        switchColorMode,
        getColorForElement,
      }}
    >
      {children}
    </CustomColorThemeContext.Provider>
  )
}

export const useCustomColorTheme = () => {
  return useContext(CustomColorThemeContext)
}
