import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './product.css'
import QuantityInput from '../QuantityInput/QuantityInput';
import Reviews from '../Reviews/Reviews';
import { Avatar, Badge, Box, Button, Divider, Grid, IconButton, Rating, Skeleton, Tab, Tabs, Typography } from '@mui/material';
import FloatingCart from '../FloatingCart/FloatingCart';
import { useCart } from '../../Hooks/useCart';
import useCurrentUser from '../../Hooks/useCurrentUser';
import Tray from '../ProductsTray/Tray'
import { useProduct } from '../../Hooks/useProducts';
import SellerProfile from './SellerProfile/SellerProfile';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShareIcon from '@mui/icons-material/Share';
import { Swiper, SwiperSlide, EffectCoverflow, Pagination, Mousewheel } from '../../lib/Swiper'

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

const dummy = [
    { src: "https://swiperjs.com/demos/images/nature-1.jpg", name: 'dadasdasdasd', price: 'Rs.500' },
    { src: "https://swiperjs.com/demos/images/nature-2.jpg", name: 'dadasdasdasd', price: 'Rs.500' },
    { src: "https://swiperjs.com/demos/images/nature-3.jpg", name: 'dadasdasdasd', price: 'Rs.500' },
    { src: "https://swiperjs.com/demos/images/nature-4.jpg", name: 'dadasdasdasd', price: 'Rs.500' },
    { src: "https://swiperjs.com/demos/images/nature-5.jpg", name: 'dadasdasdasd', price: 'Rs.500' },
    { src: "https://swiperjs.com/demos/images/nature-6.jpg", name: 'dadasdasdasd', price: 'Rs.500' },
    { src: "https://swiperjs.com/demos/images/nature-7.jpg", name: 'dadasdasdasd', price: 'Rs.500' },
    { src: "https://swiperjs.com/demos/images/nature-8.jpg", name: 'dadasdasdasd', price: 'Rs.500' },
    { src: "https://swiperjs.com/demos/images/nature-9.jpg", name: 'dadasdasdasd', price: 'Rs.500' }
]

function Product() {
    const [quantity, setQuantity] = useState(1)
    const [defaultImg, setDefaultImg] = useState(0)

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


    return (
        <>
            {/* {currentUser.data && <FloatingCart />} */}
            <Grid
                container
                columnSpacing={6}
                // rowSpacing={6}
                px={10}
            >
                <Grid item xs={12} display='flex' justifyContent='center'>
                    <Box
                        sx={{
                            position: 'relative',
                            width: '100%',
                            // maxWidth: '800px',
                            overflowX: 'clip',
                            py: 4,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            "::before,::after": {
                                content: '""',
                                position: 'absolute',
                                width: '230px',
                                height: '100%',
                                zIndex: 2
                            },
                            "::before": {
                                background: 'linear-gradient(90deg, white, transparent)',
                                left: 0
                            },
                            "::after": {
                                background: 'linear-gradient(-90deg, white, transparent)',
                                right: 0
                            }
                        }}
                    >
                        <Swiper
                            loop={true}
                            effect={"coverflow"}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={5}
                            mousewheel={true}
                            coverflowEffect={{
                                rotate: 0,
                                stretch: -200,
                                depth: 200,
                                modifier: 1,
                                slideShadows: false,
                                scale: 0.8
                            }}
                            modules={[EffectCoverflow, Pagination, Mousewheel]}
                            className="mySwiper"
                        >

                            {
                                dummy.map(({ src, name, price }, i) => (
                                    <SwiperSlide key={i}>
                                        <Box display='flex' flexDirection='column' gap={6} alignItems='center'>
                                            <img style={{ width: '100%', maxWidth: '300px' }} src={src} />
                                            {/* <Box display='flex' flexDirection='column' alignItems='center'>
                                                <Typography variant='h6' fontWeight={600}>{name}</Typography>
                                                <Typography color='GrayText' >{price}</Typography>
                                            </Box> */}
                                        </Box>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </Box>

                    {/* <img className='painting' style={{ width: '100%', maxWidth: '350px', maxHeight: '500px' }} src={product?.images[defaultImg].url + '/tr:w-200'} alt="" /> */}
                </Grid>
                {/*--------------- LEFT ---------------*/}
                <Grid
                    item
                    xs={4}
                    display={'flex'}
                    alignItems='flex-end'
                >
                    <Box
                        display={'flex'}
                        flexDirection='column'
                        width='100%'
                        height={220}
                        gap={2}
                    >
                        <label id='productTitle'>{product?.name || <Skeleton width='60%' />}</label>
                        <Rating sx={{ mt: -2 }} name="read-only" value={product?.rating || 0} readOnly />
                        <table>
                            <tbody>
                                <tr>
                                    <td><Typography fontWeight={700} fontSize={14}>CATEGORY</Typography></td>
                                    <td><Typography fontWeight={700} fontSize={14}>MATERIAL</Typography></td>
                                    <td><Typography fontWeight={700} fontSize={14}>Stock</Typography></td>
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
                        {/* <IconButton onClick={() => {
                            navigator.share({
                                url: window.location.href
                            })
                                .then(() => console.log('link shared'))
                                .catch((err) => console.log(err))
                        }} size='large'><ShareIcon color='primary' /></IconButton> */}
                    </Box>

                    {/* <Typography {...paragraph}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo quisquam enim dolorum. Magni enim obcaecati dicta, a quas reprehenderit hic!</Typography> */}

                    {/* <div id="rating">
                        <label id='bull' htmlFor="">&bull;</label>
                        <Typography {...style}> {product?.reviews.length || 0}&nbsp;Reviews</Typography>
                        <label id='bull' htmlFor="">&bull;</label>
                        <Typography {...style}> {product?.reviews.length || 0}&nbsp;Sold</Typography>
                    </div> */}
                    {/* <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab wrapped disableRipple label="About Item" value="1" />
                                <Tab wrapped disableRipple label="Shipping details" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel sx={{ padding: 0 }} value="1">
                            
                            <div style={{ margin: '1rem 0 2rem 0    ' }}>
                                <Typography {...title}>Description :</Typography>
                            </div>
                            <div>
                                <Typography {...title}>Seller :</Typography>
                            </div>
                        </TabPanel>
                        <TabPanel sx={{ padding: 0 }} value="2">
                            
                        </TabPanel>
                    </TabContext> */}
                </Grid>
                {/*--------------- MIDDLE ---------------*/}
                <Grid item xs={4} display='grid' justifyContent='center' alignItems='center'>
                    <div className="alt_images">
                        {
                            product?.images?.map((image, index) => (
                                <img key={index} onClick={() => setDefaultImg(index)} className={`alt_image ${defaultImg === index && 'active'}`} src={image.url + '/tr:w-100'} alt="" />
                            ))
                        }
                    </div>
                </Grid>
                {/*--------------- RIGHT ---------------*/}
                <Grid item xs={4} display='flex' alignItems='flex-end' >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'end',
                            flexDirection: 'column',
                            width: '100%',
                            height: 220,
                            gap: 2,
                        }}
                    >
                        {/* <Box
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
                        </Box> */}
                        <Box display='flex' alignItems='center' gap={2.5}>
                            <Typography fontSize='1.5em' color={'black'} fontWeight={600} >₹{product?.price || 0 * quantity}</Typography>
                            {/* <Button variant='outlined' sx={{ borderRadius: 500, px: 3, py: 1.2 }} size='small'>Buy Now</Button> */}
                            <Button {...handleCartButton()} sx={{ borderRadius: 500, px: 3, py: 1.2 }} variant='outlined' size='small' >Add to cart</Button>
                        </Box>
                        <Box display='flex' alignItems={'center'} gap={5}>
                            {/* <QuantityInput onChange={(value) => setQuantity(value)} /> */}
                            <Typography {...style}>Stock :</Typography>
                            <Typography {...style2}>{product?.quantity}</Typography>
                        </Box>

                    </Box>
                </Grid>
                <Grid item xs={12} py={2}>
                    <Section2 product={product} />
                </Grid>
                <Grid item xs={12}>
                    <Reviews product={product} />
                </Grid>
                {/* <Grid item xs={4} />
                <Grid item xs={8}>
                </Grid> */}
            </Grid >
            {/* {
                currentUser.data !== null &&
                <>
                    <label className='recently_viewed' htmlFor="">Recently viewed</label>
                    <Tray height={230} data={currentUser.data?.recently_viewed?.map(o => o.product)} from='110%' to='-50%' parent='productContainer_wrapper' />
                </>
            } */}
        </>
    )
}

export default Product

function Section2({ product }) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
                aria-label="secondary tabs example"
                // centered
                sx={{
                    borderTop: 1,
                    borderColor: 'divider',
                    pt: 2,
                }}
            >
                <Tab value={0} label="Description" {...a11yProps(0)} />
                <Tab value={1} label="Additional information" {...a11yProps(1)} />
                <Tab value={2} label="Seller" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis nisi ratione nesciunt, nulla unde sint eius quo voluptate architecto voluptatum? Harum id itaque eligendi perferendis eum tempora dolorem nemo fugit vitae debitis vel reprehenderit, quam illo cum dolorum eveniet nulla modi at necessitatibus ut praesentium aliquam quo repellendus. Eos sunt, voluptate suscipit, expedita consequatur, ducimus vel ut nemo aspernatur nihil ullam? Sunt possimus et ipsa, veritatis quam tempore odio doloribus qui porro, sed voluptas vero! Libero doloremque aliquam adipisci assumenda.
                </Typography>
            </TabPanel>
            <TabPanel value={value} index={1}>
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
            </TabPanel>
            <TabPanel value={value} index={2}>
                <SellerProfile product_id={product?.id} sellerId={product?.sales_person.id} />
            </TabPanel>
        </>
    )
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, minHeight: 150 }}>{children}</Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}