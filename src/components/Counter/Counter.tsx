// Essential hooks to add a right piece of state to this component
import { useDispatch, useSelector } from "react-redux";

// Essential types for proper development
import type { AppDispatch, RootState } from "../../state/store.ts";

// Essential actions for state manipulation
import {
  increment,
  decrement,
  incrementByAmount,
  incrementByAmountAsync,
} from "../../state/counter/counterSlice.ts";

const Counter = () => {
  // Your state with proper types
  const count = useSelector((state: RootState) => state.counter.value);

  // Dispatch to call different reducers from slice, <AppDispatch> type is only for async actions
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div>
      <h2>{count}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(20))}>
        Increment by 20
      </button>

      {/* This button will call async function that will increment counter by 20 */}
      <button onClick={() => dispatch(incrementByAmountAsync(20))}>
        Increment by 20 async
      </button>
    </div>
  );
};

export default Counter;
