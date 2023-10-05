import './style.css'
import { Suspense, lazy, useEffect, useRef } from 'react'

import Explore from '../Components/ExploreBar/Explore'
import useFacets from '../Hooks/useFacets'
import { Box, Grid, Typography } from '@mui/material'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

import paintingsImg from '../Assets/Images/collections_section/paintings.webp'
import digital_art from '../Assets/Images/collections_section/digital_art.jpg'
import drawingsImg from '../Assets/Images/collections_section/drawings.webp'
import banner from '../Assets/Images/collections_section/murals.webp'

import natureImg from '../Assets/Images/collections_section/nature.webp'
import muralImg from '../Assets/Images/collections_section/murals.webp'
import homeDecorImg from '../Assets/Images/collections_section/home_decor.webp'
import ethnicImg from '../Assets/Images/collections_section/ethnic.webp'

import lineart from '../Assets/Images/collections_section/lineart.webp'
import expressions_of_love from '../Assets/Images/collections_section/expressions_of_love.jpg'
import SellerSection from '../Components/Seller/SellerSection'

const Tray = lazy(() => import('../Components/Tray/Tray'))

function HomePage() {

    const filters = [
        'New Arrivals',
        'Best Selling',
    ]

    return (
        <div>
            <Banner />
            <Suspense >
                {/* <MainTitle label='EXPLORE' /> */}
                <SubjectsList />
                <Tray
                    title='ORIGINAL ARTWORKS'
                    url='/products?orderBy=%7B"createdAt"%3A"desc"%7D&limit=10'
                    filters={filters}
                />
                <Tray
                    title='ORIGINAL ARTWORKS'
                    url='/products?orderBy=%7B"createdAt"%3A"desc"%7D&limit=10'
                    filters={filters}
                />
                <Tray
                    title='ORIGINAL ARTWORKS'
                    url='/products?orderBy=%7B"createdAt"%3A"desc"%7D&limit=10'
                    filters={filters}
                />
                <ShopByPrice />
                <ShopByMedium />
            </Suspense>
        </div>
    )
}

export default HomePage

function MainTitle({ label }) {
    return (
        <Box
            sx={{
                width: '100%',
                textAlign: 'center',
                mt: 'var(--vSpacing)',
                mb: -8
            }}
        >
            <Typography variant='heading'>{label}</Typography>
        </Box>
    )
}

function ShopByPrice() {
    const typo = {
        fontSize: 14,
        fontWeight: 500,
    }

    const priceRanges = [
        {
            label: 'Under ₹ 10,000',
            url: 'shop?price_range=%7B"max"%3A10000%7D'
        },
        {
            label: '₹ 10,000 - ₹ 50,000',
            url: 'shop?price_range=%7B"min"%3A10000%2C"max"%3A50000%7D'
        },
        {
            label: '₹ 50,000 - ₹ 1,00,000',
            url: 'shop?price_range=%7B"min"%3A50000%2C"max"%3A100000%7D'
        },
        {
            label: '₹ 1,00,000 - ₹ 3,00,000',
            url: 'shop?price_range=%7B"min"%3A100000%2C"max"%3A300000%7D'
        },
        {
            label: '₹ 3,00,000 - ₹ 5,00,000',
            url: 'shop?price_range=%7B"min"%3A300000%2C"max"%3A500000%7D'
        },
        {
            label: '₹ 5,00,000 - Above',
            url: 'shop?price_range=%7B"min"%3A300000%7D'
        },
    ]

    return (
        <>
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    mt: 'var(--vSpacing)',
                    mx: 4,
                }}
            >
                <Typography variant='heading' >SHOP BY PRICE</Typography>
                <Box
                    sx={{
                        boxSizing: 'border-box',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    {
                        priceRanges?.map(({ label, url }) => (
                            <Chip
                                key={label}
                                to={url}
                            >
                                <Typography sx={typo}>{label}</Typography>
                            </Chip>
                        ))
                    }
                </Box>
            </Box >
        </>
    )
}

const StyledBox = styled(({ className, ...props }) => <Box component={Link} {...props} className={className + " styledBox"} />)({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: '2rem',
    width: '100%',
    textAlign: 'center',
    transition: '0.5s',
    overflow: 'hidden',
    cursor: 'pointer',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    '::before': {
        content: "''",
        position: 'absolute',
        inset: 0,
        background: 'hsl(0deg 0% 0% / 80%)',
        transition: '0.5s',
    },
    ':hover': {
        transition: '1s',
        width: '200%',
        '::before': {
            background: 'hsl(0deg 0% 100% / 0%)',
        },
    },

})

const StyledTypography = styled(Typography)({
    color: 'white',
    fontSize: 16,
    fontWeight: 500,
    position: 'relative',
    zIndex: 2,
    textShadow:'0 0 5px black',
    '::before': {
        content: "''",
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 2,
        background: 'white',
        textShadow:'0 0 1px black'
    }
})

function Banner() {


    return (
        <Box
            sx={{
                boxSizing: 'border-box',
                display: 'flex',
                position: 'relative',
                justifyContent: 'space-between',
                width: '100%',
                height: '70vh',
                px: 4,
                "::before": {
                    content: '"THE ARTFUL ODYSSEY"',
                    textShadow: '0 0 10px black',
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    translate: '-50% -50%',
                    color: 'white',
                    zIndex: 1,
                    pointerEvents: 'none',
                    className: 'hero_typo',
                    fontSize: 120,
                    whiteSpace: 'nowrap',
                    fontFamily: 'League Gothic',
                    textTransform: 'uppercase',
                },
                ":has(.styledBox:nth-child(1):hover)::before": { content: `"Nature's Beauty"` },
                ":has(.styledBox:nth-child(2):hover)::before": { content: '"Mural Magic"' },
                ":has(.styledBox:nth-child(3):hover)::before": { content: '"Artful Home Decor"' },
                ":has(.styledBox:nth-child(4):hover)::before": { content: '"Ethnic Dress Artistry"' },
            }}
        >
            <StyledBox to='/shop?collection=19' sx={{ backgroundImage: `url(${natureImg})` }}>
                <StyledTypography>Nature's Beauty</StyledTypography>
            </StyledBox>
            <StyledBox to='/shop?collection=17' sx={{ backgroundImage: `url(${muralImg})` }}>
                <StyledTypography>Mural Magic</StyledTypography>
            </StyledBox>
            <StyledBox to='/shop?collection=16' sx={{ backgroundImage: `url(${homeDecorImg})` }}>
                <StyledTypography>Artful Home Decor</StyledTypography>
            </StyledBox>
            <StyledBox to='/shop?collection=15' sx={{ backgroundImage: `url(${paintingsImg})` }}>
                <StyledTypography>Ethnic Dress Artistry</StyledTypography>
            </StyledBox>
        </Box >
    )
}

function ShopByMedium() {
    const { facets: { data } } = useFacets()
    const mediums_from_data = data?.allCategories || []

    let mediums = {
        "Digital Art": { img: digital_art },
        "Drawing": { img: drawingsImg },
        "Painting": { img: paintingsImg },
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                mt: 'var(--vSpacing)',
                px: 4,
            }}
        >
            <Typography variant='heading' >SHOP BY MEDIUM</Typography>
            <Box
                sx={{
                    boxSizing: 'border-box',
                    width: '100%',
                    display: 'flex',
                    gap: 3,
                    overflow: 'auto',
                    "::-webkit-scrollbar": {
                        display: 'none'
                    },
                }}
            >
                {
                    mediums_from_data?.map(({ name, id }) => {
                        return (
                            <Box
                                component={Link}
                                to={`/shop?category=${id}`}
                                sx={{
                                    boxSizing: 'border-box',
                                    position: 'relative',
                                    width: '100%',
                                    aspectRatio: 1.2,
                                    bgcolor: 'var(--brandLight)',
                                    display: 'grid',
                                    placeItems: 'center',
                                    backgroundImage: `url(${mediums[name]?.img})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    p: 4,
                                    borderRadius: '10px',
                                    overflow: 'hidden',
                                    "::before": {
                                        content: "''",
                                        position: 'absolute',
                                        inset: 0,
                                        top: '50%',
                                        bottom: 0,
                                        // opacity: 1,
                                        transition: '0.2s ease-in-out',
                                        background: 'linear-gradient(180deg, transparent ,black )'
                                    },
                                    ":hover::before": {
                                        top: '-40%',
                                        background: 'linear-gradient(180deg, transparent ,black )',
                                        // opacity: 0.8
                                    }
                                }}
                                key={id}>
                                <Typography
                                    variant='h5'
                                    sx={{
                                        textTransform: 'uppercase',
                                        color: 'white',
                                        fontWeight: 700,
                                        textShadow: '0 0 8px black',
                                        margin: 'auto 0 0 auto',
                                        zIndex: 2
                                    }}
                                >{name}</Typography>
                            </Box>
                        )
                    })
                }

            </Box>
        </Box >
    )
}

const Chip = styled((props) => <Box component={Link} {...props} />)({
    boxSizing: 'border-box',
    width: '100%',
    display: 'flex',
    flex: '1 1 max-content',
    background: 'var(--brandLight)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: '10px',
    whiteSpace: 'nowrap',
    transition: '0.2s',
    ":hover": {
        background: 'var(--brand)',
        color: 'white !important'
    }
})

function SubjectsList() {
    const { facets: { data } } = useFacets()
    const subjects = data?.allSubjects || []

    const typo = {
        fontSize: 14,
        fontWeight: 500,
    }

    return (
        <>
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    mt: 'var(--vSpacing)',
                    ml: 4,
                }}
            >
                <Typography variant='heading' >WHAT ARE YOU LOOKING FOR ?</Typography>
                <Box
                    sx={{
                        width: '100%',
                        position: 'relative',
                        height: 45,
                    }}
                >
                    <Box
                        sx={{
                            boxSizing: 'border-box',
                            display: 'flex',
                            alignItems: 'center',
                            position: 'absolute',
                            inset: 0,
                            pr: 6,
                            gap: 2,
                            overflow: 'auto',
                            // height: 'auto',
                            "::-webkit-scrollbar": {
                                display: 'none'
                            },
                        }}
                    >
                        {
                            subjects?.map(({ name }) => (
                                <Chip key={name} to={`/shop?subject%5B%5D=${name}`} >
                                    <Typography sx={typo}>{name}</Typography>
                                </Chip>
                            ))
                        }
                    </Box>
                </Box>
            </Box >
        </>
    )
}
