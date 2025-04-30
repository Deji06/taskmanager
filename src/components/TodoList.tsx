import React from "react";
import { Todo } from "../types/todo";
import TodoItems from "./TodoItems.tsx";

type todoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onSaveEdit:(id:string, newTitle:string) => void
};

const TodoList = ({ onToggle, onDelete, todos, onSaveEdit }: todoListProps) => {
  return (
      <div className="border-2 rounded-[5px] bg-[#f8f8ff] w-[40%] m-auto mt-10 flex flex-col gap-y-2  pl-5 ">
        {todos.map((todo) => (
          <div className="w-[100%]" key={todo.id}>
            <TodoItems
              // key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onSaveEdit={onSaveEdit}
            />

          </div>
        ))}
      </div>
  );
};

export default TodoList;
