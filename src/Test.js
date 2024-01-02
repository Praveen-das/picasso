import React, { createContext, useContext, useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import './test.css'

import styled from '@emotion/styled';

const StyledBox = styled(({ className, ...props }) => (<Box  {...props} className={className + ' light'} />))({
  width: 200,
  height: 100,
  position: 'relative',
  background: 'hsla(0, 0%, 10%)',
  overflow: 'hidden',
  padding: 2,
  borderRadius: '10px',
  boxSizing: 'border-box',
  zIndex: 1,
  "::after": {
    content: "''",
    position: 'absolute',
    inset: 2,
    borderRadius: '10px',
    background: 'hsla(0, 0%, 10%)',
    zIndex: 3,
  },

  //glossy edge
  "::before": {
    content: "''",
    position: 'absolute',
    inset: 0,
    zIndex: 2,
    filter: 'blur(5px)',
    background: `
      radial-gradient(
        circle at var(--X, 0) var(--Y, 0), 
        hsl(70deg 100% 50%),
        transparent 200px
        )`,
    backgroundAttachment: 'fixed',
  },
  ":hover::after": {
    background: `
      radial-gradient(
        circle at var(--X, 0) var(--Y, 0), 
        hsl(70deg 20% 10%) 0%,
        hsla(0, 0%, 10%) 400px
        )`,
    backgroundAttachment: 'fixed',
  }
})

export function Test() {

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#222',
          color: '#fff',
          gap: 2
        }}
      >
        <Parent>
          {(data) => (
            <label>{data?.name}</label>
          )}
        </Parent>
      </Box>
    </>
  );
}

function Parent({ children }) {

  return (
    <Formik>
      {children}
    </Formik>
  )
}

function Formik({ children }) {

  let data = {
    name: 'praveen'
  }

  return children(data)
}



