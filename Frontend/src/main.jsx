import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import router from './router/index.jsx'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from "./contexts/AuthContext"

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//       <RouterProvider router={router}></RouterProvider>
//   </StrictMode>
// );

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);