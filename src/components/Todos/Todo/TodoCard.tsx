import React, { useState } from "react";
import styles from "../Notes.module.scss";
import {
  deleteTodo,
  updateTodoTitle,
  type Todo,
} from "../../../state/todos/todosSlice.ts";
import type { AppDispatch } from "../../../state/store.ts";
import EditTodoForm from "./EditTodoForm.tsx";

interface NoteProps {
  todo: Todo;
  dispatch: AppDispatch;
}

const TodoCard: React.FC<NoteProps> = ({ todo, dispatch }) => {
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editedTodoText, setEditedTodoText] = useState<string>("");
  const [editedTodoTag, setEditedTodoTag] = useState<string>("");

  const handleDelete = () => {
    setTimeout(() => {
      dispatch(deleteTodo(todo));
    }, 300);
  };

  const handleTodoChange = (
    id: number,
    newText: string,
    completed: boolean,
    newTag: string,
  ) => {
    dispatch(updateTodoTitle({ id, title: newText, tag: newTag, completed }));
    setEditingTodoId(null);
  };

  return (
    <div className={`${styles.todo} ${styles.fadeIn}`} key={todo.id}>
      {editingTodoId === todo.id ? (
        <EditTodoForm
          todo={todo}
          handleTodoChange={handleTodoChange}
          editedTodoText={editedTodoText}
          setEditedTodoText={setEditedTodoText}
          editedTodoTag={editedTodoTag}
          setEditedTodoTag={setEditedTodoTag}
        />
      ) : (
        <div className={styles["todo-body"]}>
          <p className={styles.text}>{todo.title}</p>
          {todo.tag && (
            <div className={styles.tagItem}>
              <span>Tags: </span>
              <p className={styles.tag}>{todo.tag}</p>
            </div>
          )}
        </div>
      )}
      <div className={styles.btns}>
        <button onClick={handleDelete}>Delete</button>
        <button
          onClick={() => {
            setEditingTodoId(todo.id);
            setEditedTodoText(todo.title);
            setEditedTodoTag(todo.tag ?? "");
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
