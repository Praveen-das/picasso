import create from "zustand";
import getDataFromDB from "./Slices/AdminData";
import { authListener } from "./Slices/AuthListener";
import { devtools } from 'zustand/middleware'
import produce from 'immer'

const store = (set) => (
    {
        model: {
            toggle: false
        },
        alert: {
            message: '',
            toggled: false,
            type: 'success',
            time: undefined
        },
        auth: {
            user: undefined,
            status: 'NOT_INITIALIZED',
            error: null,
        },
        form: { error: { global: undefined } },
        edit: { name: false, username: false, email: false },
        ...authListener(set),
        getDataFromDB: (arg, next, uid) => getDataFromDB(arg, next, uid),
        set: (fn) => set(produce(fn))
    }
)

export const useStore = create(devtools(store))

