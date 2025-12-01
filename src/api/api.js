export const api = {
  login: (data) =>
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),

  check: () =>
    fetch("http://localhost:8080/auth", {
      credentials: "include",
    }),

  logout: () =>
    fetch("http://localhost:8080/auth/logout", {
      method: "POST",
      credentials: "include",
    }),
};
