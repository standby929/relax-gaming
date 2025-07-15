import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './auth/AuthContext';
import RequireAuth from './auth/RequireAuth';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';

function App() {
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <RequireAuth>
                  <AdminPage />
                </RequireAuth>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>  );
}

export default App
