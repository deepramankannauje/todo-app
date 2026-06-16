import { useState } from "react";

export default function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (!task.trim()) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: task,
        completed: false,
      },
    ]);

    setTask("");
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const totalTasks = todos.length;
  const completedTasks = todos.filter(
    (todo) => todo.completed
  ).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-start pt-10 px-4">
      <div
        className="
          w-full
          max-w-md
          p-6
          rounded-3xl
          bg-white/10
          backdrop-blur-xl
          border
          border-white/20
          shadow-2xl
        "
      >
        <h1 className="text-4xl font-bold text-white text-center mb-6">
          ✨ Todo App
        </h1>

        {/* Stats */}
        <div className="flex justify-between mb-4 text-white font-medium text-sm">
          <span>Total: {totalTasks}</span>
          <span>Done: {completedTasks}</span>
          <span>Left: {pendingTasks}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-3 mb-6 overflow-hidden">
          <div
            className="h-3 bg-green-400 rounded-full transition-all duration-500"
            style={{
              width: `${
                totalTasks
                  ? (completedTasks / totalTasks) * 100
                  : 0
              }%`,
            }}
          />
        </div>

        {/* Input */}
        <div className="flex gap-2 mb-5">
          <input
            type="text"
            placeholder="Enter a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTodo();
            }}
            className="
              flex-1
              px-4
              py-3
              bg-white/20
              border
              border-white/20
              rounded-xl
              text-white
              placeholder-white/70
              backdrop-blur-md
              focus:outline-none
            "
          />

          <button
            onClick={addTodo}
            className="
              px-5
              py-3
              bg-white/20
              text-white
              rounded-xl
              border
              border-white/20
              backdrop-blur-md
              hover:scale-105
              transition
            "
          >
            Add
          </button>
        </div>

        {/* Empty State */}
        {todos.length === 0 && (
          <div className="text-center text-white/70 py-6">
            No tasks yet 🚀
          </div>
        )}

        {/* Todo List */}
        <ol className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="
                bg-white/10
                border
                border-white/20
                backdrop-blur-md
                p-4
                rounded-xl
                flex
                items-center
                justify-between
                text-white
              "
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  className="w-5 h-5"
                />

                <span
                  className={
                    todo.completed
                      ? "line-through text-white/50"
                      : "text-white"
                  }
                >
                  {todo.text}
                </span>
              </div>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="
                  px-3
                  py-1
                  bg-red-500/30
                  border
                  border-red-300/20
                  rounded-lg
                  hover:bg-red-500/50
                  transition
                "
              >
                Delete
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}