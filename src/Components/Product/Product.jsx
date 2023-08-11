import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './product.css'
import QuantityInput from '../QuantityInput/QuantityInput';
import Reviews from '../Reviews/Reviews';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip, Divider, Grid, IconButton, Rating, Skeleton, Typography, makeStyles } from '@mui/material';
// import makeStyles from '@mui/styles';
import { useCart } from '../../Hooks/useCart';
import useCurrentUser from '../../Hooks/useCurrentUser';
import Tray from '../ProductsTray/Tray'
import { useProduct } from '../../Hooks/useProducts';
import SellerProfile from './SellerProfile/SellerProfile';
import CartIcon from '@mui/icons-material/ShoppingCartOutlined';
import ChatIcon from '@mui/icons-material/Chat';
import { useStore } from '../../Context/Store';
import StarEmptyIcon from '@mui/icons-material/StarBorderRounded';
import StarIcon from '@mui/icons-material/StarRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShareIcon from '@mui/icons-material/Share';
import WishlistButton from '../WishlistButton/WishlistButton'
import { calculateDiscount } from '../../Utils/utils';
import UnfoldMoreIcon from '@mui/icons-material/ExpandMore';
import UnfoldLessIcon from '@mui/icons-material/ExpandLess';
import LoadingScreen from '../MUIComponents/LoadingScreen'

const IconButtonProps = {
    fontSize: 'small',
    color: 'primary'
}

function Product() {
    const [quantity, setQuantity] = useState(1)
    const [defaultImg, setDefaultImg] = useState(0)
    const [seller, setSeller] = useState(null)

    const setChatWidget = useStore(s => s.setChatWidget);
    const connectedUsers = useStore(s => s.connectedUsers)

    const navigate = useNavigate()
    const { currentUser, addToRecentlyViewed } = useCurrentUser()
    const { addToCart, removeFromCart, cart: { data: [cart] = [] } } = useCart()

    const params = useParams()
    const { data: product, isFetching, isLoading } = useProduct(params?.product_id)

    const sellerId = product?.sales_person?.id

    // useEffect(() => {
    //     if (currentUser.isLoading) return
    //     if (currentUser.data === null) return
    //     if (!product) return

    //     const rv = currentUser.data?.recently_viewed
    //     if (rv?.find(({ product_id }) => product_id === product?.id)) return

    //     // let timer = setTimeout(async () => {
    //     //     await addToRecentlyViewed.mutateAsync(product?.id)
    //     // }, 300)

    //     // return (() => clearTimeout(timer))
    // }, [currentUser, product])

    const handleCartButton = () => {
        const cartItem = cart?.find((o) => o.product_id === product?.id)

        if (cartItem)
            return {
                children: 'REMOVE FROM CART',
                onClick: () => removeFromCart.mutateAsync(cartItem.id)
            }
        return {
            children: 'ADD TO CART',
            onClick: () => {
                if (!currentUser.data) return navigate('/login')

                let price = quantity * product?.price,
                    discount = calculateDiscount(product?.price, 12, quantity)

                const cartItem = {
                    product_id: product?.id,
                    quantity,
                    size: itemsSize,
                    price,
                    discount
                }
                addToCart.mutateAsync(cartItem)
            }
        }
    }

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const title = {
        fontSize: 16,
        fontWeight: 600,
        lineHeight: 3,
        textTransform: 'capitalize'
    }

    const sizes = ['12x24', '24x48', '48x96']

    const handleChatWidget = () => {
        const user = connectedUsers.find(user => user?.user_id === sellerId)
        if (!currentUser.data) return navigate('/login')
        setChatWidget(true, true, { ...user, product_id: product?.id })
    }

    const handleSharing = () => {
        navigator.share({
            url: window.location.href
        })
            .then(() => console.log('link shared'))
            .catch((err) => console.log(err))
    }

    const [itemsSize, setSize] = useState([])
    const [more, setMore] = useState(false)

    useEffect(() => {
        if (product?.size) setSize(product.size[0])
    }, [product])

    let discountPrice = product ? product.price - ((product.price * product.discount) / 100) : 0
    let save = (product?.price * product?.discount) / 100

    return (
        <>
            <Grid container columnSpacing={8} p='0 3rem'>
                {/*--------------- LEFT ---------------*/}
                <Grid
                    item
                    xs={5}
                    display='grid'
                    gridTemplateRows='430px 1fr'
                    pt={2}
                    alignItems='start'
                    justifyItems='center'
                    gap={2}
                    position='sticky'
                    alignSelf='start'
                    top='2rem'
                >
                    {/* <Masonry columns={1}> */}
                    <div id='productImage--wrapper'>
                        <img id='productImage'
                            src={product?.images[defaultImg]?.url + '/tr:w-200'} alt=""
                        />
                    </div>
                    {/* </Masonry> */}
                    <div className="alt_images">
                        {
                            product?.images?.map((image, index) => (
                                <img key={index} onClick={() => setDefaultImg(index)} className={`alt_image ${defaultImg === index ? 'alt_image--active' : ''}`} src={image.url + '/tr:w-100'} alt="" />
                            ))
                        }
                    </div>
                </Grid>
                {/*--------------- MIDDLE ---------------*/}
                <Grid item xs display={'flex'} flexDirection='column' rowGap={3} >
                    <Box display='flex' alignItems='center' gap={1}>
                        {
                            isLoading || isFetching ?
                                <Skeleton width='70%' height={55} /> :
                                <>
                                    <Typography textTransform='capitalize' variant='h3' fontWeight={700}>{product?.name || <Skeleton width='60%' />}</Typography>
                                    <Box ml='auto' display={'flex'} gap={1} width={100}>
                                        {
                                            sellerId !== currentUser.data?.id &&
                                            <IconButton onClick={() => handleChatWidget()}>
                                                <ChatIcon {...IconButtonProps} />
                                            </IconButton>
                                        }
                                        <WishlistButton
                                            iconButton={<IconButton />}
                                            productId={product?.id}
                                            color='var(--brand)'
                                        />
                                        <IconButton
                                            onClick={handleSharing}
                                        >
                                            <ShareIcon {...IconButtonProps} />
                                        </IconButton>
                                    </Box>
                                </>
                        }
                    </Box>
                    <Box display='flex' alignItems='center' gap={1} mt={-2.5} fontWeight={500} >
                        by
                        {
                            isLoading || isFetching ?
                                <>
                                    <Skeleton variant="circular" width={28} height={28} />
                                    <Skeleton width={100} />
                                </> :
                                <SellerProfile seller={product?.sales_person} />
                        }
                    </Box>
                    <Box display='flex' alignItems='center' gap={1} >
                        <Rating readOnly icon={<StarIcon />} emptyIcon={<StarEmptyIcon />} name="read-only" value={product?.rating || 0} />
                        <Typography variant='text.grey'> {product?.rating || 0}&nbsp;</Typography>
                        <label id='bull'>&bull;</label>
                        <Typography variant='text.grey'> {product?.reviews.length || 0}&nbsp;Reviews</Typography>
                    </Box>
                    <Divider />
                    <Box position='relative'>
                        {
                            isLoading || isFetching ?
                                <Box display='flex' flexDirection='column' gap={0.5} mb={0.5} >
                                    <Skeleton width='100%' height={25} />
                                    <Skeleton width='100%' height={25} />
                                    <Skeleton width='100%' height={25} />
                                    <Skeleton width='100%' height={25} />
                                    <Skeleton width='70%' height={25} />
                                </Box> :
                                <>
                                    <Typography className={!more && 'noWrapLine'} variant='paragraph'>
                                        {product?.desc}
                                    </Typography>
                                    <IconButton
                                        onClick={() => setMore(s => !s)}
                                        size='small'
                                        sx={{
                                            position: 'absolute',
                                            right: -25,
                                            bottom: -3,
                                        }}>
                                        {more ? <UnfoldLessIcon fontSize='small' /> : <UnfoldMoreIcon fontSize='small' />}
                                    </IconButton>
                                </>
                        }
                    </Box>
                    <Box display='flex' alignItems='center' gap={2}>
                        Select size
                        {
                            isLoading || isFetching ?
                                <Chip
                                    label='0 x 0'
                                    size='large'
                                /> :
                                product?.size?.map((size, key) =>
                                    <Chip
                                        label={size}
                                        onClick={() => setSize(size)}
                                        color={itemsSize === size ? 'primary' : 'default'}
                                        size='large'
                                        key={key}
                                    />
                                )
                        }
                    </Box>
                    <Box display='flex' height={50} gap={2} alignItems='center'>
                        <Typography
                            lineHeight={1}
                            variant='h4'
                            fontWeight={700}
                        >
                            ₹{discountPrice}
                        </Typography>
                        {
                            product?.discount > 0 &&
                            <Box display='flex' alignItems='center' gap={2}>
                                <Typography
                                    fontWeight={800}
                                    color='var(--brand)'
                                    sx={{ bgcolor: '#5e47f921' }}
                                    borderRadius={2.5}
                                    px={1.5}
                                    py={1}
                                >{product?.discount}% OFF</Typography>
                                <Box display='flex' flexDirection='column' justifyContent='space-between'>
                                    <Typography
                                        lineHeight={1}
                                        variant='h6'
                                        sx={{ textDecoration: 'line-through', fontSize: 18, fontWeight: 700 }}
                                    >₹{product?.price}</Typography>
                                    <Typography
                                        lineHeight={1}
                                        variant='caption1'
                                        color='var(--brand)'
                                        sx={{ fontSize: 15, fontWeight: 600 }}
                                    >You will save ₹{save}</Typography>
                                </Box>
                            </Box>
                        }
                    </Box>
                    <Box display='flex' height={50} alignItems='center' gap={4} mt={1}>
                        <QuantityInput onChange={value => setQuantity(value)} />
                        <Box display='flex' alignItems='center' gap={4}>
                            <Button
                                {...handleCartButton()}
                                startIcon={<CartIcon />}
                                sx={{ borderRadius: 3, px: 5, py: 1.5 }}
                                variant='contained'
                            />
                        </Box>
                    </Box>
                    <div>
                        <Accordion className='noPadding'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography {...title}>SPECIFICATIONS</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ p: 0, mx: 1 }}>
                                <table style={{ width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <td><Typography variant='title.primary'>Category</Typography></td>
                                            <td><Typography variant='text.grey'>{product?.category?.name}</Typography></td>
                                        </tr>
                                        <tr>
                                            <td><Typography variant='title.primary'>Material</Typography></td>
                                            <td><Typography variant='text.grey'>{product?.material?.name}</Typography></td>
                                        </tr>
                                        <tr>
                                            <td><Typography variant='title.primary'>Stock</Typography></td>
                                            <td><Typography variant='text.grey'>{product?.quantity}</Typography></td>
                                        </tr>
                                        <tr>
                                            <td><Typography variant='title.primary'>Weight</Typography></td>
                                            <td><Typography variant='text.grey'>372g</Typography></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </AccordionDetails>
                        </Accordion >
                        <Accordion className='noPadding'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography {...title}>SHIPPING DETAILS</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='product_info'>
                                    <span className='product_info_items'>
                                        <Typography variant='title.primary'>Delivery :</Typography>
                                        <Typography variant='text.grey'>Shipping from kottayam, Kerala</Typography>
                                    </span>
                                    <span className='product_info_items'>
                                        <Typography variant='title.primary'>Shipping :</Typography>
                                        <Typography variant='text.grey'>Free International Shipping</Typography>
                                    </span>
                                    <span className='product_info_items'>
                                        <Typography variant='title.primary'>Arrive :</Typography>
                                        <Typography variant='text.grey'>Estimated arrival on 25 - 27 Oct  2023</Typography>
                                    </span>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    {/* <Divider/> */}
                    <Reviews product={product} />
                </Grid>
                <Divider sx={{ mt: 2 }} />

                {/*--------------- RIGHT ---------------*/}
                {/* <Grid item xs={6} />
                <Grid item xs={6} mt={5}>
                    <Reviews product={product} />
                </Grid> */}
            </Grid >
            {/* {
                currentUser.data !== null &&
                <>
                    <label className='recently_viewed' >Recently viewed</label>
                    <Tray height={230} data={currentUser.data?.recently_viewed?.map(o => o.product)} from='110%' to='-50%' parent='productContainer_wrapper' />
                </>
            } */}
        </>
    )
}

export default Product