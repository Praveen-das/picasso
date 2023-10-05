import React, { useEffect, useState } from 'react';
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
  let [clickCount, setClickCount] = useState(0)

  // useEffect(() => {
  //   window.onmousemove = e => {
  //     let
  //       X = e.clientX,
  //       Y = e.clientY

  //     document.body.style.setProperty('--X', X + 'px')
  //     document.body.style.setProperty('--Y', Y + 'px')
  //   }
  // }, [])

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
          gap: 2
        }}
      >
        <Button onClick={() => setClickCount(s => ++s)}>click here</Button>
        <Typography
          sx={{
            color: 'white',
          }}
          variant='h1'
        >{clickCount}</Typography>
      </Box>
      {/* <Box
        sx={{
          width: '100%',
          height: '100vh',
          bgcolor: '#1e1e1e',
          display: 'grid',
          gridTemplateColumns: 'auto auto',
          placeContent: 'center',
          gap: 1
        }}
      >
        <StyledBox >
          <Button onClick={() => setClickCount(s => s++)}>click</Button>
        </StyledBox>
        <StyledBox sx={{ width: '500px !important' }} >
          <label>{clickCount}</label>
        </StyledBox>
        <StyledBox />
        <StyledBox sx={{ width: '500px !important' }} />
      </Box> */}
    </>
  );
}
