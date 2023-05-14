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
            }
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: ({ ownerState }) => ({
                        ...(ownerState.variant === 'outlined' &&
                        {
                            borderRadius: 10,
                            border: 'none !important',
                            background: 'var(--brandLight50)',
                            color: 'var(--brand)',
                            ":hover": { background: 'var(--brandLight100)' },
                            ".MuiTouchRipple-root .MuiTouchRipple-child": { background: 'white' }
                        }),
                        
                    }),
                },

            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}