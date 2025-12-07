import { AuthProvider } from "./context/AuthContext";
import { UserDataProvider } from "./context/UserDataProvider";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <AuthProvider>
      <UserDataProvider>
        <AppRoutes />
      </UserDataProvider>
    </AuthProvider>
  );
}
