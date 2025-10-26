"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TodoItem } from "@/components/todo/formtodo";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import FormTodo from "@/components/todo/formtodo";
import CardDo from "@/components/todo/carddo";

import { AnimatePresence ,motion } from "motion/react"


export default function Home() {
  const { data: todos, isLoading } = useQuery<TodoItem[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await axios.get('http://127.0.0.1:8000/todos');
      return res.data;
    },
  });

  console.log('dataaaaaaa --> ',todos)

  return (
    <main className="min-h-screen font-sans flex flex-col px-2 md:px-8 pb-10 gap-8 items-center justify-start bg-white dark:bg-black transition-colors duration-300">

      <div className="w-full h-auto mt-25 flex justify-center items-center ">
        <h1 className=" text-6xl font-black tracking-wide text-center px-3 py-1.5 border dark:border-white/8 border-black/5 hover:dark:bg-white/93 hover:dark:text-black hover:bg-black hover:text-white transition-all duration-300   ">
          My Todo List
        </h1>
      </div>
      <div className="w-full h-auto flex flex-col justify-center items-center   ">
        <FormTodo />
      </div>
      <AnimatePresence mode="wait">
        <div className=" flex flex-col max-w-[550px] w-full h-auto gap-5 md:gap-4 px-x ">
          {todos?.slice().sort((a, b) => Number(a.status) - Number(b.status)).map((i) => (
              <CardDo key={i.id} id={i.id} text={i.content} status={i.status} />
            ))}
        </div>

      </AnimatePresence>


 
      <div className=" fixed z-99 bottom-7 left-1/2 -translate-x-1/2 w-auto h-auto px-4 py-2 border dark:bg-black bg-white border-black/10 dark:border-white/15 rounded-full ">
        <AnimatedThemeToggler className="p-3 rounded-full border border-gray-400/75 dark:border-white/15 " />
      </div>
    </main>
  );
}
