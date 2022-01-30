import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import React, { createContext, useContext } from 'react'

export function useHelper() {
    return useContext(ContextProvider)
}

const ContextProvider = createContext()

export default function HelperContext({ children }) {

    var brand = getComputedStyle(document.body).getPropertyValue('--brand').replaceAll(/\s/g, '')

    const theme = createTheme({
        typography: {
            fontFamily: 'Montserrat',
            h6: {
                fontSize: 14,
                fontWeight: 600,
            },
            h5: {
                fontWeight: 700,
            },
            h4: {
                fontWeight: 600,
            },
            subtitle2: {
                fontSize: 13,
                fontWeight: 600,
                color: 'hsl(0, 0%, 30%)'
            }
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


    const value = {
        theme
    }
    return (
        <ContextProvider.Provider value={value}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ContextProvider.Provider>
    )
}
