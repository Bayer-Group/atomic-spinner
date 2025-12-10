import React, { JSX, ReactNode } from 'react'
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material'

export const ColorModeContext = React.createContext<{ mode: 'light' | 'dark', toggleColorMode: () => void }>({ mode: 'light', toggleColorMode: () => { } })

const MaterialThemeContextProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = React.useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light')

  const colorMode = React.useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      }
    }),
    [mode]
  )

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode
        }
      }),
    [mode]
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default MaterialThemeContextProvider
