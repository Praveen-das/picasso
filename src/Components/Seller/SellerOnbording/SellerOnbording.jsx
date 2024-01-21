import { Box, Button, Checkbox, Container, FormControlLabel, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import TextField from '../../Ui/TextField'
import { Form, Formik } from 'formik'
import { accountDetailsSchema } from '../../../Schema/userSchema'
import { createLinkedAccount } from '../../../Services/rzp.api'
import success from '../../../Assets/success.gif'

import '../style.css'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton'

function SellerOnbording() {
  const [step, setStep] = useState(0)
  const [email, setEmail] = useState('')

  return (
    <Container maxWidth='sm'>
      <Box
        sx={{
          boxShadow: '0 10px 10px 5px var(--brandLight)',
          borderRadius: '20px',
          position: 'relative',
          width: '100%',
        }}
      >
        <Onboarding
          active={step === 0}
          callback={(value) => {
            setEmail(value)
            setStep(1)
          }}
        />
        <SellerOnbordingSuccess
          data={email}
          active={step === 1}
          callback={() => setStep(0)}
        />
      </Box>
    </Container>
  )
}


function SellerOnbordingSuccess({ active, callback, data: email }) {
  const ref = useRef()
  const navigate = useNavigate()

  return (
    <CSSTransition nodeRef={ref} className='onboarding' in={active} timeout={1000} >
      <div ref={ref}>
        <Typography variant='h5'>CONGRATULATIONS</Typography>
        <img width={200} height={200} src={success} alt="" />
        <Typography>
          Your are successfully connected to Razorpay payment gateway.
          Your Razorpay dashboard will get activated within 24 hours and a confirmation mail will be sent to your email <span className='emailid'>{email}</span>. Thank you.
        </Typography>
        <Button onClick={() => {
          navigate("/dashboard")
          callback()
        }} sx={{ mt: 4 }} variant='contained' size='large'>Dashboard</Button>
      </div>
    </CSSTransition>
  )
}

function Onboarding({ active, callback }) {
  const ref = useRef()
  const queryClient = useQueryClient()

  async function handleSubmit(payload, { setSubmitting, setFieldError }) {

    const data = {
      "name": payload.name,
      "email": payload.email,
      "tnc_accepted": payload.tnc_accepted,
      "account_details": {
        "business_name": "Acme Corporation",
        "business_type": "individual"
      },
      "bank_account": {
        "ifsc_code": payload.ifsc_code,
        "beneficiary_name": payload.name,
        "account_number": payload.account_number,
      },
    }

    await createLinkedAccount(data)
      .then((res) => {
        queryClient.invalidateQueries(["currentUser"])
        callback(data?.email)
      })
      .catch((err) => {
        console.log('error---->', err.response.data.error.description)
        setFieldError('email', err.response.data.error.description)
      })

    setSubmitting(false)
  }

  return (
    <CSSTransition nodeRef={ref} className='onboardingConfirmation' in={active} timeout={1000} >
      <div ref={ref} >
        <Formik
          initialValues={{
            name: '',
            email: '',
            account_number: '',
            ifsc_code: '',
            tnc_accepted: false,
          }}
          validationSchema={accountDetailsSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, handleChange, handleBlur, setFieldError }) => (
            <Form>
              <Box
                sx={{
                  display: 'grid',
                  gap: 4
                }}
              >
                <Typography variant='h5'>SELLER ONBOARDING</Typography>
                <Box>
                  <a className='razorpay_logo' href="https://razorpay.com/" target="_blank" rel="noreferrer" >
                    <img referrerPolicy="origin" src="https://badges.razorpay.com/badge-light.png " style={{ height: '45px', width: '113px' }} alt="Razorpay | Payment Gateway | Neobank" />
                  </a>
                </Box>
                <Typography sx={{ mt: -2, mb: 2 }}>Create a payout account for receiving payments.</Typography>
                <TextField
                  name='name'
                  label='Name'
                  error={touched.name && Boolean(errors.name) && errors.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextField
                  name='email'
                  label='Email'
                  error={touched.email && Boolean(errors.email) && errors.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextField
                  name='account_number'
                  label='Account Number'
                  error={touched.account_number && Boolean(errors.account_number) && errors.account_number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextField
                  name='ifsc_code'
                  label='IFSC Code'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.ifsc_code && Boolean(errors.ifsc_code) && errors.ifsc_code}
                />
                <FormControlLabel
                  name='tnc_accepted'
                  label='I Agree to the terms and conditions.'
                  required
                  onChange={handleChange}
                  control={<Checkbox size='small' />}
                />
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,

                  }}
                >
                  <Button fullWidth size='large' >Skip</Button>
                  <LoadingButton loading={isSubmitting} fullWidth type='submit' variant='contained' size='large'>Proceed</LoadingButton>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </div>
    </CSSTransition >
  )
}

export default SellerOnbording