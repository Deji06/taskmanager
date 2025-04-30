// import { useState } from 'react'
import React, { useState } from "react";
import { Todo } from "../types/todo";
import { IconButton, Checkbox } from "@fluentui/react";
import { CiEdit } from "react-icons/ci";
import EditTask from "./EditTask.tsx";

// import { Checkbox } from '@fluentui/react/lib-commonjs/Checkbox' ;

type todoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onSaveEdit:(id:string, newTitle: string) => void
};

const TodoItems = ({ todo, onDelete, onToggle, onSaveEdit }: todoItemProps) => {
  const [editing, setIsEditing] = useState(false);
  const [titleEditing, setIsTittleEditing] = useState(todo.title);
  const[checkTitleComplete, setCheckTitleComplete] = useState(todo.completed)


  const editButton = () => {
    if(checkTitleComplete === todo.completed) {
      confirm('task already completed')
      setIsEditing(false)
    }
    else {
      setIsEditing(!editing)
    }
  }
  return (
    <>
      <div className="flex gap-x-3 items-center justify-between">
        <div className="flex items-center gap-x-2 ">
          <Checkbox
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            styles={{
              checkbox: {
                width: 14,
                height: 14,
              },
              checkmark: {
                fontSize: 10,
              },
            }}
          />
          {todo.completed ? (
            <p className="line-through">{todo.title}</p>
          ) : (
            <p>{todo.title}</p>
          )}
        </div>
        <div className="flex items-center gap-x-3">
          <CiEdit
            className="text-[20px] cursor-pointer"
            onClick={editButton} 
          />
          <IconButton
            iconProps={{ iconName: "Delete" }}
            onClick={() => onDelete(todo.id)}
            styles={{
              root: {
                backgroundColor: "#f8f8ff",
                color: "black",
                paddingRight: "8px",
              },
              rootHovered: {
                backgroundColor: "#e0e0e0",
              },
            }}
          />
        </div>

        {editing && (
          <EditTask editTask={todo} editing={editing} SetIsEditing={setIsEditing} titleEditing={titleEditing} onSaveEdit={onSaveEdit} />
        )}
      </div>
    </>
  );
};

export default TodoItems;
