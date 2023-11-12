import { ThemeProvider, createTheme } from "@mui/material";

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
            heading: {
                fontSize: 36,
                // fontFamily: 'Montserrat',
                position: 'relative',
                fontWeight: 800,
                textTransform:'capitalize'
            },
            heading2: {
                // fontFamily: 'Montserrat',
                fontSize: 24,
                fontWeight: 600
            },
            desc: {
                lineHeight: 2,
                fontSize: 18,
                fontWeight: 500
            },
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
                fontSize: 15,
                fontWeight: 500,
            },
            caption2: {
                fontSize: '0.9rem',
                fontWeight: 400,
                color: 'grey'
            },
            tabTitle: {
                fontSize: 35,
                fontWeight: 500,
                color: "black"
            }
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
                    elevation: 0,
                    TransitionProps: { unmountOnExit: true }
                },
                styleOverrides: {
                    root: {
                        ":before": {
                            opacity: '1 !important',
                        },
                    },
                },
                variants: [{
                    props: { className: 'noPadding' },
                    style: {
                        ".MuiAccordionDetails-root": {
                            padding: 0,
                            marginInline: 0
                        },
                        ".MuiAccordionSummary-root": {
                            padding: 0
                        },
                    }
                }]
            },
            MuiAccordionDetails: {
                styleOverrides: {
                    root: {
                        marginInline: 20,
                        marginBottom: 20
                    }
                }
            },
            MuiTypography: {
                variants: [{
                    props: {
                        className: 'noWrapLine',
                    },
                    style: {
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 5,
                        WebkitBoxOrient: "vertical"
                    }
                }]
            },
        },

    });

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}