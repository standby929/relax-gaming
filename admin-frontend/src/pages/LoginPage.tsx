import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../auth/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (credentialResponse.credential) {
            const decoded: any = jwtDecode(credentialResponse.credential);
            setUser(decoded);
            navigate('/admin');
          }
        }}
        onError={() => {
          console.error('Login failed');
        }}
      />
    </div>
  );
}
