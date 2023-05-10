import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './banner.css'
import gsap from 'gsap'
import Card from '../Card/Card'

import { Swiper, SwiperSlide, Mousewheel } from '../../lib/Swiper'

import { useProducts } from '../../Hooks/useProducts'
import axios from 'axios'
import { Box, Grid, Typography } from '@mui/material'
import useWishlist from '../../Hooks/useWishlist'

const categories = [
    'oil paintings', 'murals', 'fabric painting', 'watercolor', 'digital'
]

function Banner() {
    const { data } = useProducts()
    const [preIdx, setPreIdx] = useState(-1)
    // const { wishlist } = useWishlist()

    const app = useRef();

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { duration: 0.4 } })
            tl.from(br.current, {
                delay: 0.5,
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

    const [dummy, setDummy] = useState([])

    useEffect(() => {
        axios.get('https://api.unsplash.com/photos/?client_id=pJ14-2J0Pm0IEgSKrw7-84Y1zhd8yss0l5f6ED6FgTE&per_page=9')
            .then(({ data }) => setDummy(data))
    }, [])

    const br = useRef()


    return (
        <>
            <Grid ref={app} container spacing={4} p='2rem 5rem' overflow='hidden'>
                <Grid item xs={6} >
                    <Box
                        display='flex'
                        flexDirection='column'
                    >
                        <label className='brandName' htmlFor="">BEAUTY IN STYLE</label>
                        <label className='p1' htmlFor="">Find the latest collections that suit your needs and tastes</label>
                    </Box>
                </Grid>
                <Grid ref={br} item xs={6}>
                    <Swiper
                        onActiveIndexChange={(e) => setPreIdx(e.activeIndex - 1)}
                        slidesPerView='auto'
                        spaceBetween={20}
                        breakpoints={{
                            // 425: {
                            //     spaceBetween: 20
                            // },
                            320: {
                                spaceBetween: 10
                            },
                        }}
                        mousewheel={true}
                        modules={[Mousewheel]}
                        className="mySwiper"
                    >
                        {
                            data && data[0]?.map((product, index) =>
                                <SwiperSlide key={index} style={{ opacity: index <= preIdx ? 0 : 1, transition: 'opacity 0.2s', width: 'auto' }} >
                                    <Card sx={{ height: 260 }} product={product} />
                                </SwiperSlide>
                            )
                        }
                    </Swiper>
                </Grid>
                <Grid
                    item
                    xs={12}
                    width='100%'
                    my={2}
                    position='relative'
                    sx={{
                        "::after": {
                            content: "'ARTWORLD'",
                            position: 'absolute',
                            top: '-70px',
                            right: 0,
                            fontSize: '9rem',
                            fontFamily: 'Bebas Neue',
                            fontWeight: 100,
                            color: 'white',
                            textShadow: `0 0 1px black,0 0 1px black,0 0 1px black`,
                        },
                    }}
                >
                    <Box
                        display='flex'
                        justifyContent='right'
                        gap={2}
                        mr={5}

                    >
                        <Typography
                            alignSelf='end'
                            lineHeight='30px'
                            mr={2}
                            variant='h3'
                            fontFamily='Bebas Neue'
                        >categories</Typography>
                        {
                            categories.map((category, key) => (
                                <Box
                                    key={key}
                                    display='flex'
                                    justifyContent='center'
                                    alignItems='center'
                                    width='90px'
                                    height='90px'
                                    boxShadow='0px 4px 20px #d1d1d1'
                                    bgcolor='white'
                                    zIndex={100}
                                    sx={{
                                        transition: '0.2s',
                                        backdropFilter: 'blur(10px)',
                                        ":hover": {
                                            bgcolor: 'var(--brand)',
                                            color: 'white',
                                            boxShadow: '0px 4px 5px #d1d1d1',
                                            translate: '0 -10px'
                                        }
                                    }}
                                >
                                    <Typography sx={{ pointerEvents: 'none' }} fontFamily='Bebas Neue' >{category}</Typography>
                                </Box>
                            ))
                        }
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Banner