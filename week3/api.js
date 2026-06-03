
// When your real API is ready, change this one line
const BASE_URL = "https://mockapi.example.com";

// Simulates a login POST request
export async function login(email, password) {
  // Mock response — replace with real API later
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "test@test.com" && password === "password123") {
        resolve({ token: "mock-jwt-token-abc123" });
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 1000); // simulates network delay
  });
}

// Simulates a signup POST request
export async function signUp(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        resolve({ token: "mock-jwt-token-abc123" });
      } else {
        reject(new Error("Please fill in all fields"));
      }
    }, 1000);
  });
}