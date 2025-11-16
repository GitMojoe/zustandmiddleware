import { useCounterStore } from "./counterStore";
export default function Counter(){
  const {count, increase} = useCounterStore();

  return(
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increase}>Increase</button>
    </div>
  )
}