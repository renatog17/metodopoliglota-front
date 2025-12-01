import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Hello, {user.username}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
