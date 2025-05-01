import React, { useState, useEffect } from "react";
import { Todo } from "./types/todo";
import TodoList from "./components/TodoList.tsx";
// import TodoItems from "./components/TodoItems";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import { v4 as uuidv4 } from "uuid";
import { useNotifications } from "./hooks/useNotifications.ts";

initializeIcons();

// type todos = {
//   todoArray:Todo[]
// }

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  useNotifications(todos);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [addTask, setAddTask] = useState(false);
  const [taskPriority, setTaskPriority] = useState<"high" | "medium" | "low">(
    "medium"
  );
  const [displayPriority, setDisplayPriority] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const[taskOrder, setTaskOrder] = useState<'all'|'incomplete'|'completed'>('all')
  // const [filterTodos, setFilterTodos] = useState([])

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
      // console.log("Saving to localStorage:", todos);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, loading]);

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(userInput);
    if (!userInput.trim()) {
      return;
    }

    if (userInput.length >= 1) {
      console.log("greater");
      setDisplayPriority(true);
    }
    console.log("taskPriority:", taskPriority);
    // setDisplayPriority(true)

    const newTodos: Todo = {
      id: uuidv4(),
      title: userInput,
      completed: false,
      priority: taskPriority,
      dueDate: dueDate,
    };

    setTodos((prevTodos) => [...prevTodos, newTodos]);
    // const updatedTodos = [...todos, newTodos];
    // setTodos(updatedTodos)
    console.log(newTodos);
    // localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setUserInput("");
    setDisplayPriority(false);
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

  const handleSaveEdit = (id: string, newTitle: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    );
    setTodos(updatedTodos);
  };

  const HandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);

    if (value.trim().length >= 1) {
      setDisplayPriority(true);
    } else {
      setDisplayPriority(false);
    }
  };

  const addTaskBtn = () => {
    console.log("red");
    setDisplayPriority(true);
    // setAddTask(false)
  };

  const filteredTodos = todos
    .filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter((todo)=> {
    if(taskOrder === 'all') return todo;
    if(taskOrder === 'incomplete') return !todo.completed ;
    if(taskOrder === 'completed') return todo.completed
  })
    .sort((a, b) => {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return (
        priorityOrder[a.priority || "low"] - priorityOrder[b.priority || "low"]
      );
    });

  return (
    <>
      <div className="pb-20">
        <div className="uppercase text-[40px] font-bold text-[#646ff0]  w-[50%] m-auto text-center pt-5">
          task manager
        </div>
        <div className="w-[50%] m-auto flex mt-2 justify-between">
          <button
            className="bg-[#646ff0] px-5 rounded-[5px] text-white cursor-pointer outline-none "
            onClick={() => setAddTask(!addTask)}
          >
            add task
          </button>
          <select
            name=""
            value={taskOrder}
            id=""
            className="bg-[#cccdde] rounded p-2 outline-none"
            onChange={(e)=>setTaskOrder(e.target.value as 'all'|'incomplete'|'completed')}
          >
            <option value="all">all</option>
            <option value="incomplete">incomplete</option>
            <option value="completed">completed</option>
          </select>
        </div>
        {addTask && (
          <form
            action=""
            onSubmit={handleForm}
            className="w-[50%] h-[220px] m-auto mt-10 pl-12 py-5 rounded-[5px] bg-[#CCCDDE] flex flex-col gap-y-3  relative "
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
              onChange={HandleInputChange}
              className="w-[60%] py-1 rounded-[5px] outline-none focus:border-blue-500 placeholder:pl-2 placeholder:text-[14px] "
            />
            <div className="flex gap-x-2 items-center">
              <p className="text-[#646FF0] capitalize">due date: </p>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="border w-fit rounded p-2"
              />
            </div>

            {/* {userInput===''? <p className="text-red-800">enter task </p>: ''} */}
            <button
              type="submit"
              className="w-[40%] py-2 rounded-[5px] bg-[#646FF0] text-white capitalize cursor-pointer"
              onClick={addTaskBtn}
            >
              add task
            </button>
          </form>
        )}
        {todos.length < 1 ? (
          <p className="rounded-[5px] bg-[#f8f8ff] w-fit m-auto mt-5 text-[#646ff0] text-[20px] p-5 ">
            Let&apos;s build your dreams one task at a time.
          </p>
        ) : (
          <TodoList
            todos={filteredTodos}
            onToggle={handleToggle}
            onDelete={deleteTodo}
            onSaveEdit={handleSaveEdit}
            dueDate={dueDate}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}

        {/* priority form */}
        {displayPriority ? (
          <select
            name=""
            id=""
            value={taskPriority}
            onChange={(e) =>
              setTaskPriority(e.target.value as "low" | "medium" | "high")
            }
            className="border px-4 py-1 absolute top-[280px] md:top-[275px] left-[420px] md:left-[620px] rounded"
          >
            <option value="high">high</option>
            <option value="medium">medium</option>
            <option value="low">low</option>
          </select>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default App;
