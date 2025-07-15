import Profile from '../components/Profile';

export default function AdminPage() {
  return (
    <div className="relative min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <Profile />
    </div>
  );
}
