import './style.css'
import { Suspense, lazy, useEffect, useRef } from 'react'

import Explore from '../Components/ExploreBar/Explore'
import Banner from '../Components/Banner/Banner'
import useFacets from '../Hooks/useFacets'
import { Box, Button, Grid, Typography } from '@mui/material'
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
import useArtists from '../Hooks/useArtists'

import { ReactComponent as FreeShippingIcon } from '../Assets/svg/freeShipping.svg'
import { ReactComponent as MoneybackIcon } from '../Assets/svg/moneyback.svg'
import { ReactComponent as PaymentIcon } from '../Assets/svg/securePayment.svg'
import { ReactComponent as ReturnPolicyIcon } from '../Assets/svg/return.svg'

const Tray = lazy(() => import('../Components/Tray/Tray'))

function HomePage() {

    return (
        <div>
            <Banner2 />
            <Suspense >
                {/* <ExploreSection /> */}
                {/* <MainTitle label='EXPLORE' /> */}
                <SubjectsList />
                <Tray
                    title='NEW ARRIVALS'
                    url='/products?orderBy=%7B"createdAt"%3A"desc"%7D&limit=10'
                />
                <Tray
                    title='ORIGINAL ARTWORKS'
                    url='/products?orderBy=%7B"createdAt"%3A"asc"%7D&limit=10'
                    direction='rtl'
                />
                <ShopByMedium />
                <ShopByPrice />
                <AboutUsSection />
                {/* <SellerSections /> */}
                <ArtistsSection />
                {/* <Security /> */}
            </Suspense>
        </div>
    )
}

export default HomePage

function SellerSections() {
    return (
        <Box
            sx={{
                display: 'grid',
                px: 4,
                gap: 'var(--vGap)',
                mt: 'var(--vSpacing)',
                boxSizing: 'border-box',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '300px',
                    bgcolor: 'var(--brandLight)',
                    borderRadius: '20px'
                }}
            >

            </Box>

        </Box>
    )
}

function ArtistsSection() {
    let artists = useArtists()

    let container = {
        display: 'grid',
        px: 4,
        gap: 'var(--vGap)',
        mt: 'var(--vSpacing)',
        boxSizing: 'border-box'
    }, tray = {
        display: 'flex',
        gap: 4,
        py: 2,
        overflowX: 'scroll',
    }, artistWrapper = {
        display: 'grid',
        justifyItems: 'center',
        gap: 2,
        minWidth: 180,
        maxWidth: 180,
        transition: '0.2s',
        cursor: 'pointer',
        ':hover .img_container::before, :hover .img_container::after': {
            opacity: '1'
        }
    }, img_wrapper = {
        position: 'relative',
        width: '100%',
        height: '100%',
        aspectRatio: 1,
        borderRadius: '50%',
        overflow: 'hidden',
        '::before': {
            content: "''",
            position: 'absolute',
            inset: 0,
            bgcolor: '#000000db',
            opacity: '0',
            transition: '0.2s'
        },
        '::after': {
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            color: 'white',
            opacity: '0',
            transition: '0.2s'
        }
    }, img = {
        objectFit: 'contain',
        width: '100%',
        display: 'block'
    }

    return (
        <>
            <Box sx={container} >
                <Typography variant='heading' mx='auto'>OUR ARTISTS</Typography>
                <Box className='noScroll' sx={tray} >
                    {
                        artists.data?.map(({ displayName, photo, product, id }) => (
                            <Box
                                component={Link}
                                to={`/artists/profile/${id}`}
                                sx={artistWrapper}
                                key={id}
                            >
                                <Box
                                    className='img_container'
                                    sx={{
                                        ...img_wrapper,
                                        '::after': {
                                            content: `"${product?.length} artworks"`,
                                            ...img_wrapper['::after']
                                        }
                                    }}
                                >
                                    <img
                                        src={photo}
                                        style={img}
                                        alt={photo}
                                    />
                                </Box>
                                <Typography className='artist_name' variant='body1' fontWeight={600}>{displayName}</Typography>
                            </Box>
                        ))
                    }
                </Box>
            </Box>
        </>
    )
}

function AboutUsSection() {
    let
        box_wrapper = {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            gap: 6,
            mt: 'var(--vSpacing)',
            px: 4,
            boxSizing: 'border-box'
        },
        container = {
            width: '100%',
            height: 350,
            position: 'relative'
        },
        left_section = {
            container: {
                maxWidth: 450
            },
            img: {
                width: '92%',
                height: '92%',
                bgcolor: 'darkgrey',
                position: 'absolute',
                borderRadius: '10px',
                overflow: 'hidden'
            },
        },
        middle_section = {
            container: {
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                maxWidth: 150,
                py: 1
            },
            box: {
                display: 'grid',
                gap: 2,
            },
            typo: {
                variant: 'h5',
                fontWeight: 600,
            }
        },
        right_section = {
            container: {
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                maxWidth: 550
            }
        }

    return (
        <>
            <Box sx={box_wrapper} >
                <Box sx={{ ...container, ...left_section.container }}>
                    <Box sx={{ ...left_section.img, bottom: 0, right: 0 }}>
                        <img style={{ width: '100%', height: '100%' }} src={natureImg} alt="" />
                    </Box>
                    <Box sx={{ ...left_section.img, bgcolor: 'grey' }}>
                        <img style={{ width: '100%', height: '100%' }} src={muralImg} alt="" />
                    </Box>
                </Box>
                <Box sx={{ ...container, ...middle_section.container }}>
                    <Box sx={middle_section.box} >
                        <Typography {...middle_section.typo}>42k+</Typography>
                        <Typography variant='body1'>Pieces sold</Typography>
                    </Box>
                    <Box sx={middle_section.box}                    >
                        <Typography {...middle_section.typo}>42k+</Typography>
                        <Typography variant='body1'>Happy Clients</Typography>
                    </Box>
                    <Box sx={middle_section.box}                    >
                        <Typography {...middle_section.typo}>42k+</Typography>
                        <Typography variant='body1'>Artists</Typography>
                    </Box>
                </Box>
                <Box sx={{ ...container, ...right_section.container }}>
                    <Typography variant='heading'>ABOUT US</Typography>
                    <Typography variant='body1'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        <br />
                        <br />
                        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                    </Typography>
                    <Box>
                        <Button
                            variant='contained'
                            size='large'
                            sx={{
                                fontWeight: 600,
                                mt: 4,
                                backgroundImage: 'linear-gradient(90deg, rgb(91 49 255), rgb(174 39 255))',
                            }}
                        >LEARN MORE</Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export function Security() {

    let
        container = {
            width: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            gap: 2,
            // mt: 'var(--vSpacing)',
        },
        iconboxProps = {
            sx: {
                width: 50,
                aspectRatio: 1,
                display: 'grid',
                placeItems: 'center',
                bgcolor: 'var(--brandLight)',
                borderRadius: 1000
            }
        },
        props = {
            sx: {
                width: '100%',
                display: 'grid',
                justifyItems: 'center',
                alignContent: 'start',
                gap: 2,
                textAlign: 'center'
            }
        },
        iconProps = {
            style: { width: '30px', height: '30px' }
        }


    return (
        <Box {...container}>
            <Box {...props}>
                <Box {...iconboxProps}>
                    <FreeShippingIcon {...iconProps} />
                </Box>
                <Typography fontSize={14} fontWeight={600}>Free shipping on all orders</Typography>
            </Box>
            <Box {...props}>
                <Box {...iconboxProps}>
                    <MoneybackIcon {...iconProps} />
                </Box>
                <Typography fontSize={14} fontWeight={600}>100% Money-back Guaranteed</Typography>
            </Box>
            <Box {...props}>
                <Box {...iconboxProps}>
                    <PaymentIcon style={{ ...iconProps.style, scale: '0.9' }} />
                </Box>
                <Typography fontSize={14} fontWeight={600}>Super Secure Payments</Typography>
            </Box>
            <Box {...props}>
                <Box {...iconboxProps}>
                    <ReturnPolicyIcon {...iconProps} />
                </Box>
                <Typography fontSize={14} fontWeight={600}>90 days return policy</Typography>
            </Box>
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
                    gap: 'var(--vGap)',
                    mt: 'var(--vSpacing)',
                    mx: 4,
                }}
            >
                <Typography variant='heading2'>SHOP BY PRICE</Typography>
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
    textShadow: '0 0 5px black',
    '::before': {
        content: "''",
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 2,
        background: 'white',
        textShadow: '0 0 1px black'
    }
})

function Banner2() {


    return (
        <Box
            sx={{
                boxSizing: 'border-box',
                display: 'flex',
                position: 'relative',
                justifyContent: 'space-between',
                width: '100%',
                height: '80vh',
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
                ":has(.styledBox:nth-of-type(1):hover)::before": { content: `"Nature's Beauty"` },
                ":has(.styledBox:nth-of-type(2):hover)::before": { content: '"Mural Magic"' },
                ":has(.styledBox:nth-of-type(3):hover)::before": { content: '"Artful Home Decor"' },
                ":has(.styledBox:nth-of-type(4):hover)::before": { content: '"Ethnic Dress Artistry"' },
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
                gap: 'var(--vGap)',
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
                                    aspectRatio: 1.5,
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
                                    variant='h6'
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
    padding: '10px 20px',
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
                    gap: 'var(--vGap)',
                    mt: 8,
                    ml: 4,
                }}
            >
                <Typography variant='heading2' >WHAT ARE YOU LOOKING FOR ?</Typography>
                <Box
                    sx={{
                        width: '100%',
                        position: 'relative',
                        height: 65,
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
