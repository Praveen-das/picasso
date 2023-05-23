import React from 'react'
import './tray.css'
import Card from '../Card/Card'
import { useProductQuery } from '../../Hooks/useProducts'
import Masonry from '@mui/lab/Masonry';
import { Box, Container, Typography } from '@mui/material';


function Tray({ title, url }) {
    const { data } = useProductQuery(title, url)

    return (
        <>
            <Container maxWidth={'lg'} sx={{ display: 'grid', gap: 2, textAlign: 'center', mt: 5 }}>
                <Typography variant='h4' className='brand_title' htmlFor="">{title}</Typography>
                <Typography>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum, nobis placeat libero explicabo, laudantium provident ut odio magni aperiam excepturi delectus. Perferendis earum, velit eius id deserunt rerum saepe nesciunt.</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                    <Masonry spacing={15} columns={3} >
                        {
                            data && data[0]?.map(item => (<Card sx={{ width: '100%' }} key={item.id} product={item} />)) || <></>
                        }
                    </Masonry>
                </Box>
            </Container>
        </>
    )
}

export default Tray