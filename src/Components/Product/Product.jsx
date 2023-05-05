import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './product.css'
import QuantityInput from '../QuantityInput/QuantityInput';
import Reviews from '../Reviews/Reviews';
import { Avatar, Badge, Box, Button, Container, Divider, Grid, IconButton, Rating, Skeleton, Tab, Tabs, Typography } from '@mui/material';
import FloatingCart from '../FloatingCart/FloatingCart';
import { useCart } from '../../Hooks/useCart';
import useCurrentUser from '../../Hooks/useCurrentUser';
import Tray from '../ProductsTray/Tray'
import { useProduct } from '../../Hooks/useProducts';
import SellerProfile from './SellerProfile/SellerProfile';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShareIcon from '@mui/icons-material/Share';
import ChatIcon from '@mui/icons-material/Chat';
import { useStore } from '../../Context/Store';

function Product() {
    const [quantity, setQuantity] = useState(1)
    const [defaultImg, setDefaultImg] = useState(0)

    const setChatWidget = useStore(s => s.setChatWidget);
    const navigate = useNavigate()
    const { currentUser, addToRecentlyViewed } = useCurrentUser()
    const { addToCart, removeFromCart, cart: cart_items } = useCart()
    const [cart] = cart_items.data || [[]]

    const params = useParams()
    const { data: product } = useProduct(params?.product_id)

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
                addToCart.mutateAsync({
                    product_id: product?.id,
                    quantity,
                    price: quantity * product?.price,
                    discount: product?.discount
                })
            }
        }
    }

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const style = {
        fontSize: 15,
        color: 'GrayText',
        fontWeight: 500,
        variant: 'subtitle2',
    }
    const style2 = {
        fontSize: 15,
        fontWeight: 700,
        variant: 'subtitle2',
        textTransform: 'capitalize'
    }

    const title = {
        fontSize: 16,
        fontWeight: 600,
        lineHeight: 3,
        textTransform: 'capitalize'
    }

    const paragraph = {
        variant: 'subtitle2',
        lineHeight: 1.8,
        fontSize: 15,
    }

    const sizes = ['12x24', '24x48', '48x96']

    const handleSharing = () => {
        navigator.share({
            url: window.location.href
        })
            .then(() => console.log('link shared'))
            .catch((err) => console.log(err))
    }

    const handleChatWidget = () => {
        // if (!currentUser.data) return navigate('/login')
        // setChatWidget(!open, true, { ...seller, product_id })
    }

    return (
        <>
            {/* {currentUser.data && <FloatingCart />} */}
            <Grid container columnSpacing={8} p='1rem 3rem'>
                {/*--------------- LEFT ---------------*/}
                <Grid item xs={4.5} display='flex' flexDirection='column' pt={2} alignItems='center' gap={2}>
                    <img id='productImage' src={product?.images[defaultImg].url + '/tr:w-200'} alt="" />
                    <div className="alt_images">
                        {
                            product?.images?.map((image, index) => (
                                <img key={index} onClick={() => setDefaultImg(index)} className={`alt_image ${defaultImg === index && 'active'}`} src={image.url + '/tr:w-100'} alt="" />
                            ))
                        }
                    </div>
                </Grid>
                {/*--------------- MIDDLE ---------------*/}
                <Grid item xs={4} display={'flex'} flexDirection='column' rowGap={2} >
                    <Typography textTransform='capitalize' variant='h4' fontWeight={600}>{product?.name || <Skeleton width='60%' />}</Typography>
                    <Box display='flex' alignItems='center' gap={1} fontWeight={500}>
                        by
                        <Typography component='a' textTransform='capitalize' fontWeight={600}>{product?.sales_person.displayName}</Typography>
                    </Box>
                    <div id="rating">
                        <Rating name="read-only" value={product?.rating || 0} readOnly />
                        <label id='bull' htmlFor="">&bull;</label>
                        <Typography {...style}> {product?.reviews.length || 0}&nbsp;Reviews</Typography>
                    </div>
                    <table style={{ width: '100%' }}>
                        <tbody>
                            <tr>
                                <td><Typography fontWeight={700} fontSize={14}>CATEGORY</Typography></td>
                                <td><Typography fontWeight={700} fontSize={14}>MATERIAL</Typography></td>
                                <td><Typography fontWeight={700} fontSize={14}>STOCK</Typography></td>
                            </tr>
                            <tr>
                                <td><Typography color='GrayText' fontWeight={600} fontSize={14}>{product?.category?.name}</Typography></td>
                                <td><Typography color='GrayText' fontWeight={600} fontSize={14}>{product?.material?.name}</Typography></td>
                                <td>
                                    <Typography {...style}>{product?.quantity}</Typography>
                                    {/* <Typography color='GrayText' fontWeight={600} fontSize={14}>{product?.width} x {product?.height}</Typography> */}
                                </td>

                            </tr>
                        </tbody>
                    </table>
                    <Box>
                        <Typography {...title}>Description</Typography>
                        <Typography {...paragraph}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, doloribus perferendis ratione nisi rerum repellendus asperiores ab laboriosam. Rerum ratione maxime aut temporibus ex voluptas ut, ea quae iste nihil.
                        </Typography>
                    </Box>
                    {/* <Box>
                        <Typography {...title}>Seller</Typography>
                        <SellerProfile product_id={product?.id} sellerId={product?.sales_person.id} />
                    </Box> */}
                    <Box>
                        <Typography {...title}>Additional information</Typography>
                        <div className='product_info'>
                            <span className='product_info_items'>
                                <Typography {...style2}>Delivery :</Typography>
                                <Typography {...style}>Shipping from kottayam, Kerala</Typography>
                            </span>
                            <span className='product_info_items'>
                                <Typography {...style2}>Shipping :</Typography>
                                <Typography {...style}>Free International Shipping</Typography>
                            </span>
                            <span className='product_info_items'>
                                <Typography {...style2}>Arrive :</Typography>
                                <Typography {...style}>Estimated arrival on 25 - 27 Oct  2023</Typography>
                            </span>
                        </div>
                    </Box>
                </Grid>

                {/*--------------- RIGHT ---------------*/}
                <Grid item xs={3.5} display={'flex'} flexDirection='column' rowGap={4}>
                    <Box
                        boxSizing='border-box'
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        gap={2}
                        color='white'
                        bgcolor={'var(--brand)'}
                        borderRadius={'10px'}
                        padding='1rem 1.5rem'
                    >
                        <Typography fontWeight={600} variant='h6'>25% OFF</Typography>
                        <Typography fontSize={12} sx={{ bgcolor: '#ffffff23', p: '10px 15px', borderRadius: 2 }}>Until Oct 30, 2022</Typography>
                    </Box>
                    <Box display='flex' alignItems='center' gap={1}>
                        <Typography {...style} >Select size</Typography>
                        {
                            sizes.map(size => (
                                <Box
                                    display='flex'
                                    justifyContent='center'
                                    alignItems='center'
                                    boxShadow='0px 4px 20px #d1d1d1'
                                    bgcolor='white'
                                    p='0.2rem 1rem'
                                    borderRadius='10px'
                                    sx={{
                                        transition: '0.2s',
                                        backdropFilter: 'blur(10px)',
                                        ":hover": {
                                            bgcolor: 'var(--overlay)',
                                            color: 'white',
                                            boxShadow: '0px 4px 5px #d1d1d1',
                                            translate: '0 -5px'
                                        }
                                    }}
                                >
                                    <Typography sx={{ pointerEvents: 'none' }} fontFamily='Bebas Neue' >{size}</Typography>
                                </Box>
                            ))
                        }
                    </Box>
                    <Box display='flex' alignItems='center' gap={4}>
                        <Button {...handleCartButton()} sx={{ borderRadius: 500, px: 3, py: 1.2 }} variant='contained' size='small' >Add to cart</Button>
                        <Box>
                            <Typography lineHeight={1} fontSize='1.5em' color={'black'} fontWeight={600} >₹{product?.price - (product?.price * 25) / 100 || 0 * quantity}</Typography>
                            <Typography lineHeight={1} sx={{ ...style, textDecoration: 'line-through', fontSize: 14, fontWeight: 500 }} >₹{product?.price || 0 * quantity}</Typography>
                        </Box>
                    </Box>
                    <Box display='flex' gap={4}>
                        <Button onClick={handleChatWidget} startIcon={<ChatIcon />} size='small'>Chat Seller</Button>
                        <Button onClick={handleSharing} startIcon={<ShareIcon />} size='small'>Share Product</Button>
                    </Box>
                    {/* <Typography
                        fontSize={18}
                        color={'black'}
                        fontWeight={700}
                        textTransform='capitalize'
                    >Set Order</Typography> */}

                    {/* <Box marginLeft={-0.5} display='flex' alignItems={'center'} justifyContent={'space-between'}>
                        <QuantityInput onChange={(value) => setQuantity(value)} />
                        <div className='product_info_items'>
                            <Typography {...style}>Stock :</Typography>
                            <Typography {...style2}>{product?.quantity}</Typography>
                        </div>
                    </Box> */}
                    {/* <Box display='flex' alignItems={'center'} justifyContent={'space-between'}>
                        <Typography
                            fontSize={16}
                            color={'black'}
                            fontWeight={700}
                            textTransform='capitalize'
                        >Total price :</Typography>
                        <Typography fontSize='1.5em' color={'black'} fontWeight={600} >{product?.price || 0 * quantity}</Typography>
                    </Box> */}

                </Grid >

                <Grid item xs={12} mt={5}>
                    <Reviews product={product} />
                </Grid>
            </Grid >
            {
                currentUser.data !== null &&
                <>
                    <label className='recently_viewed' htmlFor="">Recently viewed</label>
                    <Tray height={230} data={currentUser.data?.recently_viewed?.map(o => o.product)} from='110%' to='-50%' parent='productContainer_wrapper' />
                </>
            }
        </>
    )
}

export default Product