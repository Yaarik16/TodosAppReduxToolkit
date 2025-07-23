import styles from "./EditModal.module.scss";
import {
  type Todo,
  updateTodoTitle,
} from "../../../../state/todos/todosSlice.ts";
import React, { useState } from "react";
import type { AppDispatch } from "../../../../state/store.ts";

interface EditModalProps {
  todo: Todo;
  dispatch: AppDispatch;
  setEditingTodoId: (arg: number | null) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  todo,
  dispatch,
  setEditingTodoId,
}) => {
  const [editedTodoText, setEditedTodoText] = useState<string>(todo.title);
  const [editedTodoTag, setEditedTodoTag] = useState<string | undefined>(
    todo.tag,
  );

  const handleTodoChange = (
    id: number,
    newText: string,
    newTag: string | undefined,
  ) => {
    dispatch(updateTodoTitle({ id, title: newText, tag: newTag }));
    setEditingTodoId(null);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles["input-container"]}>
          <p>Edit todo text</p>
          <input
            className={styles.input}
            type="text"
            placeholder="Edit text"
            value={editedTodoText}
            onChange={(e) => setEditedTodoText(e.target.value)}
          />
        </div>
        <div className={styles["input-container"]}>
          <p>Edit tag</p>
          <input
            className={styles.input}
            type="text"
            placeholder="Add/Edit tag"
            value={editedTodoTag}
            onChange={(e) => setEditedTodoTag(e.target.value)}
          />
        </div>

        <button
          onClick={() =>
            handleTodoChange(todo.id, editedTodoText, editedTodoTag)
          }
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default EditModal;
