import Card from '../Card/Card';
import { Swiper, SwiperSlide, Mousewheel, Navigation } from '../../lib/Swiper';

import './carousal.css'
import { Box, IconButton } from '@mui/material';
import BackwardIcon from '@mui/icons-material/ArrowBackIosRounded';
import ForwardIcon from '@mui/icons-material/ArrowForwardIosRounded';
import styled from '@emotion/styled';
import { useRef } from 'react';

export function Carousal({ data }) {
    let prevElm = useRef(null)
    let nextElm = useRef(null)

    let navbtn_sx = {
        position: 'absolute',
        bottom: 20,
        zIndex: 100,
        background: '#e2e2e2',
        "&.Mui-disabled": {
            opacity: 0,
            transition: '0.5s'
        },
        ":hover": {
            background: '#e2e2e2',
        }
    }

    return (
        <Box
            sx={{
                height: '100%',
                position: 'relative'
            }}
        >
            <IconButton
                id='prevEl'
                ref={prevElm}
                size='small'
                sx={{ ...navbtn_sx, left: -15 }}
            >
                <BackwardIcon sx={{ fontSize: 16 }} />
            </IconButton>
            <IconButton
                id='nextEl'
                ref={nextElm}
                size='small'
                sx={{ ...navbtn_sx, right: -15 }}
            >
                <ForwardIcon sx={{ fontSize: 16 }} />
            </IconButton>
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={20}
                mousewheel={true}
                navigation={{
                    nextEl: nextElm.current,
                    prevEl: prevElm.current,
                    disabledClass: 'Mui-disabled'
                }}
                modules={[Mousewheel, Navigation]}
                className="carousal"
            >
                {
                    data?.map((product) =>
                        <SwiperSlide key={product?.id}>
                            <Card product={product} />
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </Box>
    );
}
