import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_API_URL;

const publicApi = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Auth
export const loginRequest = (email, password) => api.post("/auth/login", { email, password });
export const logoutRequest = () => api.post("/auth/logout");
export const checkLoginRequest = () =>api.get("/auth/check");

export const postUser = (data) => publicApi.post("/user", data);
export const verifyEmail = (token) => publicApi.post("/email/verify", { token });
export const resendVerificationToken = (email) => publicApi.post("/email/resend", { email });
export const requestPasswordReset = (email) => publicApi.post("/password/forget", { email });
export const resetPassword = (email, token, password) => publicApi.post("/password/reset", { email, token, password });

//private
export const fetchDecks = () => api.get("/decks");
export const createLexeme = (data) => api.post("/lexemes", data);