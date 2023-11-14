'use client'

import { IconContext } from 'react-icons'
import { FaMoon, FaSun } from 'react-icons/fa'
import {
  ColorMode,
  ElementColorType,
  useCustomColorTheme,
} from '../_hooks/useCustomColorTheme'

const DarkModeButton = () => {
  const { colorMode, switchColorMode, getColorForElement } =
    useCustomColorTheme()

  const style = 'absolute right-4 bottom-5'

  return (
    <button
      className={style}
      onClick={() => {
        switchColorMode()
      }}
      aria-label="dark-mode-toggle"
    >
      <IconContext.Provider
        value={{
          color: getColorForElement(ElementColorType.colorSwitcherButtonColor),
        }}
      >
        {colorMode === ColorMode.dark ? <FaSun /> : <FaMoon />}
      </IconContext.Provider>
    </button>
  )
}

export default DarkModeButton
