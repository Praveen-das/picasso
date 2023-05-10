import React, { useEffect, useState } from 'react'
import './tray.css'
import Card from '../Card/Card'
import { useProductQuery } from '../../Hooks/useProducts'
import Masonry from '@mui/lab/Masonry';
import { Box, Container, Typography } from '@mui/material';
import axios from 'axios';


function Tray({ title, url }) {
    const { data } = useProductQuery(title, url)

    const [dummy, setDummy] = useState([])

    useEffect(() => {
        axios.get('https://api.unsplash.com/photos/?client_id=pJ14-2J0Pm0IEgSKrw7-84Y1zhd8yss0l5f6ED6FgTE&per_page=9')
            .then(({ data }) => setDummy(data))
    }, [])

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