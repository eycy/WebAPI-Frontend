import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { config } from './config';

import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <GoogleOAuthProvider clientId={config.google_client_id}>
    <React.StrictMode>
      <App />
    </React.StrictMode>s
  </GoogleOAuthProvider>
)

