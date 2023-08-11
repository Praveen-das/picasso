import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import './banner.css'

import gsap from 'gsap'

import { useProducts } from '../../Hooks/useProducts'
import { Box, Button, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import useFacets from '../../Hooks/useFacets'
import { Carousal } from '../Carousal/Carousal'

const fakeCategories = [
    'oil paintings', 'murals', 'fabric painting', 'watercolor', 'digital'
]

const CategoryBox = styled((props) => <Box component={Link} {...props} />)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90px',
    height: '90px',
    boxShadow: '0px 4px 20px #d1d1d1',
    borderRadius: 20,
    bgcolor: 'white',
    zIndex: 100,
    transition: '0.2s',
    backdropFilter: 'blur(10px)',
    textAlign: 'center',
    ":hover": {
        background: 'var(--brand)',
        color: 'white !important',
        boxShadow: '0px 4px 5px #d1d1d1',
        translate: '0 -10px'
    }
})


function Banner() {
    const br = useRef()
    const { data: products } = useProducts()
    const { facets: { data } } = useFacets()
    const categories = data?.categories

    const app = useRef();

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { duration: 0.4 } })
            tl.from(br.current, {
                // delay: 0.1,
                opacity: 0
            }).from('.brandName,.p1', {
                'clipPath': 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)',
                y: 50,
                opacity: 0,
                stagger: 0.2
            })
        }, app)

        return () => ctx.revert();
    }, [])

    return (
        <Grid
            container
            px={6}
            py={1}
            overflow='hidden'
        >
            <Grid item xs width='0px'>
                <Box
                    sx={{
                        boxSizing: 'border-box',
                        display: 'flex',
                        alignItems: 'center',
                        width: '60%',
                        height: 430,
                        bgcolor: 'var(--brandLight)',
                        borderRadius: 5,
                        py: 6,
                        px: 10,
                        gap: 8
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
                            sx={{
                                borderRadius: 4,
                                // fontSize: 14,
                                textTransform: 'none',
                                px: 4,
                                py: 1.5,
                                mt: 4
                            }}
                            size='large'
                            variant='contained'
                        >Explore the Canvas</Button>
                    </Box>
                    <Carousal data={products} />
                </Box>
            </Grid>
        </Grid>
    )
}

export default Banner