import React from 'react';

import { Auth0Provider } from "@auth0/auth0-react";
import ReactDOM from 'react-dom/client';

import App from '@/App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH_DOMAIN}
      clientId={import.meta.env.VITE_AUTH_CLIENT_ID}
      redirectUri={window.location.origin}
      audience={import.meta.env.VITE_AUTH_AUDIENCE}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)
