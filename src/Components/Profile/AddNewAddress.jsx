import { Button, Divider, Grid, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useDatabase } from '../../Hooks/useDatabase';
import AlertBox from '../MUIComponents/AlertBox/AlertBox';
import { handleExceptions } from '../../Hooks/useExceptionHandler';
import { TextField } from '../MUIComponents/TextField';
import './styles.css'

function AddNewAddress({ open, close }) {
  const { addUserAddress } = useDatabase()
  const [error, setError] = useState(false)
  const isDefault = useRef(true)
  const isMounted = useRef(false)

  const name = useRef()
  const phoneNumber = useRef()
  const email = useRef()
  const pincode = useRef()
  const address1 = useRef()
  const address2 = useRef()
  const cdt = useRef()
  const state = useRef()

  const style = {
    fullWidth: true,
    size: 'medium',
    variant: 'filled',
    InputLabelProps: { shrink: true },
  }

  const mq_2rows = {
    xs: 12,
    md: 6
  }

  const handleSubmit = () => {
    setError(false)

    let id = new Date().getTime()
    const address = {
      id: id,
      name: name.current.value,
      phoneNumber: phoneNumber.current.value,
      email: email.current.value,
      pincode: pincode.current.value,
      address1: address1.current.value,
      address2: address2.current.value,
      cdt: cdt.current.value,
      state: state.current.value,
    }

    addUserAddress(address, isDefault)
      .then(() => close())
      .catch(error => {
        setError(handleExceptions(error))
      })
  }

  useEffect(() => {
    const addNewAddress = document.querySelector('#AddNewAddress')
    if (open) {
      addNewAddress.classList.add('expand')
      isMounted.current = true
      return
    }
    if (!isMounted.current) return
    addNewAddress.classList.add('shrink')
    isMounted.current = false

    return () => {
      addNewAddress.classList.remove('expand')
      addNewAddress.classList.remove('shrink')
    }
  }, [open])

  return (
    <div id='AddNewAddress'>
      <Grid container columnSpacing={5} pl={{ md: 2 }} rowSpacing={0.5} >
        <Grid item xs={12} ml={{ md: -2 }} mb={3}>
          <Typography variant='h5' fontWeight={800} color='#333'>Add Shipping Address</Typography>
        </Grid>
        <Grid item xs={12} mt={1} ml={2}>
          {(error.textField || error.email) && <AlertBox message={error.textField || error.email} />}
        </Grid>
        <Grid item {...mq_2rows}>
          <TextField
            error={error.textField && !name.current.value ? true : false}
            inputRef={name} label='NAME' {...style} />
        </Grid>
        <Grid item {...mq_2rows}>
          <TextField
            error={error.textField && !phoneNumber.current.value ? true : false}
            inputRef={phoneNumber} label='PHONE NUMBER' type='number' {...style} />
        </Grid>
        <Grid item {...mq_2rows}>
          <TextField
            error={((error.textField && !email.current.value) || error.email) ? true : false}
            inputRef={email} label='EMAIL ADDRESS' type='email' {...style} />
        </Grid>
        <Grid item {...mq_2rows}>
          <TextField
            error={error.textField && !pincode.current.value ? true : false}
            inputRef={pincode} label='PINCODE' type='number' {...style} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={error.textField && !address1.current.value ? true : false}
            inputRef={address1} sx={{ paddingTop: 3.3 }} multiline label='ADDRESS 1' {...style} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            inputRef={address2} sx={{ paddingTop: 3.3 }} multiline label='ADDRESS 2' {...style} />
        </Grid>
        <Grid item {...mq_2rows}>
          <TextField
            error={error.textField && !cdt.current.value ? true : false}
            inputRef={cdt} label='CITY/DISTRICT/TOWN' {...style} />
        </Grid>
        <Grid item {...mq_2rows}>
          <TextField
            error={error.textField && !state.current.value ? true : false}
            inputRef={state} label='STATE' {...style} />
        </Grid>
        <Grid item xs={12} mt={3}>
          <input onChange={(e) => isDefault.current = e.target.checked} defaultChecked style={{ transform: 'translateY(1.5px)', marginRight: 15 }} type="checkbox" id='default_address' />
          <label style={{ fontSize: '0.9rem' }} htmlFor="default_address">Set as default shipping address.</label>
        </Grid>
        <Grid item xs={6} mt={3}>
          <Button onClick={handleSubmit} size='large' fullWidth variant='contained'>ADD</Button>
        </Grid>
        <Grid item xs={6} mt={3}>
          <Button onClick={close} size='large' fullWidth variant='contained'>cancel</Button>
        </Grid>
      </Grid>
      <Divider sx={{ paddingTop: 5 }} />
    </div>
  )
}

export default AddNewAddress