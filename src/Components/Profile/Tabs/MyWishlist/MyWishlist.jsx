import { Box, Chip, Divider, Grid, IconButton, Rating, Typography } from '@mui/material';
import React, { Fragment } from 'react'
import '../../../Checkout/Components/Products/products.css'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { calculateDiscount } from '../../../../Utils/utils';
import StarEmptyIcon from '@mui/icons-material/StarBorderRounded';
import StarIcon from '@mui/icons-material/StarRounded';
import { Link } from 'react-router-dom';
import EmptyWishlist from './EmptyWishlist';
import useWishlist from '../../../../Hooks/useWishlist'
import useCurrentUser from '../../../../Hooks/useCurrentUser';

function MyWishlist() {
    const { currentUser: { data, isLoading, isFetching } } = useCurrentUser();
    const { removeFromWishlist } = useWishlist()
    const wishlist = data?.wishlist

    if (!wishlist?.length) return <EmptyWishlist />
    return (
        <>
            <Grid item xs={12} display='grid' px={2} gap={3}>
                <Grid item xs={12} ml={-2} mb={1}>
                    <Typography variant="tabTitle">
                        My Wishlist - {wishlist?.length}
                    </Typography>
                </Grid>
                {
                    wishlist?.map(({ id, product }, key) =>
                        <Fragment key={product?.id}>
                            <Box position='relative' display='flex' gap={4}>
                                <Box position='absolute' top={5} right={5} zIndex={100}>
                                    <IconButton
                                        onClick={(e) => {
                                            e.preventDefault()
                                            removeFromWishlist.mutate(id)
                                        }}
                                    >
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                </Box>
                                {/* /////////////////// */}
                                <img className='img_border' width={100} height={100} src={product.images[0].url + '/tr:w-100'} alt="" />
                                <Box display='flex' flexDirection='column'>
                                    <Link to={`/shop/product/${product?.id}`}>
                                        <Typography variant='paragraph'>{product.name}</Typography>
                                    </Link >
                                    <Box display='flex' gap={1} color='grey' mt={0.25} fontWeight={500}>
                                        <Rating size='small' readOnly icon={<StarIcon fontSize='small' />} emptyIcon={<StarEmptyIcon fontSize='small' />} name="read-only" value={product?.rating || 0} />
                                        ({product?.rating || 0})
                                    </Box>
                                    <Box display='flex' gap={1} mt='auto'>
                                        <Box display='flex' alignItems='baseline' gap={2}>
                                            {
                                                product?.discount > 0 &&
                                                <Typography color='grey' sx={{ textDecoration: 'line-through' }} fontSize={14} fontWeight={400}>
                                                    ₹{product.price}
                                                </Typography>
                                            }
                                            <Typography fontWeight={700} fontSize={18}>
                                                ₹{product.price - calculateDiscount(product.price, product.discount)}
                                            </Typography>
                                        </Box>
                                        {
                                            product?.discount > 0 &&
                                            <Chip label={`${0}% off`} size='small' color='primary' />
                                        }
                                    </Box>
                                </Box>
                            </Box>
                            {
                                wishlist?.[key + 1] &&
                                <Divider variant='fullWidth' />
                            }
                        </Fragment>
                    )
                }
            </Grid >
        </>
    )
}

export default MyWishlist