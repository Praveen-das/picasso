import { useRef } from 'react'
import './banner.css'

import { useProducts } from '../../Hooks/useProducts'
import { Box, Button, Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import useFacets from '../../Hooks/useFacets'
import { Carousal } from '../Carousal/Carousal'

function Banner() {
    const br = useRef()
    const { data: products } = useProducts()
    const { facets: { data } } = useFacets()

    const app = useRef();

    return (
        <Grid
            ref={app}
            container
            // px='3rem'
            // py={1}
            overflow='hidden'
        >
            <Grid item xs width='0px'>
                <Box
                    className='banner_bg'
                    sx={{
                        position: 'relative',
                        boxSizing: 'border-box',
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        height: 500,
                        py: 2,
                        px: 6,
                        gap: 8,
                    }}
                >
                    <Box
                        display='flex'
                        flexDirection='column'
                        justifyContent='space-between'
                        height='100%'
                        alignItems='flex-start'
                        py={2}
                        position='relative'
                    >
                        <label className='brandName' >THE ARTFUL<br />ODYSSEY</label>
                        <label className='p1' >
                            Discover, Buy and Sell Masterpieces<br />Inspired by Culture and Talent
                        </label>
                        <Button
                            className='cta_main'
                            component={Link}
                            to='/shop'
                            sx={{
                                borderRadius: 4,
                                textTransform: 'none',
                                px: 4,
                                py: 1.5,
                                mt: 4,
                                ":hover": {
                                    color: 'white !important'
                                },
                            }}
                            size='large'
                            variant='contained'
                        >Explore the Canvas</Button>
                    </Box>
                    <Box
                        width={'58%'}
                        height='100%'
                        sx={{
                            position: 'absolute',
                            right: 0,
                            borderRadius: '25px 0 0 25px',
                            clipPath: 'inset(0% -10% 0% 0% round 20px);',
                        }}
                    >
                        <Carousal data={products} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Banner