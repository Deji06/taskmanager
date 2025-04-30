import React, { useState, useEffect } from "react";
import { Todo } from "./types/todo";
import TodoList from "./components/TodoList.tsx";
// import TodoItems from "./components/TodoItems";
import { initializeIcons } from "@fluentui/react/lib/Icons";

initializeIcons();

// type todos = {
//   todoArray:Todo[]
// }

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [addTask, setAddTask] = useState(false)

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    // console.log("Loaded todos from localStorage:", storedTodos);
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
    setLoading(false);
    // setTodos(storedTodos? JSON.parse(storedTodos): [])
  }, []);

  

  useEffect(() => {
    if (!loading) {
      // console.log("💾 Saving to localStorage:", todos);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, loading]);

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(userInput);

    if (!userInput.trim()) {
      return;
    }

    const newTodos: Todo = {
      id: Date.now().toString(),
      title: userInput,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodos]);
    // const updatedTodos = [...todos, newTodos];
    // setTodos(updatedTodos)
    // console.log(newTodos);
    // localStorage.setItem('todos', JSON.stringify(updatedTodos));

    setUserInput("");
  };

  const handleToggle = (id: string) => {
    const updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updateTodos);
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter((deletedTodo) => deletedTodo.id !== id);
    // confirm('are you sure ?')
    console.log("data:", id);
    setTodos(updatedTodos);
    // localStorage.setItem('todos', JSON.stringify(updatedTodos))
  };

  const handleSaveEdit = (id:string , newTitle:string) => {
    const updatedTodos = todos.map(todo=> 
      todo.id === id ? {...todo, title:newTitle}: todo
      );
      setTodos(updatedTodos)
    }

  return (
    <>
      <div className="uppercase text-[40px] font-bold text-[#646ff0]  w-[50%] m-auto text-center mt-5">
        task manager
      </div>
      <div className="w-[50%] m-auto flex mt-2 justify-between">
        <button className="bg-[#646ff0] px-5 rounded-[5px] text-white cursor-pointer " onClick={()=> setAddTask(!addTask)}>add task</button>
        <select name="" id="" className="bg-[#cccdde] rounded p-2">
          <option value="">all</option>
          <option value="">incomplete</option>
          <option value="">completed</option>
        </select>
      </div>
      {addTask && (
      <form
        action=""
        onSubmit={handleForm}
        className="w-[50%] m-auto mt-10 pl-12 py-5 rounded-[5px] bg-[#CCCDDE] flex flex-col gap-y-3 "
      >
        <label
          htmlFor=""
          className="capitalize font-bold text-[#646ff0] text-[20px] "
        >
          add todo
        </label>
        <input
          type="text"
          value={userInput}
          placeholder="enter task for today"
          onChange={(e) => setUserInput(e.target.value)}
          className="w-[60%] py-1 rounded-[5px] outline-none focus:border-blue-500 placeholder:pl-2 placeholder:text-[14px] "
        />
        {/* {userInput===''? <p className="text-red-800">enter task </p>: ''} */}
        <button
          type="submit"
          className="w-[40%] py-2 rounded-[5px] bg-[#646FF0] text-white capitalize cursor-pointer"
        >
          add task
        </button>
      </form>

      )}

      {todos.length < 1 ? (
        <p className="rounded-[5px] bg-[#f8f8ff] w-fit m-auto mt-5 text-[#646ff0] text-[20px] p-5 ">
          Let’s build your dreams one task at a time.
        </p>
      ) : (
        <TodoList todos={todos} onToggle={handleToggle} onDelete={deleteTodo} onSaveEdit={handleSaveEdit} />
      )}
    </>
  );
};

export default App;
