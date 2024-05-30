import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRoutes } from './routes'
import { ThemeProvider } from 'styled-components'
import { appTheme } from './styles/theme'
import { GlobalStyles } from './styles/global'
import { AuthProvider } from './context/authContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={appTheme}>
        <AppRoutes />
        <GlobalStyles />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
)
