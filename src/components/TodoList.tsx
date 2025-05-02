import React from "react";
import { Todo } from "../types/todo";
import TodoItems from "./TodoItems.tsx";
import Filters from "./Filters.tsx";

type todoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onSaveEdit: (id: string, newTitle: string) => void;
  dueDate?: string;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

const TodoList = ({
  onToggle,
  onDelete,
  todos,
  onSaveEdit,
  searchTerm,
  setSearchTerm,
}: todoListProps) => {
  return (
    <div className="border-2 rounded-[5px] bg-[#f8f8ff] sm:w-[40%] md:m-auto mx-3 md:my-3 mt-10 flex flex-col gap-y-2 p-3 pl-5 ">
      <Filters searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {todos.map((todo) => (
        <div className="w-[100%]" key={todo.id}>
          <TodoItems
            // key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onSaveEdit={onSaveEdit}
            dueDate={todo.dueDate}
          />
        </div>
      ))}
    </div>
  );
};

export default TodoList;
