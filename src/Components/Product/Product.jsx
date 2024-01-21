import React, { useEffect, useState } from 'react'
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
import { useStore } from '../../Store/Store';
import StarEmptyIcon from '@mui/icons-material/StarBorderRounded';
import StarIcon from '@mui/icons-material/StarRounded';
import WishlistButton from '../Ui/WishlistButton/WishlistButton'
import UnfoldMoreIcon from '@mui/icons-material/ExpandMore';
import UnfoldLessIcon from '@mui/icons-material/ExpandLess';
import ShoppingIcon from '@mui/icons-material/ShoppingBagOutlined';
import { ShareButton } from '../Ui/ShareButton/ShareButton';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton'

const IconProps = {
    fontSize: 'small',
    color: 'primary'
}

const Product = () => {
    const navigate = useNavigate()
    const { product_id } = useParams()
    const setChatWidget = useStore(s => s.setChatWidget);
    const connectedUsers = useStore(s => s.connectedUsers)

    const { currentUser } = useCurrentUser()
    const { addToCart, removeFromCart, cart: { data: [cart] = [], ...cartApi } } = useCart(currentUser.data)
    const { data: product, ...productApi } = useProduct(product_id)

    const cartItem = cart?.find((o) => o.product_id === product?.id)
    const sellerId = product?.sales_person?.id

    let OneInchInCM = 2.54
    let artworkWidthInCM = Math.round((product?.widthInInches * OneInchInCM) * 10) / 10
    let artworkHeightInCM = Math.round((product?.heightInInches * OneInchInCM) * 10) / 10
    let artworkSize = `${product?.widthInInches} X ${product?.heightInInches} in | ${artworkWidthInCM} X ${artworkHeightInCM} cm`

    const _addToCart = () => {
        if (!currentUser.data) return navigate('/login')
        if (addToCart.isLoading || removeFromCart.isLoading) return

        const data = {
            product_id: product?.id,
            quantity: 1,
            price: product?.price,
            discount: product?.discount
        }

        addToCart.mutateAsync(data)
    }

    const _removeFromCart = () => removeFromCart.mutateAsync(cartItem.id)

    const cartButtonProps = {
        children: cartItem ? <RemoveShoppingCart /> : <CartIcon />,
        onClick: cartItem ? _removeFromCart : _addToCart,
        // loading:
        //     addToCart.isLoading ||
        //     removeFromCart.isLoading ||
        //     productApi.isLoading ||
        //     productApi.isFetching ||
        //     cartApi.isLoading ||
        //     cartApi.isFetching,
    }

    const handleCheckout = () => {
        const data = {
            product_id: product?.id,
            quantity: 1,
            price: product?.price,
            discount: product?.discount
        }

        if (cartItem)
            return navigate('/checkout')
        addToCart.mutateAsync(data)
            .then(() => {
                navigate('/checkout')
            })
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

    const [more, setMore] = useState(false)

    let discountPrice = product ? product.price - ((product.price * product.discount) / 100) : 0

    return (
        <>
            <Grid container spacing={8} p='0 3rem'>
                {/*--------------- LEFT ---------------*/}
                <Grid item xs={12} mt={2}>
                    {
                        product &&
                        <img
                            id='productImage'
                            src={process.env.REACT_APP_IMAGEKIT_BASEURL + product?.images?.[0]?.filePath}
                            alt={product?.name}
                        />
                    }
                </Grid>
                {/*--------------- RIGHT ---------------*/}
                <Grid container item xs={12}>
                    <Grid container item xs={12} spacing={2} >
                        <Grid item xs display={'flex'} flexDirection='column' rowGap={3}>
                            <Box display='flex' alignItems='center' gap={1}>
                                {
                                    productApi.isLoading ||
                                        productApi.isFetching ?
                                        <Skeleton width='70%' height={55} /> :
                                        <Typography textTransform='capitalize' variant='h3' fontWeight={700}>{product?.name || <Skeleton width='60%' />}</Typography>
                                }
                            </Box>
                            <Box display='flex' alignItems='center' gap={1} mt={-2} fontWeight={500} >
                                by
                                {
                                    productApi.isLoading ||
                                        productApi.isFetching ?
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
                                            <ChatIcon {...IconProps} />
                                        </IconButton>
                                    }
                                    <WishlistButton
                                        iconButton={<IconButton />}
                                        productId={product?.id}
                                        color='var(--brand)'
                                    />
                                    <ShareButton props={IconProps} />
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
                                <LoadingButton
                                    sx={{ textTransform: 'none' }}
                                    variant='outlined' size='large'
                                    color='primary'
                                    {...cartButtonProps}
                                />
                                <Button
                                    disabled={productApi.isLoading || productApi.isFetching}
                                    variant='contained'
                                    size='large'
                                    startIcon={<ShoppingIcon fontSize='small' />}
                                    sx={{ textTransform: 'none' }}
                                    onClick={() => handleCheckout()}
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
                                                <td><Typography variant='title.secondary'>Medium</Typography></td>
                                                <td><Typography variant='text.grey'>{product?.sub_category?.name}</Typography></td>
                                            </tr>
                                            <tr>
                                                <td><Typography variant='title.secondary'>Style</Typography></td>
                                                <td><Typography variant='text.grey'>{product?.style?.name}</Typography></td>
                                            </tr>
                                            <tr>
                                                <td><Typography variant='title.secondary'>Material</Typography></td>
                                                <td><Typography variant='text.grey'>{product?.material?.name}</Typography></td>
                                            </tr>
                                            <tr>
                                                <td><Typography variant='title.secondary'>Stock</Typography></td>
                                                <td><Typography variant='text.grey'>{product?.quantity}</Typography></td>
                                            </tr>
                                            <tr>
                                                <td><Typography variant='title.secondary'>Size</Typography></td>
                                                <td><Typography variant='text.grey'>{artworkSize}</Typography></td>
                                            </tr>
                                            <tr>
                                                <td><Typography variant='title.secondary'>Delivery :</Typography></td>
                                                <td><Typography variant='text.grey'>Shipping from kottayam, Kerala</Typography></td>
                                            </tr>
                                            <tr>
                                                <td><Typography variant='title.secondary'>Shipping :</Typography></td>
                                                <td><Typography variant='text.grey'>Free International Shipping</Typography></td>
                                            </tr>
                                            <tr>
                                                <td><Typography variant='title.secondary'>Arrive :</Typography></td>
                                                <td><Typography variant='text.grey'>Estimated arrival on 25 - 27 Oct  2023</Typography></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box position='relative'>
                                    {
                                        productApi.isLoading || productApi.isFetching ?
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
        </>
    )
}

export default Product

