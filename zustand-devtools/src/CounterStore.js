import {create} from "zustand";
import {devtools} from "zustand/middleware";

export const useCounterStore = create(
    devtools(
        (set)=>({
            count:0,
            increase: ()=>set((state)=>({count:state.count +1})),
        })
    )
);