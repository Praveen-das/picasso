import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './product.css'
import Reviews from '../Reviews/Reviews';
import { Box, Button, Divider, Grid, IconButton, Rating, Skeleton, Typography } from '@mui/material';
// import makeStyles from '@mui/styles';
import { useCart } from '../../Hooks/useCart';
import useCurrentUser from '../../Hooks/useCurrentUser';
import { useProduct } from '../../Hooks/useProducts';
import SellerProfile from './SellerProfile/SellerProfile';
import CartIcon from '@mui/icons-material/ShoppingCartOutlined';
import RemoveShoppingCart from '@mui/icons-material/RemoveShoppingCartOutlined';
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
import ShoppingIcon from '@mui/icons-material/ShoppingBagOutlined';

const IconButtonProps = {
    fontSize: 'small',
    color: 'primary'
}

const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Data fetched successfully!');
        }, 5000); // Simulating a delay
    });
};


const Product = () => {
    const [quantity, setQuantity] = useState(1)
    const [defaultImg, setDefaultImg] = useState(0)
    const [seller, setSeller] = useState(null)

    const setChatWidget = useStore(s => s.setChatWidget);
    const connectedUsers = useStore(s => s.connectedUsers)

    const navigate = useNavigate()
    const { currentUser, addToRecentlyViewed } = useCurrentUser()
    const { addToCart, removeFromCart, cart: { data: [cart] = [] } } = useCart()

    const { product_id } = useParams()
    const { data: product, isFetching, isLoading } = useProduct(product_id)

    const sellerId = product?.sales_person?.id

    let OneInchInCM = 2.54
    let artworkWidthInCM = Math.round((product?.widthInInches * OneInchInCM) * 10) / 10
    let artworkHeightInCM = Math.round((product?.heightInInches * OneInchInCM) * 10) / 10
    let artworkSize = `${product?.widthInInches} X ${product?.heightInInches} in | ${artworkWidthInCM} X ${artworkHeightInCM} cm`

    const handleCartButton = () => {
        const cartItem = cart?.find((o) => o.product_id === product?.id)

        if (cartItem)
            return {
                children: 'Remove from cart',
                startIcon: <RemoveShoppingCart />,
                onClick: () => removeFromCart.mutateAsync(cartItem.id)
            }
        return {
            children: 'Add to cart',
            startIcon: <CartIcon />,
            onClick: () => {
                if (!currentUser.data) return navigate('/login')

                let price = quantity * product?.price,
                    discount = calculateDiscount(product?.price, 12, quantity)

                const cartItem = {
                    product_id: product?.id,
                    quantity,
                    price,
                    discount
                }
                addToCart.mutateAsync(cartItem)
            }
        }
    }

    const title = {
        fontSize: 18,
        fontWeight: 600,
        textTransform: 'capitalize',
        lineHeight: 4
    }

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

    const [more, setMore] = useState(false)

    let discountPrice = product ? product.price - ((product.price * product.discount) / 100) : 0

    return (
        <>
            <Grid container spacing={8} p='0 3rem'>
                {/*--------------- LEFT ---------------*/}
                <Grid item xs={12} mt={2}>
                    <img id='productImage'
                        src={product?.images[defaultImg]?.url + '/tr:w-200'} alt=""
                    />
                </Grid>
                {/*--------------- RIGHT ---------------*/}
                <Grid container item xs={12}>
                    <Grid container item xs={12} spacing={2} >
                        <Grid item xs display={'flex'} flexDirection='column' rowGap={3}>
                            <Box display='flex' alignItems='center' gap={1}>
                                {
                                    isLoading || isFetching ?
                                        <Skeleton width='70%' height={55} /> :
                                        <Typography textTransform='capitalize' variant='h3' fontWeight={700}>{product?.name || <Skeleton width='60%' />}</Typography>
                                }
                            </Box>
                            <Box display='flex' alignItems='center' gap={1} mt={-2} fontWeight={500} >
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
                                <Box display={'flex'} gap={1}>
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
                            </Box>
                        </Grid>
                        <Grid item xs='auto' display={'flex'} flexDirection='column' alignItems='end'>
                            <Box display='flex' height={50} gap={2} ml='auto' alignItems='end'>
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
                                        <Typography
                                            lineHeight={1}
                                            color='grey'
                                            variant='h6'
                                            sx={{ textDecoration: 'line-through', fontSize: 16, fontWeight: 600 }}
                                        >₹{product?.price}</Typography>
                                    </Box>
                                }
                            </Box>
                            <Box display='flex' alignItems='center' my='auto' gap={2}>
                                <Button sx={{ textTransform: 'none' }} variant='outlined' size='large' {...handleCartButton()} color='primary' />
                                <Button
                                    variant='contained'
                                    size='large'
                                    startIcon={<ShoppingIcon fontSize='small' />}
                                    sx={{ textTransform: 'none' }}

                                >
                                    Buy Now
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid container item xs={7}>
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        "table": {
                                            lineHeight: 1.8
                                        }
                                    }}
                                >
                                    <Typography {...title}>SPECIFICATIONS</Typography>
                                    <table style={{ width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td><Typography variant='title.primary'>Medium</Typography></td>
                                                <td><Typography variant='text.grey'>{product?.sub_category?.name}</Typography></td>
                                            </tr>
                                            <tr>
                                                <td><Typography variant='title.primary'>Style</Typography></td>
                                                <td><Typography variant='text.grey'>{product?.style?.name}</Typography></td>
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
                                                <td><Typography variant='title.primary'>Size</Typography></td>
                                                <td><Typography variant='text.grey'>{artworkSize}</Typography></td>
                                            </tr>
                                            <tr>
                                                <td><Typography variant='title.primary'>Delivery :</Typography></td>
                                                <td><Typography variant='text.grey'>Shipping from kottayam, Kerala</Typography></td>
                                            </tr>
                                            <tr>
                                                <td><Typography variant='title.primary'>Shipping :</Typography></td>
                                                <td><Typography variant='text.grey'>Free International Shipping</Typography></td>
                                            </tr>
                                            <tr>
                                                <td><Typography variant='title.primary'>Arrive :</Typography></td>
                                                <td><Typography variant='text.grey'>Estimated arrival on 25 - 27 Oct  2023</Typography></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
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
                                                <Typography {...title}>DESCRIPTION</Typography>
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
                            </Grid>
                        </Grid>
                        <Grid item xs mt={2}>
                            <Reviews product={product} />
                        </Grid>
                        {/* <Grid item xs={12}>
                            <Divider />
                        </Grid> */}

                    </Grid>
                </Grid>

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