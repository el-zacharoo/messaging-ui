import { Suspense } from "react";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';

import Routes from '@/Routes';
import { theme } from '@/theme';
import Viewport from '@/Viewport';

const App = withAuthenticationRequired(() => {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense>
        <BrowserRouter>
          <Viewport>
            <Routes />
          </Viewport>
        </BrowserRouter>
      </Suspense>
    </ThemeProvider>
  )
})

export default App
