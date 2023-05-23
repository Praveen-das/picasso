import { ThemeProvider, createTheme } from "@mui/material";
import { amber } from "@mui/material/colors";

export function MUIContext({ children }) {
    var brand = getComputedStyle(document.body).getPropertyValue('--brand').replaceAll(/\s/g, '')
    var brandDark = getComputedStyle(document.body).getPropertyValue('--brandDark').replaceAll(/\s/g, '')

    const theme = createTheme({
        root: {
            marginTop: 0,
            height: 0,
        },
        typography: {
            fontFamily: 'Montserrat',
            // allVariants:{
            //     color:'var(--brandMain)'
            // },
            'title.primary': {
                fontSize: 16,
                fontWeight: 700,
                textTransform: 'capitalize'
            },
            'text.grey': {
                fontSize: 15,
                color: 'GrayText',
                fontWeight: 400,
                textTransform: 'capitalize'
            },
            'title.main': {
                fontSize: 18,
                textTransform: 'uppercase',
            },
            'paragraph': {
                fontSize: 16,
                variant: 'subtitle2',
                lineHeight: 1.8,
                fontWeight: 500
            },
            h10: {
                fontWeight: 500,
            },
            caption2: {
                fontSize: '0.9rem',
                fontWeight: 400,
                color: 'grey'
            },

        },
        palette: {
            primary: {
                main: brand,
                dark: brandDark,
                contrastText: '#fff',
            },
            secondary: {
                main: '#fff',
                dark: '#1a71e4',
                contrastText: brand
            },
            facebook: {
                main: 'hsl(220.65deg 44.08% 41.37%)',
                dark: 'hsl(220.65deg 44.08% 31.37%)',
                contrastText: 'white'
            },
            instagram: {
                main: 'hsl(11, 90%, 61%)',
                dark: 'hsl(11, 90%, 51%)',
                contrastText: 'white'
            },
            twitter: {
                main: 'hsl(203, 89%, 53%)',
                dark: 'hsl(203, 89%, 43%)',
                contrastText: 'white'
            },
            linkedIn: {
                main: 'hsl(201, 100%, 35%)',
                dark: 'hsl(201, 100%, 25%)',
                contrastText: 'white'
            },
        },
        components: {
            MuiButton: {
                defaultProps: {
                    disableElevation: true
                },
                styleOverrides: {
                    root: {
                        borderRadius: 10,
                        // ...( ownerState.variant === 'outlined' &&
                        // {
                        // border: 'none !important',
                        // background: 'var(--brandLight50)',
                        // color: 'var(--brand)',
                        // ":hover": { background: 'var(--brandLight100)' },
                        // ".MuiTouchRipple-root .MuiTouchRipple-child": { background: 'white' }
                        // }),
                    },
                },

            },
            MuiAccordion: {
                defaultProps: {
                    disableGutters: true,
                    // TransitionProps: { unmountOnExit: true }
                },
                styleOverrides: {
                    root: {
                        ":before": {
                            opacity: '1 !important',
                        },
                    },
                }
            },
            MuiAccordionDetails: {
                styleOverrides: {
                    root: {
                        marginInline: 20,
                        marginBottom: 20
                    }
                }
            },
        },

    });

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}