import type { Todo } from "../state/todos/todosSlice.ts";
import { useMemo } from "react";

interface UseFilteredNotesParams {
  todos: Todo[];
  searchQuery: string;
}

const useFilteredTodos = ({
  todos,
  searchQuery,
}: UseFilteredNotesParams): Todo[] => {
  return useMemo(() => {
    return todos.filter(
      (todo) =>
        (todo.title ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (todo.tag ?? "").toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [todos, searchQuery]);
};

export default useFilteredTodos;
