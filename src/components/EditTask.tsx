import React, { useState } from "react";
import { Todo } from "../types/todo.ts";

type EditTaskProps = {
  editTask: Todo;
  editing: boolean;
  titleEditing: string;
  SetIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  onSaveEdit: (id: string, newTitle: string) => void;
  // onToggle: (id:string) => void
  // onDelete: (id:string) => void
};
const EditTask = ({
  editTask,
  editing,
  SetIsEditing,
  titleEditing,
  onSaveEdit,
}: EditTaskProps) => {
  const [saveNewEdit, setIsSaveNewEdit] = useState("");
  const editTaskForm = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(saveNewEdit);
  };

  const saveTask = () => {
    if (!saveNewEdit.trim()) return;
    onSaveEdit(editTask.id, saveNewEdit.trim());
    setIsSaveNewEdit(titleEditing);
    console.log("edited task:", setIsSaveNewEdit(titleEditing));
    SetIsEditing(false);

    // const updatedTodos = editTask
    // setIsSaveNewEdit(titleEditing)
  };

  return (
    <form action="" key={editTask.id} className="" onSubmit={editTaskForm}>
      <input
        type="text"
        value={saveNewEdit}
        placeholder={editTask.title}
        className="border-2 focus:border-blue-500"
        onChange={(e) => setIsSaveNewEdit(e.target.value)}
      />
      <div className="flex gap-x-3 items center justify-between mt-2">
        <button
          type="submit"
          className="border rounded px-5 bg-[#646FF0] text-white "
          onClick={saveTask}
        >
          save
        </button>
        <button
          className="border rounded px-5 bg-[#646FF0] text-white "
          onClick={() => SetIsEditing(!editing)}
        >
          cancel
        </button>
      </div>
    </form>
  );
};
export default EditTask;
