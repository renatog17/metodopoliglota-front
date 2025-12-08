import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUserData } from "../context/UserDataProvider";

export default function Sidebar() {
  const { logout } = useAuth();
  const { userData: decks, reloadUserData } = useUserData();
  console.log("Decks in Sidebar:", decks);

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

        {Array.isArray(decks) &&
          decks.map((deck) => (
            <li key={deck.id} className="list-none">
              <Link
                to={`/decks/${deck.id}`}
                className="block py-2 px-3 hover:bg-gray-200"
              >
                {deck.name}
              </Link>
            </li>
          ))}
      </nav>

      <button
        onClick={logout}
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Logout
      </button>
    </aside>
  );
}
