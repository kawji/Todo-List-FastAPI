"use client";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import TotalText from "./totalText";
import RemitText from "./remitText";

export interface TodoItem {
  id: number;
  content: string;
  status: boolean;
} 

export default function FormTodo() {
  const queryClient = useQueryClient();
  const [task, setTask] = useState<string>("");



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length <= 50) {
      setTask(value);
    }
  };

  const total = task.length;
  const remit = 50 - total;


  // ---------------- set fetch api ----------

  const addTodo = useMutation({
    mutationFn: async (newTask: string) => {
      const res = await axios.post("https://my-todo-backend-d8n9i0o5l-kawjis-projects.vercel.app/todos", {
        content: newTask,
        status: false,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setTask("");
    },
  });

  const handleAdd = () => {
    if (task.trim()) {
      addTodo.mutate(task);
    }
  };

  return (
    <div className="max-w-[550px] w-full flex flex-col justify-center items-center gap-4 py-8 border-b border-b-black/7 dark:border-b-white/10">
      <span className="max-w-[550px] w-full flex items-center justify-center gap-2">
        <input
          type="text"
          placeholder="Add a new task ..."
          value={task}
          onChange={handleChange}
          className="flex-1 border outline-none focus:dark:border-white/50 hover:bg-black/7 hover:dark:bg-amber-50/5 border-black/10 dark:border-white/15 placeholder-black/75 dark:placeholder-amber-50/75 cursor-pointer transition-all duration-300 px-4 py-2"
        />
        <button
          className="px-4 py-2 border dark:text-white/75 hover:bg-black/93 hover:text-white hover:dark:bg-white hover:dark:text-black hover:scale-105 border-black/10 dark:border-white/15 cursor-pointer transition-all duration-300"
          disabled={!task.trim()}
          onClick={ handleAdd }
        >
          Add
        </button>
      </span>

      <div className="flex w-full max-w-[550px] items-center justify-between font-semibold">
        <TotalText total={total} />
        <RemitText remit={remit} />
      </div>
    </div>
  );
}
