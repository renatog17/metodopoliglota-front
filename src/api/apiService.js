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

export const postUser = (data) => publicApi.post("/user", data);
export const verifyEmail = (token) => publicApi.post("/email/verify", { token });
export const resendVerificationToken = (email) => publicApi.post("/email/resend", { email });