
import clsx from "clsx"

export default function TotalText({ total }:{ total:number }) {

    return(
        <span className={clsx("px-2 py-1 border hover:bg-black/5 hover:dark:bg-white/5 transition-all duration-300"
            , total <= 25 && total >= 1 ? "text-green-700 border-freen-700 bg-green-500/25" : "hover:bg-black/5 hover:dark:bg-white/5"
        )}>
            Total Characters: {total}
        </span>
    )
}