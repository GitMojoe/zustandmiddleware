import { useAuthStore } from "./authStore";


export default function App(){
  const {user, login, logout} = useAuthStore;

  return(
    <div>
      <h1>Zustand Middleware example</h1>
      {user?(
        <>
        <h2>Welcome, {user.name}</h2>
        <button onClick={logout}>Logout</button>
        </>
      ):(
        <button onClick={()=>login("Guest")}>Login as Guest</button>
      )}
    </div>
  );
}