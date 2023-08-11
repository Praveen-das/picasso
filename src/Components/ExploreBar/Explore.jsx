import { Box, Button, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom'

import natureImg from '../../Assets/Images/collections_section/nature.webp'
import muralImg from '../../Assets/Images/collections_section/murals.webp'
import homeDecorImg from '../../Assets/Images/collections_section/home_decor.webp'
import paintingsImg from '../../Assets/Images/collections_section/paintings.webp'
import drawingsImg from '../../Assets/Images/collections_section/drawings.webp'
import ethnicImg from '../../Assets/Images/collections_section/ethnic.webp'

const Card = styled(props => <Box component={Link} {...props} />)({
    minHeight: 200,
    boxSizing: 'border-box',
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'end',
    backgroundColor: 'var(--brand)',
    color: 'white',
    padding: "1.5rem",
    backgroundPosition: "center",
    backgroundSize: "100%",
    transition: "0.2s",
    overflow: 'hidden',
    ":hover": {
        backgroundSize: "110%",
        "#card_title": {
            translate: '0 -10px',
        }
    }
});

const CardTitle = styled(props => <Typography id='card_title' color='white' {...props} />)({
    fontSize: 20,
    fontWeight: 600,
    textShadow: '0 0 4px black',
    transition: "0.2s",
});

export default function Explore() {

    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: 2.5,
            px: 6,
            pt: 'var(--vSpacing)',
        }}>
            <Box
                gridColumn='span 2'
                sx={{
                    p: '0 !important',
                    bgcolor: 'white !important'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                        gap: 2,
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'start',
                            justifyContent: 'space-around',
                            pr: 1,
                            width: 350
                        }}
                    >
                        <Typography variant='heading'>OUR COLLECTIONS</Typography>
                        <Typography variant='desc'>
                            Explore Curated Gems<br />from Diverse Genres
                        </Typography>
                        <Button size='large' sx={{ px: 4, borderRadius: 4, mt: 2 }} variant='contained'>View All</Button>
                    </Box>
                    <Card sx={{ backgroundImage: `url(${natureImg})` }} width='100%' height='100%' >
                        <CardTitle>Nature's Beauty</CardTitle>
                    </Card>
                </Box>
            </Box>
            <Card sx={{ backgroundImage: `url(${ethnicImg})` }} gridRow='span 2'>
                <CardTitle>Ethnic Dress Artistry</CardTitle>
            </Card>
            <Card sx={{ backgroundImage: `url(${paintingsImg})` }} >
                <CardTitle>Paintings</CardTitle>
            </Card>
            <Card sx={{ backgroundImage: `url(${homeDecorImg})` }} >
                <CardTitle>Artful Home Decor</CardTitle>
            </Card>
            <Card sx={{ backgroundImage: `url(${muralImg})` }} >
                <CardTitle>Mural Magic</CardTitle>
            </Card>
            <Card sx={{ backgroundImage: `url(${drawingsImg})` }} >
                <CardTitle>Drawings</CardTitle>
            </Card>
        </Box>
    );
}
