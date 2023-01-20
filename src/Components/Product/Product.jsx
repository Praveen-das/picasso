import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './product.css'
import QuantityInput from '../QuantityInput/QuantityInput';
import Reviews from '../Reviews/Reviews';
import { Avatar, Badge, Box, Button, Divider, Grid, IconButton, Rating, Skeleton, Tab, Typography } from '@mui/material';
import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab';
import FloatingCart from '../FloatingCart/FloatingCart';
import { useCart } from '../../Hooks/useCart';
import useUserData from '../../Hooks/useUserData';
import Tray from '../ProductsTray/Tray'
import { useProduct } from '../../Hooks/useProducts';
import BreadCrumb from '../Breadcrumbs/BreadCrumbs';
import SellerProfile from './SellerProfile/SellerProfile';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShareIcon from '@mui/icons-material/Share';

function Product() {
    const [quantity, setQuantity] = useState(1)
    const [defaultImg, setDefaultImg] = useState(0)

    const navigate = useNavigate()
    const { currentUser, addToRecentlyViewed } = useUserData()
    const { addToCart, removeFromCart, cart: cart_items } = useCart()
    const [cart] = cart_items.data || [[]]

    const params = useParams()
    const { data: product } = useProduct(params?.product_id)

    useEffect(() => {
        if (currentUser.isLoading) return
        if (currentUser.data === null) return
        if (!product) return

        const rv = currentUser.data?.recently_viewed
        if (rv?.find(({ product_id }) => product_id === product?.id)) return

        let timer = setTimeout(async () => {
            await addToRecentlyViewed.mutateAsync(product?.id)
        }, 300)

        return (() => clearTimeout(timer))
    }, [currentUser, product])

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
        color: 'black',
        fontSize: 15,
        fontWeight: 700,
        variant: 'subtitle2',
        textTransform: 'capitalize'
    }
    const title = {
        fontSize: 16,
        color: 'black',
        fontWeight: 600,
        lineHeight: 3,
        textTransform: 'capitalize'
    }

    const paragraph = {
        variant: 'subtitle2',
        lineHeight: 1.8,
        fontSize: 15,
        color: 'GrayText',

    }

    return (
        <>
            <BreadCrumb paths={['shop', product?.category.name, product?.name]} />
            {/* {currentUser.data && <FloatingCart />} */}
            <Grid container columnSpacing={6} rowSpacing={6} px={8}>
                {/*--------------- LEFT ---------------*/}
                <Grid item xs={4} display='grid' alignSelf='flex-start' position={'sticky'} top='4rem' gap={2}>
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
                <Grid item display={'flex'} flexDirection='column' gap={2} xs={5}>
                    <Box display='flex' alignItems='center' justifyContent='space-between'>
                        <label id='productTitle'>{product?.name || <Skeleton width='60%' />}</label>
                        <IconButton onClick={() => {
                            navigator.share({
                                url: window.location.href
                            })
                                .then(() => console.log('link shared'))
                                .catch((err) => console.log(err))
                        }} size='large'><ShareIcon color='primary' /></IconButton>
                    </Box>
                    <div id="rating">
                        <Rating name="read-only" value={product?.rating || 0} readOnly />
                        <label id='bull' htmlFor="">&bull;</label>
                        <Typography {...style}> {product?.reviews.length || 0}&nbsp;Reviews</Typography>
                        <label id='bull' htmlFor="">&bull;</label>
                        <Typography {...style}> {product?.reviews.length || 0}&nbsp;Sold</Typography>
                    </div>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab wrapped disableRipple label="About Item" value="1" />
                                <Tab wrapped disableRipple label="Shipping details" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel sx={{ padding: 0 }} value="1">
                            <div className='product_info'>
                                <div className='product_info_items'>
                                    <Typography {...style}>Category :</Typography>
                                    <Typography {...style2}>{product?.category.name}</Typography>
                                </div>
                                <div className='product_info_items'>
                                    <Typography {...style}>Color :</Typography>
                                    <Typography {...style2}>Cyan</Typography>
                                </div>
                                <div className='product_info_items'>
                                    <Typography {...style}>Material :</Typography>
                                    <Typography {...style2}>Cotton</Typography>
                                </div>
                                <div className='product_info_items'>
                                    <Typography {...style}>Stock :</Typography>
                                    <Typography {...style2}>{product?.quantity}</Typography>
                                </div>
                            </div>
                            <div style={{ margin: '1rem 0 2rem 0    ' }}>
                                <Typography {...title}>Description :</Typography>
                                <Typography {...paragraph}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo quisquam enim dolorum. Magni enim obcaecati dicta, a quas reprehenderit hic!</Typography>
                            </div>
                            <div>
                                <Typography {...title}>Seller :</Typography>
                                <SellerProfile seller={product?.sales_person} />
                            </div>
                            {/* <p id='productDescription'>{product?.desc}</p> */}
                        </TabPanel>
                        <TabPanel sx={{ padding: 0 }} value="2">
                            <div className='shipping_info'>
                                <div className='product_info_items'>
                                    <Typography {...style}>Delivery :</Typography>
                                    <Typography {...style2}>Shipping from kottayam, Kerala</Typography>
                                </div>
                                <div className='product_info_items'>
                                    <Typography {...style}>Shipping :</Typography>
                                    <Typography {...style2}>Free International Shipping</Typography>
                                </div>
                                <div className='product_info_items'>
                                    <Typography {...style}>Arrive :</Typography>
                                    <Typography {...style2}>Estimated arrival on 25 - 27 Oct  2023</Typography>
                                </div>
                            </div>
                        </TabPanel>
                    </TabContext>
                    {/* <div id="buyItem">
                            <QuantityInput onChange={(value) => setQuantity(value)} />
                            <label id='productPrice'>Rs. {product?.price * quantity}</label>
                        </div>
                        <LoadingButton sx={{ width: '100%', maxWidth: '250px', padding: '10px', mt: '15px' }} loading={loading} variant='contained' {...handleCartButton()} />
                        <Typography mt={2} variant='overline' fontSize={'0.9rem'} >Free Shipping on orders above Rs.2000 </Typography> */}
                </Grid>

                {/*--------------- RIGHT ---------------*/}
                <Grid item xs={3} display='flex' flexDirection='column' rowGap={4}>
                    <Box
                        boxSizing='border-box'
                        display='grid'
                        alignItems='center'
                        gridTemplateColumns='1fr 1fr'
                        color='white'
                        width="100%"
                        bgcolor={'var(--brand)'}
                        borderRadius={'10px'}
                        padding='1rem 1.5rem'
                    >
                        <Typography fontWeight={600} variant='h6'>25% OFF</Typography>
                        <Typography fontSize={13} sx={{ gridRow: 'span 2', bgcolor: '#ffffff23', p: '10px 8px', borderRadius: 2 }}>Until Oct 30, 2022</Typography>
                        <Typography variant='caption'>If order above $120</Typography>
                    </Box>
                    <Typography
                        fontSize={18}
                        color={'black'}
                        fontWeight={700}
                        textTransform='capitalize'
                    >Set Order</Typography>
                    <Box display='grid' gridTemplateColumns='auto 1fr' columnGap={2}>
                        <img style={{ gridRow: 'span 2', borderRadius: 10 }} width={100} src={product?.images[defaultImg].url + '/tr:w-200'} alt="" />
                        <Typography {...style}>Selected Size</Typography>
                        <Typography {...style2}>12x5</Typography>
                    </Box>
                    <Box marginLeft={-0.5} display='flex' alignItems={'center'} justifyContent={'space-between'}>
                        <QuantityInput onChange={(value) => setQuantity(value)} />
                        <div className='product_info_items'>
                            <Typography {...style}>Stock :</Typography>
                            <Typography {...style2}>{product?.quantity}</Typography>
                        </div>
                    </Box>
                    <Box display='flex' alignItems={'center'} justifyContent={'space-between'}>
                        <Typography
                            fontSize={16}
                            color={'black'}
                            fontWeight={700}
                            textTransform='capitalize'
                        >Total price :</Typography>
                        <Typography fontSize='1.5em' color={'black'} fontWeight={600} >{product?.price * quantity}</Typography>
                    </Box>
                    <Box display={'grid'} gap={1.5}>
                        <Button sx={{ borderRadius: 2, py: 1.4 }} size='small' variant='contained'>Buy Now</Button>
                        <Button {...handleCartButton()} sx={{ borderRadius: 2, py: 1.4 }} size='small' variant='outlined' startIcon={<AddShoppingCartIcon />}>Add to cart</Button>
                    </Box>
                    <Box display='flex' alignItems={'center'} justifyContent={'space-between'}>
                        {/* <Link> */}
                        {/* <Typography fontSize='1.5em' fontWeight={600} >$45.00</Typography> */}
                    </Box>
                </Grid>
                <Grid item xs={4} />
                <Grid item xs={8}>
                    <Reviews product={product} />
                </Grid>
            </Grid>
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