import { useState } from 'react';
import Card from '../Card/Card';
import { Swiper, SwiperSlide, Mousewheel } from '../../lib/Swiper';
import { Box } from '@mui/material';

export function Carousal({ data }) {
    const [preIdx, setPreIdx] = useState(0);

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            position: 'relative'
        }}>
            <Swiper
                onActiveIndexChange={e => setPreIdx(e.activeIndex)}
                slidesPerView={'auto'}
                spaceBetween={20}
                mousewheel={true}
                modules={[Mousewheel]} 
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                }}>
                {data?.map((product, index) => <SwiperSlide key={index} style={{
                    opacity: index <= preIdx - 1 ? 0 : 1,
                    transition: 'opacity 0.2s',
                    width: 'auto'
                }}>
                    <Card
                        sx={{
                            borderRadius: 20,
                            height: '100%'
                        }} product={product} />
                </SwiperSlide>)}
            </Swiper>
        </Box>);
}
