import { writable } from "svelte/store"

export const createLsStore = (key: string, defaultValue?: string) => {
    const value: string = localStorage.getItem(key) || defaultValue || "";
    const { set, subscribe } = writable(value);
    localStorage.setItem(key, value);
    const setValue = (value: string) => {
        set(value);
        localStorage.setItem(key, value);
    }

    return {
        subscribe,
        set: setValue
    }

}
