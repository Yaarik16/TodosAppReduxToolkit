import React, { useState } from "react";
import styles from "./Notes.module.scss";
import { asyncAddTodo } from "../../state/todos/todosSlice.ts";
import type { AppDispatch, RootState } from "../../state/store.ts";
import { useSelector } from "react-redux";

interface AddAndSearchNotesFormProps {
  dispatch: AppDispatch;
  searchQuery: string;
  setSearchQuery: (arg: string) => void;
}

const AddAndSearchNotesForm: React.FC<AddAndSearchNotesFormProps> = ({
  dispatch,
  searchQuery,
  setSearchQuery,
}) => {
  const isLoading = useSelector((state: RootState) => state.todos.isLoading);
  const isError = useSelector((state: RootState) => state.todos.isError);

  const [noteText, setNoteText] = useState("");
  const [noteTag, setNoteTag] = useState("");
  const [isEmpty, setEmpty] = useState<boolean>(false);

  const submitClick = () => {
    if (noteText === "") {
      setEmpty(true);
      return;
    }
    dispatch(
      asyncAddTodo({
        id: Date.now(),
        title: noteText,
        completed: false,
        tag: noteTag,
      }),
    );
    setNoteText("");
    setNoteTag("");
    setEmpty(false);
  };

  return (
    <>
      <h2>Todos app</h2>
      <div className={styles.form}>
        <input
          type="text"
          placeholder="Type Todo"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tag (optional)"
          value={noteTag}
          onChange={(e) => setNoteTag(e.target.value)}
        />
        <button onClick={submitClick}>Add todo</button>
      </div>

      <input
        type="text"
        placeholder="Search..."
        className={styles.search}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {isEmpty && <h4>You cannot submit an empty field</h4>}
      {isLoading && <h4>Working our magic...</h4>}
      {isError && <h4>This todo already exists in the list.</h4>}
    </>
  );
};

export default AddAndSearchNotesForm;
