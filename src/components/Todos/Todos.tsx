import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../state/store";
import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./Todos.module.scss";
import AddAndSearchNotesForm from "./AddAndSearchNotesForm.tsx";
import TodoCard from "./Todo/TodoCard.tsx";
import useFilteredTodos from "../../hooks/useFilteredTodos.ts";
import { asyncFetchTodos } from "../../state/todos/todosSlice.ts";
import EditModal from "./Todo/EditModal/EditModal.tsx";

const BATCH_SIZE = 12;

const Todos = () => {
  const todos = useSelector((state: RootState) => state.todos.items);
  const dispatch = useDispatch<AppDispatch>();

  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(asyncFetchTodos());
  }, [dispatch]);

  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [searchQuery]);

  const filteredTodos = useFilteredTodos({ todos, searchQuery });

  const loadMore = useCallback(() => {
    setVisibleCount((count) =>
      Math.min(count + BATCH_SIZE, filteredTodos.length),
    );
  }, [filteredTodos.length]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        root: null,
        threshold: 0.1,
      },
    );

    observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [loadMore]);

  useEffect(() => {
    if (editingTodoId !== null) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [editingTodoId]);

  return (
    <div className={styles.container}>
      <AddAndSearchNotesForm
        dispatch={dispatch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {filteredTodos.length === 0 ? (
        <h2>No todos found</h2>
      ) : (
        <>
          <div className={styles.todos}>
            {filteredTodos.slice(0, visibleCount).map((todo) => (
              <>
                <TodoCard
                  key={todo.id}
                  todo={todo}
                  dispatch={dispatch}
                  setEditingTodoId={setEditingTodoId}
                />
                {editingTodoId === todo.id && (
                  <EditModal
                    todo={todo}
                    dispatch={dispatch}
                    setEditingTodoId={setEditingTodoId}
                  />
                )}
              </>
            ))}
          </div>
          <div ref={sentinelRef} style={{ height: "1px" }} />
        </>
      )}
    </div>
  );
};

export default Todos;
