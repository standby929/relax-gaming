import { useAuth } from '../auth/AuthContext';

export default function Profile() {
  const { user, setUser } = useAuth();

  if (!user) return null;

  return (
    <div className="flex items-center gap-4 bg-white border rounded-lg p-4 shadow-sm">
      <img
        src={user.picture}
        alt={user.name}
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-1">
        <p className="font-medium text-gray-900">{user.name}</p>
        <p className="text-sm text-gray-600">{user.email}</p>
      </div>
      <button
        onClick={() => setUser(null)}
        className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
      >
        Logout
      </button>
    </div>
  );
}
