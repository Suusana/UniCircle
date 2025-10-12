import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import router from './router/index.jsx'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from "./contexts/AuthContext"
import { HashRouter } from 'react-router-dom';

// Wrap the application with AuthProvider to provide authentication context
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <HashRouter>
        <RouterProvider router={router} />
      </HashRouter>
    </AuthProvider>
  </StrictMode>
);