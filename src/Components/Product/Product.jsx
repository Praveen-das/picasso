import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './product.css'
import QuantityInput from '../QuantityInput/QuantityInput';
import Reviews from '../Reviews/Reviews';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip, Divider, Grid, IconButton, Rating, Skeleton, Typography } from '@mui/material';
import FloatingCart from '../FloatingCart/FloatingCart';
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


function Product() {
    const [quantity, setQuantity] = useState(1)
    const [defaultImg, setDefaultImg] = useState(0)
    const [seller, setSeller] = useState(null)

    const setChatWidget = useStore(s => s.setChatWidget);
    const connectedUsers = useStore(s => s.connectedUsers)

    const navigate = useNavigate()
    const { currentUser, addToRecentlyViewed } = useCurrentUser()
    const { addToCart, removeFromCart, cart: cart_items } = useCart()
    const [cart] = cart_items.data || [[]]

    const params = useParams()
    const { data: product } = useProduct(params?.product_id)

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
                    // size: itemsSize,
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

    const [itemsSize, setSize] = useState(sizes[0])

    const IconButtonProps = {
        fontSize: 'small',
        color: 'primary'
    }

    return (
        <>
            {/* {currentUser.data && <FloatingCart />} */}
            <Grid container columnSpacing={8} p='1rem 3rem'>
                {/*--------------- LEFT ---------------*/}
                <Grid
                    item
                    xs={6}
                    display='flex'
                    flexDirection='column'
                    pt={2}
                    alignItems='center'
                    gap={2}
                    position='sticky'
                    alignSelf='start'
                    top='2rem'
                >
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
                <Grid item xs={6} display={'flex'} flexDirection='column' rowGap={3} >
                    <Box display='flex' alignItems='center' gap={1}>
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
                    </Box>
                    <Box display='flex' alignItems='center' gap={1} mt={-2.5} fontWeight={500} >
                        by
                        <SellerProfile seller={product?.sales_person} />
                    </Box>
                    <Box display='flex' alignItems='center' gap={1} >
                        <Rating readOnly icon={<StarIcon />} emptyIcon={<StarEmptyIcon />} name="read-only" value={product?.rating || 0} />
                        <Typography variant='text.grey'> {product?.rating || 0}&nbsp;</Typography>
                        <label id='bull' htmlFor="">&bull;</label>
                        <Typography variant='text.grey'> {product?.reviews.length || 0}&nbsp;Reviews</Typography>
                    </Box>
                    <Divider />
                    <Typography variant='paragraph'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, doloribus perferendis ratione nisi rerum repellendus asperiores ab laboriosam. Rerum ratione maxime aut temporibus ex voluptas ut, ea quae iste nihil.
                    </Typography>
                    <Box display='flex' alignItems='center' gap={2}>
                        Select size
                        {
                            sizes.map((size, key) =>
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
                    <Box display='flex' gap={2} position='relative' alignItems='center'>
                        <Typography
                            lineHeight={1}
                            variant='h4'
                            fontWeight={700}
                        >
                            ₹{(product?.price - (product?.price * product?.discount) / 100 || 0) * quantity}
                        </Typography>
                        {
                            product?.discount > 0 &&
                            <Typography
                                lineHeight={1}
                                sx={{
                                    textDecoration: 'line-through',
                                    fontSize: 16,
                                    fontWeight: 600,
                                    position: 'absolute',
                                    bottom: -18,
                                    mb: 3
                                }}
                            >₹{product?.price || 0 * quantity}</Typography>
                        }
                        {
                            product?.discount > 0 &&
                            <Typography
                                fontWeight={800}
                                color='var(--brand)'
                                sx={{ bgcolor: '#5e47f921' }}
                                borderRadius={2.5}
                                px={1.5}
                                py={1}
                            >{product?.discount}% OFF</Typography>
                        }
                    </Box>
                    <Box display='flex' alignItems='center' gap={4} mt={1}>
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
                    {/* <Divider sx={{ mt: 2 }} /> */}
                    <div>
                        <Accordion >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography {...title}>SPECIFICATIONS</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
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
                        </Accordion>
                        <Accordion >
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
                    <label className='recently_viewed' htmlFor="">Recently viewed</label>
                    <Tray height={230} data={currentUser.data?.recently_viewed?.map(o => o.product)} from='110%' to='-50%' parent='productContainer_wrapper' />
                </>
            } */}
        </>
    )
}

export default Product