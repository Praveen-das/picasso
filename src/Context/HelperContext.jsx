import { createContext, useContext, useEffect } from 'react'
import gsap from 'gsap';
import scrollTrigger from 'gsap/ScrollTrigger';

export function useHelper() {
    return useContext(ContextProvider)
}

const ContextProvider = createContext()

export default function HelperContext({ children }) {

    const ScrollTrigger = (elements, options, actions) => {
        useEffect(() => {
            gsap.registerPlugin(scrollTrigger)
            gsap.timeline({
                scrollTrigger: actions
            }).from(elements, options)
        }, [elements, options, actions])
    }

    const value = {
        ScrollTrigger,
        // WhiteButton
    }


    return (
        <ContextProvider.Provider value={value}>
            {children}
        </ContextProvider.Provider >
    )
}
