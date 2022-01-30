import { Grid, TextField } from '@mui/material'
import React from 'react'

function CustomTextField(props) {
    return (
        <>
            <Grid item xs={props.xs} md={props.md} >
                <TextField
                    error={props.error && props.error}
                    type={props.type}
                    sx={props.sx}
                    label={props.label}
                    required={props.required}
                    multiline
                    rows={props.rows}
                    value={props.value}
                    size={props.size ? props.size : 'small'}
                    variant='standard'
                    onChange={(e) => props.onChange(e)}
                    fullWidth
                    helperText={props.helperText && props.helperText}
                ></TextField>
            </Grid>
        </>
    )
}

export default CustomTextField
