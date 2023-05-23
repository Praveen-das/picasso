import TField from '@mui/material/TextField';
import styled from '@mui/material/styles/styled';

const TextField = styled(TField)({
    '& label': {
        fontWeight: 600,
        fontSize: 18,
        color: '#444',
    },
    '& .MuiFilledInput-root': {
        paddingTop: '5px',
        color: 'var(--brand)',
        fontSize: '18px',
        '&::before': {
            border: 'none',
        },
        '&:hover::before': {
            border: 'none',
        },
    },
});

export default TextField
