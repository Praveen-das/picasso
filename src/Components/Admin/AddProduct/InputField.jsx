import { Grid, TextField } from '@mui/material'
import React from 'react'

function InputField({ label, onChange, rows, xs, md, value,required }) {

    return (
        <>
            <Grid item xs={xs} md={md}>
                <TextField
                    required={required}
                    label={label}
                    multiline
                    rows={rows}
                    value={value}
                    variant='outlined'
                    onChange={(e) => onChange(e)}
                    fullWidth
                    size='small'
                ></TextField>
            </Grid>
        </>
    )
}

export default InputField
