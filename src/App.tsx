import { Suspense } from "react";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import { BrowserRouter } from 'react-router-dom';

import Routes from '@/Routes';
import Viewport from '@/Viewport';

const App = withAuthenticationRequired(() => {

  return (
    <Suspense>
      <BrowserRouter>
        <Viewport>
          <Routes />
        </Viewport>
      </BrowserRouter>
    </Suspense>
  )
})

export default App
