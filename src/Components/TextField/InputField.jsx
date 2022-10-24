import { Grid, IconButton, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import React from 'react'

function CustomTextField({ xs, md, error, size, helperText, ...rest }) {
    return (
        <>
            <Grid item xs={xs} md={md} >
                <TextField
                    error={error && error}
                    size={size ? size : 'small'}
                    helperText={helperText && helperText}
                    {...rest}
                    multiline
                    variant='standard'
                    fullWidth
                    // InputProps={{
                    //     endAdornment: <IconButton size='small'><RefreshIcon fontSize='10px' /></IconButton>
                    // }}
                ></TextField>
            </Grid>
        </>
    )
}

export default CustomTextField
