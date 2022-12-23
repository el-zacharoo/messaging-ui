import { Suspense } from "react";

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';

import AuthProvider from '@/auth/userContext';
import Routes from '@/Routes';
import { theme } from '@/theme';
import Viewport from '@/Viewport';

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense>
        <BrowserRouter>
          <AuthProvider>
            <Viewport>
              <Routes />
            </Viewport>
          </AuthProvider>
        </BrowserRouter>
      </Suspense>
    </ThemeProvider>
  )
}

export default App
