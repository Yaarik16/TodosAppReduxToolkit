import React from "react";
import styles from "../Todos.module.scss";
import { deleteTodo, type Todo } from "../../../state/todos/todosSlice.ts";
import type { AppDispatch } from "../../../state/store.ts";

interface NoteProps {
  todo: Todo;
  dispatch: AppDispatch;
  setEditingTodoId: (arg: number | null) => void;
}

const TodoCard: React.FC<NoteProps> = ({
  todo,
  dispatch,
  setEditingTodoId,
}) => {
  const handleDelete = () => {
    setTimeout(() => {
      dispatch(deleteTodo(todo));
    }, 300);
  };

  return (
    <div className={`${styles.todo} ${styles.fadeIn}`} key={todo.id}>
      <div className={styles["todo-body"]}>
        <p className={styles.text}>{todo.title}</p>
        {todo.tag && (
          <div className={styles.tagItem}>
            <span>Tags: </span>
            <p className={styles.tag}>{todo.tag}</p>
          </div>
        )}
      </div>
      <div className={styles.btns}>
        <button onClick={handleDelete}>Delete</button>
        <button
          onClick={() => {
            setEditingTodoId(todo.id);
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
