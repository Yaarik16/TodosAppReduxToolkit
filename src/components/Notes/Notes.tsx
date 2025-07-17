import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../state/store.ts";
import { deleteNote, asyncAddNote } from "../../state/notes/notesSlice.ts";
import { useState } from "react";
import React from "react";

const Notes = () => {
  const notes = useSelector((state: RootState) => state.notes.items);
  const isLoading = useSelector((state: RootState) => state.notes.isLoading);
  const isError = useSelector((state: RootState) => state.notes.isError);
  const isEmpty = useSelector((state: RootState) => state.notes.isEmpty);
  const dispatch = useDispatch<AppDispatch>();
  const [noteText, setNoteText] = useState("");

  const submitClick = () => {
    dispatch(
      asyncAddNote({
        id: Date.now(),
        text: noteText,
      }),
    );
    setNoteText("");
  };

  return (
    <div>
      <h2>Notes app</h2>
      <input
        type="text"
        placeholder="Type Notes"
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
      />
      <button onClick={submitClick}>Add a note</button>
      {isEmpty && <p>You can not submit an empty field</p>}
      {isLoading && <p>Loading...</p>}
      {isError && <p>This note already exists in the list.</p>}
      {notes.map((note) => (
        <React.Fragment key={note.id}>
          <p>TEXT: {note.text}</p>
          <p>ID: {note.id}</p>
          <button onClick={() => dispatch(deleteNote(note))}>Delete</button>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Notes;
