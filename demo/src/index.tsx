import { CssBaseline } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import App from './App'
import MaterialThemeContextProvider from './contexts/MaterialThemeContextProvider'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <MaterialThemeContextProvider>
      <CssBaseline />
      <HelmetProvider>
        <Helmet>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Helmet>
        <App />
      </HelmetProvider>
    </MaterialThemeContextProvider>
  </React.StrictMode>
)
