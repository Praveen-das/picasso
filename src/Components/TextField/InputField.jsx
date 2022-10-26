import { Grid, TextField } from '@mui/material'
import react from 'react'

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
