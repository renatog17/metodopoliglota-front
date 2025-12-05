import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
      <h2 className="text-xl font-bold mb-6">Menu</h2>

      <nav className="flex-1">
        <ul className="space-y-3">
          <li>
            <Link to="/dashboard" className="block py-2 px-3 hover:bg-gray-200">
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>

      <button
        onClick={logout}
        className="mt-6 bg-red-500 text-white py-2 px-4 rounded"
      >
        Logout
      </button>
    </aside>
  );
}
