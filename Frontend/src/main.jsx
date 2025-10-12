import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import router from './router/index.jsx'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from "./contexts/AuthContext"

// Wrap the application with AuthProvider to provide authentication context
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);