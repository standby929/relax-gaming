import { useState, useRef } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useOutsideClick } from '../hooks/useOutsideClick';

export default function Profile() {
  const { user, setUser } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  if (!user) return null;

  // Click outside to close the dropdown
  useOutsideClick(dropdownRef, () => setOpen(false), open);
  return (
    <div className="absolute top-4 right-4 z-50">
      <div className="relative" ref={dropdownRef}>
        <button onClick={() => setOpen(!open)} className="focus:outline-none">
          <img
            src={user.picture}
            alt={user.name}
            className="w-10 h-10 rounded-full border border-gray-300 hover:shadow-md"
          />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-sm text-gray-700">
            <p className="font-medium">{user.name}</p>
            <p className="text-gray-500">{user.email}</p>
            <hr className="my-2" />
            <button
              onClick={() => setUser(null)}
              className="w-full text-left text-red-600 hover:underline hover:cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
