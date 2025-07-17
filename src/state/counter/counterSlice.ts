import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

// Define your state variables and use proper typing for your piece of state
interface CounterState {
  value: number;
}

// The initial value of all variables of your piece of state
const initialState: CounterState = {
  value: 0,
};

// Slice creation using toolkit
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // "increment" is the name of the action, the arrow function after is the reducer that manipulates the store
    increment: (state) => {
      state.value += 1;
    },
    // "decrement" is the name of the action, the arrow function after is the reducer that manipulates the store
    decrement: (state) => {
      state.value -= 1;
    },
    // "incrementByAmount" is the name of the action, the arrow function after is the reducer that takes in some payload and then manipulates the store
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  // Use extraReducers to handle async reducers
  extraReducers: (builder) => {
    // Pending case describes what is going happen during the time that function takes to complete (ex: api call -> show "Loading...")
    builder
      .addCase(incrementByAmountAsync.pending, () => {
        console.log("Thinking...");
        // Fulfilled case is the actual function with the logic (ex: api call -> fetch logic goes here)
      })
      .addCase(incrementByAmountAsync.fulfilled, (state, action) => {
        state.value += action.payload;
        console.log("Done:)");
      });
  },
});

// Async action in redux
export const incrementByAmountAsync = createAsyncThunk(
  // Name of the async action
  "counter/incrementByAmount",
  // Async function (ex: api call, etc...)
  async (amount: number) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return amount;
  },
);

// Export actions to manipulate the store
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Export counterSlice.reducer to make a connection with the store
export default counterSlice.reducer;
