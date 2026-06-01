"use client"

import { useState } from "react"



function WarningTag() {
 const warning = "waiting for database supabase" || " "
 const [checkWarning,setCheckWarning] = useState(false)
  
 return(
  <div className="flex flex-col items-center justify-center  ">

    {checkWarning && <button className="flex items-center justify-center border dark:border-white/75 dark:bg-white/15 dark:text-white/75 hover:dark:bg-white/90
                       border-amber-50/75 bg-amber-50/15 text-black transition-all duration-300 cursor-normal "
                       
                       >
    {warning}
  </button>}
    
  </div>

   )



  
  
}
