import styled from '@mui/material/styles/styled'
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';

export const Button = styled(LoadingButton)({
    fontSize: '1em',
    padding: '0.5rem 1.5rem',
    maxWidth: '170px',
    fontWeight: 600,
    color: 'white',
    background: 'var(--brand)',
    boxShadow: '-5px 5px 10px var(--shadow)',
    border: 'none',
    cursor: 'pointer',
    transition: '0.2s',
    whiteSpace: 'nowrap',
    borderRadius: '5px',
    transition: '0.2s ease',
    '&:hover': {
        backgroundColor: 'hsl(221, 87%, 50%)',
        color: 'white',
        boxShadow: 'none',
    },
    // '&:active': {
    //     backgroundColor: '#0062cc',
    //     borderColor: '#005cbf',
    // },

});