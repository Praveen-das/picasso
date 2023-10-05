import { Box, Button, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom'

import natureImg from '../../Assets/Images/collections_section/nature.webp'
import muralImg from '../../Assets/Images/collections_section/murals.webp'
import homeDecorImg from '../../Assets/Images/collections_section/home_decor.webp'

import ethnicImg from '../../Assets/Images/collections_section/ethnic.webp'
import lineart from '../../Assets/Images/collections_section/lineart.webp'
import expressions_of_love from '../../Assets/Images/collections_section/expressions_of_love.jpg'

import useFacets from '../../Hooks/useFacets';

const Card = styled(props => <Box component={Link} {...props} />)({
    height: '100%',
    borderRadius: 20,
    display: 'grid',
    gridTemplateColumns: '80px 1fr',
    alignItems: 'center',
    gap: 10,
    ":hover #card_title::before": {
        width: '100%',
        left: 0
    }
});


const CardTitle = styled(props => <Typography id='card_title' color='white' {...props} />)({
    position: 'relative',
    width: 'max-content',
    fontSize: 16,
    fontWeight: 600,
    transition: "0.5s",
    zIndex: 100,
    color: 'black',
    '::before': {
        content: "''",
        position: 'absolute',
        bottom: -2,
        right: 0,
        width: '0%',
        height: 2,
        background: 'var(--brand)',
        transition: '0.2s',
    },
});

let collections = [
    { label: `Nature\'s Beauty`, img: natureImg },
    { label: `Ethnic Dress Artistry`, img: ethnicImg },
    // { label: `Paintings`, url: '/shop?category=Painting', img: paintingsImg },
    { label: `Artful Home Decor`, img: homeDecorImg },
    { label: `Mural Magic`, img: muralImg },
    { label: `Line Art Creations`, img: lineart },
    { label: `Expressions of Love`, img: expressions_of_love },
    // { label: `Drawings`, url: '/shop?category=Drawing', img: drawingsImg },
]

export default function Explore() {
    const { facets: { data } } = useFacets()
    let collections_from_data = data?.collections || []

    return (
        <Box sx={{
            display: 'flex',
            gap: 6,
            px: 6,
            pt: 'var(--vSpacing)',
        }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    gap: 4,
                    // justifyContent: 'space-around',
                    pr: 1,
                    width: 350
                }}
            >
                <Typography variant='heading'>OUR COLLECTIONS</Typography>
                <Typography variant='desc'>
                    Explore Curated Gems<br />from Diverse Genres
                </Typography>
                {/* <Button component={Link} to='/collections' size='large' sx={{ px: 4, borderRadius: 4, mt: 2 }} variant='contained'>View All</Button> */}
            </Box>
            <Box
                sx={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3,1fr)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 3,
                    bgcolor: 'white !important'
                }}
            >
                {
                    collections.map(({ label, img }) => {
                        let item = collections_from_data.find(({ name }) => name === label)
                        let url = `/shop?collection=${item?.id}`
                        let total_pieces = item?._count.product || 0

                        return <Card to={url} key={label} >
                            <img style={{ borderRadius: 20, objectFit: 'cover', gridRow: 'span 2' }} width={80} height={80} src={img} alt="" />
                            <CardTitle>{label + item?.id}</CardTitle>
                            <Typography >{total_pieces} pieces</Typography>
                        </Card>
                    })
                }
            </Box>
        </Box >
    );
}
