import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

interface Note {
  id: number;
  text: string;
}

interface NotesState {
  items: Note[];
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
}

const initialState: NotesState = {
  items: [],
  isLoading: false,
  isError: false,
  isEmpty: false,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    deleteNote: (state, action: PayloadAction<Note>) => {
      state.items = state.items.filter((note) => note.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncAddNote.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isEmpty = false;
      })
      .addCase(asyncAddNote.fulfilled, (state, action: PayloadAction<Note>) => {
        state.isLoading = false;
        if (action.payload.text.trim().length === 0) {
          state.isEmpty = true;
        } else if (
          state.items.some((note) => note.text === action.payload.text)
        ) {
          state.isError = true;
        } else {
          state.items.push({
            id: Date.now(),
            text: action.payload.text,
          });
        }
      });
  },
});

export const asyncAddNote = createAsyncThunk(
  "notes/asyncAddNote",
  async ({ id, text }: { id: number; text: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return { id, text };
  },
);

export const { deleteNote } = notesSlice.actions;

export default notesSlice.reducer;
