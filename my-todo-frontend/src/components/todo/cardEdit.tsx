
import { useState } from "react";
import TotalText from "./totalText";
import RemitText from "./remitText";
import { useMutation ,useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "motion/react"


interface CardEditProps {
    id:number;
    text:string;
    status:boolean;
    close: () => void;
}

export default function CardEdit({ id ,text ,status ,close }:CardEditProps ) {
    const [textEdit ,setTextEdit] = useState<string>(text)
    const changText = (e:React.ChangeEvent<HTMLInputElement> ) => {
        const value = e.target.value;
        if(value.length <= 50) {
            setTextEdit(value)
        }
    }
    const total = textEdit.length;
    const remit = 50 - total;
    const useClient = useQueryClient();

    const editContent = useMutation({
        mutationFn: async ({ id ,content ,status }:{ id:number ,content:string ,status:boolean }) => {
            const res = await axios.put(`https://my-todo-backend-lemon.vercel.app/todos/${id}`,{
                content:content ,
                status:status
            })
            return res
        },
        onSuccess:(data ,value) => {
            console.log('Update new Text from ',value.id,' --->',data)
            useClient.invalidateQueries({queryKey:["todos"]})
            close()
        }


    })

    return(
        <motion.div className=" fixed left-0 top-1/2 -translate-y-1/2 w-full h-full flex justify-center items-center bg-black/75 z-100 "
            key={id+2}
          initial={{opacity:0 ,scale:0.85  }}
          animate={{opacity:1 ,scale:1 }}
          exit={{opacity:0 ,scale:0.85 }}
          transition={{
            type: "spring" ,
            duration:0.3
          }}>

            <div className=" max-w-[570px] w-full h-auto px-5 py-2.5 flex flex-col gap-2 sm:gap-3 bg-white/90 dark:bg-[#111111] border dark:border-white/10 " >
                <div className="flex flex-col gap-2">
                    <h6 className=" text-2xl font-bold w-auto h-auto dark:white/90 ">Edit your message</h6>
                    <p className=" text-md text-black/50 dark:text-white/40 ">You can edit your new message here, up to 50 syllables long.</p>
                </div>


                <div className="w-full h-auto flex flex-row gap-2 ">
                    <input 
                    type="text" 
                    placeholder="edit your new message ..."
                    value={textEdit}
                    onChange={changText}
                    className="flex-1 border outline-none focus:dark:border-white/50 hover:bg-black/7 hover:dark:bg-amber-50/5 border-black/10 dark:border-white/15 placeholder-black/75 dark:placeholder-amber-50/75 cursor-pointer transition-all duration-300 px-4 py-2"
                    
                    />
                    <button
                    className="px-4 py-2  border dark:text-white/75 hover:bg-black/93 hover:text-white hover:dark:bg-white hover:dark:text-black hover:scale-105 border-black/10 dark:border-white/15 cursor-pointer transition-all duration-300"
                    onClick={ () => setTextEdit('') }
                    >
                    Clear
                    </button>
                </div>

                <div className=" w-full h-auto flex justify-between  ">
                    <TotalText total={total} />
                    <RemitText remit={remit} />
                </div>
                <button
                className=" sm:mt-3 px-4 py-2  border dark:text-white/75 hover:bg-black/93 hover:text-white hover:dark:bg-white hover:dark:text-black hover:scale-101 border-black/10 dark:border-white/15 cursor-pointer transition-all duration-300"
                onClick={ () => editContent.mutate({ id:id ,content:textEdit ,status:status }) }
                >
                Edit
                </button>
                <button className=" px-4 py-2 border dark:text-white/75 hover:bg-black/93 hover:text-white hover:dark:bg-white hover:dark:text-black hover:scale-101 border-black/10 dark:border-white/15 cursor-pointer transition-all duration-300 "
                onClick={close}
                >
                    Cancel
                </button>


            </div>

        </motion.div>
    );
}