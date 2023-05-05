import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { createContext, useContext, useEffect } from 'react'
import gsap from 'gsap';
import scrollTrigger from 'gsap/ScrollTrigger';

export function useHelper() {
    return useContext(ContextProvider)
}

const ContextProvider = createContext()

export default function HelperContext({ children }) {
    var brand = getComputedStyle(document.body).getPropertyValue('--brand').replaceAll(/\s/g, '')

    const theme = createTheme({
        root: {
            marginTop: 0,
            height: 0,
        },
        typography: {
            fontFamily: 'Montserrat',
            h10: {
                fontSize: '0.9rem',
                fontWeight: 500,
            },
            caption2: {
                fontSize: '0.9rem',
                fontWeight: 400,
                color:'grey'
            },
            // h5: {
            //     fontWeight: 700,
            // },
            // h4: {
            //     fontWeight: 600,
            // },
            // subtitle2: {
            //     fontSize: 13,
            //     fontWeight: 600,
            //     color: 'hsl(0, 0%, 30%)'
            // }
        },
        palette: {
            primary: {
                main: brand,
                dark: '#1a71e4',
                contrastText: '#fff',
            },
            secondary: {
                main: '#fff',
                dark: '#1a71e4',
                contrastText: brand
            }
        }
    });

    // const WhiteButton = styled(Button)(({ theme }) => ({
    //     color: theme.palette.getContrastText('#fff'),
    //     backgroundColor: '#fff',
    //     '&:hover': {
    //         backgroundColor: '#999',
    //     },
    //     padding:'7px 2rem',
    //     fontSize:'1rem',
    //     borderRadius:'50px',
    //     boxShadow: 'inset 2px 2px 5px 0px var(--shadow)'
    // }));

    const ScrollTrigger = (elements, options, actions) => {
        useEffect(() => {
            gsap.registerPlugin(scrollTrigger)
            gsap.timeline({
                scrollTrigger: actions
            }).from(elements, options)
        }, [elements, options, actions])
    }

    const value = {
        theme,
        ScrollTrigger,
        // WhiteButton
    }


    return (
        <ContextProvider.Provider value={value}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ContextProvider.Provider >
    )
}
