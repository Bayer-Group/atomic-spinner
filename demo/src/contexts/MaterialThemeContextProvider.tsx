import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material'

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} })

const MaterialThemeContextProvider = ({ children }: any): JSX.Element => {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light')
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      }
    }),
    []
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
