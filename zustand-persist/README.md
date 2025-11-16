# Zustand Persist Middleware Example

This project demonstrates how to use Zustand's `persist` middleware to automatically persist and rehydrate state in a React application. Zustand is a small, fast, and scalable state management library for React, and the `persist` middleware allows you to save state to localStorage (or other storage options) and restore it when the app reloads.

## What is Zustand?

Zustand is a lightweight state management library for React that provides a simple API for creating stores and managing global state. It uses hooks to access and update state, making it easy to integrate with React components.

## What is the Persist Middleware?

The `persist` middleware in Zustand enables automatic persistence of state. By wrapping your store with `persist`, the state is saved to localStorage (by default) whenever it changes. When the app loads, the state is automatically rehydrated from storage, ensuring that user data persists across browser sessions.

### Key Features:
- **Automatic Persistence**: State is saved to storage on every update.
- **Rehydration**: State is restored from storage when the app initializes.
- **Customizable Storage**: You can specify different storage options (e.g., sessionStorage, IndexedDB) or even custom storage engines.
- **Partial Persistence**: You can choose which parts of the state to persist.
- **Versioning**: Supports versioning to handle state migrations when the schema changes.

## How It Works in This Example

In this example, we have a simple authentication store (`authStore.js`) that manages user login/logout state. The `persist` middleware ensures that the user's login status is saved to localStorage and restored on page refresh.

### Code Breakdown

#### authStore.js
```javascript
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      login: (name) => set({ user: { name } }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage", // Key used for localStorage
    }
  )
);
```

- `create`: Creates the Zustand store.
- `persist`: Wraps the store to add persistence.
- The store has `user`, `login`, and `logout` properties/actions.
- `name: "auth-storage"`: Specifies the localStorage key. The state will be stored under `localStorage.getItem("auth-storage")`.

#### App.jsx
```javascript
import { useAuthStore } from "./authStore";

export default function App() {
  const { user, login, logout } = useAuthStore();

  return (
    <div>
      <h1>Zustand Middleware Example</h1>

      {user ? (
        <>
          <h2>Welcome, {user.name}</h2>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={() => login("Guest")}>Login as Guest</button>
      )}
    </div>
  );
}
```

- The component uses the `useAuthStore` hook to access state and actions.
- On login, the state is updated and persisted.
- On logout, the state is cleared and persisted.
- Refreshing the page will restore the user state from localStorage.

## Running the Project

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Open your browser to `http://localhost:5173` (or the port shown in the terminal).

4. Test persistence: Log in as Guest, refresh the page, and notice the state is restored.

## Advanced Usage

- **Custom Storage**: To use sessionStorage instead of localStorage:
  ```javascript
  import { persist, createJSONStorage } from "zustand/middleware";

  export const useAuthStore = create(
    persist(
      (set) => ({
        user: null,
        login: (name) => set({ user: { name } }),
        logout: () => set({ user: null }),
      }),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );
  ```

- **Partial Persistence**: To persist only certain parts of the state:
  ```javascript
  persist(
    (set) => ({ /* state */ }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }), // Only persist 'user'
    }
  )
  ```

- **Versioning and Migrations**: Add a `version` and `migrate` function to handle schema changes.

For more details, check the [Zustand documentation](https://zustand-demo.pmnd.rs/) and [persist middleware docs](https://github.com/pmndrs/zustand#persist-middleware).

## Dependencies

- React
- Zustand
- Vite (for development)

This example uses the default Vite setup for React.
