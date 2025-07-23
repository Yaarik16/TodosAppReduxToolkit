import React from "react";
import styles from "../Notes.module.scss";
import type { Todo } from "../../../state/todos/todosSlice.ts";

interface EditNoteFormProps {
  todo: Todo;
  handleTodoChange: (
    id: number,
    editedText: string,
    completed: boolean,
    editedTag: string,
  ) => void;
  editedTodoText: string;
  setEditedTodoText: (text: string) => void;
  editedTodoTag: string;
  setEditedTodoTag: (tag: string) => void;
}

const EditTodoForm: React.FC<EditNoteFormProps> = ({
  todo,
  handleTodoChange,
  editedTodoText,
  setEditedTodoText,
  editedTodoTag,
  setEditedTodoTag,
}) => {
  return (
    <div className={styles["edit-text"]}>
      <input
        className={styles.input}
        type="text"
        placeholder="Edit text"
        value={editedTodoText}
        onChange={(e) => setEditedTodoText(e.target.value)}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Edit tag"
        value={editedTodoTag}
        onChange={(e) => setEditedTodoTag(e.target.value)}
      />
      <button
        onClick={() =>
          handleTodoChange(todo.id, editedTodoText, false, editedTodoTag)
        }
      >
        Done
      </button>
    </div>
  );
};

export default EditTodoForm;
