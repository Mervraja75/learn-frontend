# React Native Learning Plan
**Goal:** Build a working frontend in React Native that connects to a REST API with authentication by the end of Week 5.

---

## Background
- **Technology:** React Native (with Expo)
- **Prior experience:** Built a small project or two
- **Time available:** 2–3 hours per week
- **Final target:** A mobile app that supports user login (JWT/session auth) and makes authenticated requests to a custom REST API

---

## Week 1 — Foundations Refresher & Project Setup
*(Corresponds to Learn Front End 1)*

### Goal
Re-orient yourself with React Native and Expo, get a clean project running, and confirm your tooling works end to end.

### Topics
- Expo CLI setup and project creation (`npx create-expo-app`)
- File/folder structure of a React Native project
- Core components: `View`, `Text`, `TextInput`, `Button`, `ScrollView`,
- `StyleSheet` basics
- Running on a simulator or your phone via Expo Go

### Resources
- [Expo "Get Started" docs](https://docs.expo.dev/get-started/introduction/) — official, free, up to date
- [React Native official tutorial](https://reactnative.dev/docs/getting-started) — "Learn the Basics" section
- YouTube: *"React Native Crash Course 2024"* by Traversy Media or Academind (search for the most recent one)

### Milestone ✅
A "Hello World" or simple to-do list app running on your device or simulator, committed to GitHub.

---

## Week 2 — Navigation & Screen Structure
*(Corresponds to Learn Front End 2)*

### Goal
Add multi-screen navigation and build out the screens your app will need: a Login screen and at least one authenticated screen.

### Topics
- Installing and configuring React Navigation (`@react-navigation/native`, `native-stack`)
- Stack navigator vs. Tab navigator
- Passing props/params between screens
- Conditional navigation (show Login screen vs. main app based on auth state)

### Resources
- [React Navigation docs](https://reactnavigation.org/docs/getting-started) — the definitive guide
- [React Navigation auth flow example](https://reactnavigation.org/docs/auth-flow) — exactly what you need for login routing
- Expo docs on navigation: [https://docs.expo.dev/router/introduction/](https://docs.expo.dev/router/introduction/)

### Milestone ✅
An app with at least two screens (Login + one main screen). Tapping "Login" navigates to the main screen. Tapping "Logout" returns to Login. No real API yet — just mocked state.

---

## Week 3 — API Integration & Authentication
*(Corresponds to Learn Front End 3)*

### Goal
Connect your app to your real REST API. Implement login (sending credentials, receiving a token) and store the token securely for use in subsequent requests.

### Topics
- `fetch` or `axios` for HTTP requests
- Sending a POST request to your login endpoint
- Storing the auth token with `SecureStore` from Expo (`expo-secure-store`)
- Attaching the token to authenticated requests (`Authorization: Bearer <token>`)
- Handling errors: wrong credentials, expired tokens, network failures

### Resources
- [Expo SecureStore docs](https://docs.expo.dev/versions/latest/sdk/securestore/)
- [Axios with React Native](https://axios-http.com/docs/intro) — easier error handling than raw fetch
- Your own API docs / Postman collection — test your endpoints here before wiring them up

### Milestone ✅
The Login screen sends real credentials to your API. On success, the token is stored and the app navigates to the main screen. A test API call from the main screen (e.g., fetching a protected resource) succeeds with the stored token.

---

## Week 4 — Core Features & State Management
*(Corresponds to Learn Front End 4)*

### Goal
Build out the main functionality of your app using real data from your API. Manage application state cleanly so the UI stays in sync with the backend.

### Topics
- React Context or Zustand for global auth state (user object, token)
- Fetching and displaying lists of data (`FlatList`)
- Loading states and error messages
- Logout: clearing the stored token and resetting navigation
- Basic form handling (create/update resources via your API)

### Resources
- [React Context docs](https://react.dev/reference/react/useContext)
- [Zustand (lightweight alternative)](https://zustand-demo.pmnd.rs/) — optional, but simpler than Redux for this scale
- [FlatList docs](https://reactnative.dev/docs/flatlist)

### Milestone ✅
At least one feature is fully working end-to-end: data is fetched from your API, displayed in a list or detail view, and the user can create or update a resource. Logout clears credentials and returns the user to the Login screen.

---

## Week 5 — Polish, Error Handling & Submission
*(Corresponds to Learn Front End 5 / Final Create a Frontend)*

### Goal
Finish your frontend to a submittable state: reliable auth flow, clean UI, and solid error handling throughout.

### Topics
- Token expiry handling (401 responses → redirect to Login)
- Input validation on forms
- Loading spinners and empty states
- Basic styling polish (consistent colors, spacing, readable fonts)
- Testing the full user journey manually

### Resources
- [React Native Paper](https://reactnativepaper.com/) — optional UI component library for quick polish
- Your API's Postman collection — re-test all endpoints once the UI is done

### Milestone ✅
A complete, working mobile app that:
- Allows a user to log in with credentials from your REST API
- Makes authenticated requests and displays real data
- Handles errors gracefully (bad login, lost connection, expired token)
- All code committed to GitHub with a clear folder structure

---

## General Tips
- **Commit often.** Even small commits ("added login screen layout") give you a clear history and make debugging easier.
- **Test on a real device early.** Expo Go makes this easy — things like keyboard behavior and touch targets feel different on a real phone.
- **Don't skip the auth flow docs.** The React Navigation auth flow example (Week 2 resources) is the best pattern for your use case and will save you a lot of trouble.
- **Keep your API running locally** while developing. Use your machine's local IP (e.g., `http://192.168.x.x:3000`) instead of `localhost` — React Native on a device can't reach your laptop's localhost.