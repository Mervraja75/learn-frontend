import axios from "axios";

// Your real API
const BASE_URL = "http://localhost:3000";

// Real login POST request
export async function login(email, password) {
  const response = await axios.post(`${BASE_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
}

// Real signup POST request
export async function signUp(name, username, email, password) {
  const response = await axios.post(`${BASE_URL}/auth/signup`, {
    name,
    username,
    email,
    hashed_password: password,
  });
  return response.data;
}

// Real GET all clients (protected)
export async function getClients(token) {
  const response = await axios.get(`${BASE_URL}/clients`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

// Real GET one client (protected)
export async function getClient(token, id) {
  const response = await axios.get(`${BASE_URL}/clients/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

// Real POST create client (protected)
export async function createClient(token, name, email, phone, company) {
  const response = await axios.post(
    `${BASE_URL}/clients`,
    { name, email, phone, company },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
}