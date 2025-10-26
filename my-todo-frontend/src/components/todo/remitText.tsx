

import clsx from "clsx";

export default function RemitText({ remit }:{ remit:number }) {

    return(
        <span
            className={clsx('px-2 py-1 border transition-all duration-300 ' 
            , remit <= 15 ? "text-red-700 border-red-700 bg-red-500/25 hover:bg-red-500/5 " : "hover:bg-black/5 hover:dark:bg-white/5"
            )}
        >
            Remaining: {remit}
        </span>
    );
}