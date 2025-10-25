"use client";
import { useState } from "react";
import clsx from "clsx";


export default function FormTodo() {
  const [task, setTask] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length <= 50) {
      setTask(value);
    }
  };

  const total = task.length;
  const remit = 50 - total;

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
        >
          Add
        </button>
      </span>

      <div className="flex w-full max-w-[550px] items-center justify-between font-semibold">
        <span className={clsx("px-2 py-1 border hover:bg-black/5 hover:dark:bg-white/5 transition-all duration-300"
            , total <= 25 && total >= 1 ? "text-green-700 border-freen-700 bg-green-500/25" : "hover:bg-black/5 hover:dark:bg-white/5"
        )}>
          Total Characters: {total}
        </span>
        <span
          className={clsx('px-2 py-1 border transition-all duration-300 ' 
            , remit <= 5 ? "text-red-700 border-red-700 bg-red-500/25 hover:bg-red-500/5 " : "hover:bg-black/5 hover:dark:bg-white/5"
          )}
        >
          Remaining: {remit}
        </span>
      </div>
    </div>
  );
}
