'use client'
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Eraser ,Pencil ,CircleQuestionMark ,Star  } from 'lucide-react';
import clsx from "clsx";
import CardEdit from "./cardEdit";
import { AnimatePresence ,motion } from "motion/react"

type CardDoProps = {
  id:number
  text:string;
  status:boolean;
}

export default function CardDo({ id ,text, status }:CardDoProps) {
    const queryClient = useQueryClient();
    const [cardEdit ,setCardEdit] = useState<boolean>(false)

  const deleteTodo = useMutation({
    mutationFn: async (id: number) => {
      const res = await axios.delete(`https://postgres-todo-ten.vercel.app/todos/${id}`);
      return res.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });


    },
  });

    const updateTodo = useMutation({
      mutationFn: async (id:number ) => {
        const res = await axios.put(`https://postgres-todo-ten.vercel.app/todos/${id}`,{
          content:text ,
          status:!status
        })
        return res.data
      },
      onSuccess:(data) => {
          queryClient.invalidateQueries({queryKey:["todos"]})

        }


    })


    return(
        <motion.div className="flex w-full h-auto items-center gap-2 flex-col md:flex-row  " 
          key={id+2}
          initial={{opacity:0 ,y:10  }}
          animate={{opacity:1 ,y:0 }}
          exit={{opacity:0 ,y:-10  }}
          transition={{
            type: "spring" ,
            duration:0.5
          }}
        >
          <div className={clsx("flex-1 flex  text-left w-full gap-2 pl-4 pr-6 py-2 border cursor-pointer transition-all duration-300  ",
          "min-w-[200px] text-center items-center"
            ,status? " text-green-600 bg-green-500/25 border-green-600 dark:border-green-700 hover:bg-green-500/35  ":"  hover:dark:border-white/25  dark:text-white/75 hover:bg-black/7 hover:dark:bg-amber-50/5 hover:dark:text-white border-black/10 dark:border-white/15  "
          )}
          onClick={()=>  updateTodo.mutate(id)  }
          >
            {status? <Star width={22} className="shrink-0" /> : <CircleQuestionMark width={22}  className="shrink-0" />}
            <p className="w-full h-auto wrap-break-word text-left">
                {text}
            </p>
          </div>
          <div className="flex w-full md:w-auto ">
            <div className=" flex justify-center items-center flex-1 md:flex-auto w-auto h-auto px-2 py-2 border dark:border-white/10 border-black/10 cursor-pointer hover:bg-blue-500/25 hover:text-blue-700 transition-all "
              onClick={() => setCardEdit(true)}
            >
              <Pencil />
            </div>
            <div className=" flex justify-center items-center flex-1 md:flex-auto w-auto h-auto px-2 py-2 border dark:border-white/10 border-black/10 cursor-pointer hover:bg-red-500/25 hover:text-red-700 transition-all "
              onClick={() => deleteTodo.mutate(id)}
            >
                <Eraser />
            </div>
          </div>
          <AnimatePresence mode="wait">
              { cardEdit && <CardEdit id={id} text={text} status={status} close={ ()=> setCardEdit(false) } />}

          </AnimatePresence>


        </motion.div>

    )
}