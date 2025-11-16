import {create} from "zustand";
import {persist} from "zustand/middleware";

export const useAuthStore = create(
    persist(
        (set)=>({
    user: null,
    login: (name)=>set({user:{name}}),
    logout: ()=>set({user:null}),
}),
{
    name: "auth-storage",

}
));
