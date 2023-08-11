import styled from '@emotion/styled';
import { Box, Tab, Tabs } from '@mui/material'

export function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <>
            {value === index && (
                <Box
                    sx={{
                        position: 'relative',
                        height: '100%',
                        // boxShadow: { xs: 'none', lg: '-5px -2px 30px -4px var(--neu)' },
                        flex: { xs: '1 1 100%', lg: '1 1 0' },
                    }}
                    {...other}
                >
                    {children}
                </Box>
            )}
        </>
    );
}

export const Item = styled(Box)
    (({ theme }) => ({
        ...theme.typography.body2,
        boxSizing: 'border-box',
        height: '100%',
        position: 'relative',
        color: theme.palette.text.primary,
        padding: '0.3rem 2rem',
    }));


export const StyledTabs = styled(Tabs)({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        zIndex: -1,
        width: '100%',
        backgroundColor: 'var(--brand)',
        borderRadius: 20,
    }
});

export const StyledTab = styled(Tab)(
    () => ({
        borderRadius: 20,
        height: 40,
        transition: 'color 0.5s',
        '&.Mui-selected': {
            color: '#fff',
        },
        '&.Mui-focusVisible': {
            background: 'red'
        },
    }),
);

export const tabStyling = {
    sx: { minHeight: 50, justifyContent: 'left', gap: 0.5,px:4 }, iconPosition: 'start'
}



