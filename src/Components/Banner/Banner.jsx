import { useLayoutEffect, useRef, useState } from 'react'
import './banner.css'
import Card from '../Card/Card'

import { Swiper, SwiperSlide, Mousewheel } from '../../lib/Swiper'
import gsap from 'gsap'

import { useProducts } from '../../Hooks/useProducts'
import { Box, Grid, Typography } from '@mui/material'

const categories = [
    'oil paintings', 'murals', 'fabric painting', 'watercolor', 'digital'
]

function Banner() {

    const br = useRef()
    const { data } = useProducts()
    const [preIdx, setPreIdx] = useState(-1)

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
        <>
            <Grid ref={app} container spacing={4} p='2rem 5rem' overflow='hidden'>
                <Grid item xs={6} minHeight={400}>
                    <Box
                        display='flex'
                        flexDirection='column'
                    >
                        <label className='brandName' htmlFor="">BEAUTY IN  <br /> STYLE</label>
                        <label className='p1' htmlFor="">Find the latest collections that suit your needs and tastes</label>
                        {/* <label className='p2' htmlFor="">Find the latest collections that suit your needs and tastes</label> */}
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
                    {/* <swiper-container
                        slides-per-view="auto" 
                        space-between="20px"
                        class="mySwiper">
                        {
                            data && data[0]?.map((product, index) =>
                                <swiper-slide key={index}>
                                    <Card sx={{ height: 260 }} product={product} />
                                </swiper-slide>
                            )
                        }
                    </swiper-container> */}
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
                            fontFamily: 'var(--Title)',
                            fontWeight: 100,
                            color: 'white',
                            textShadow: `0 0 1px black`,
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
                            fontFamily='var(--Title)'
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
                                    borderRadius={5}
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
                                    <Typography sx={{ pointerEvents: 'none' }} fontFamily='var(--Title)' fontSize={14} >{category}</Typography>
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