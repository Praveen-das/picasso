import { Box, Chip, Divider, Grid, IconButton, Rating, Typography } from '@mui/material';
import React, { Fragment } from 'react'
import '../../Checkout/Components/Products/products.css'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { calculateDiscount } from '../../../Utils/utils';
import useWishlist from '../../../Hooks/useWishlist'
import StarEmptyIcon from '@mui/icons-material/StarBorderRounded';
import StarIcon from '@mui/icons-material/StarRounded';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import EmptyWishlist from './EmptyWishlist';
import LoadingScreen from '../../MUIComponents/LoadingScreen';

export const FlexBox = styled(Box)(({ alignItems = 'center' }) => ({ display: 'flex', alignItems }))

function MyWishlist() {
    const { wishlist: { data: wishlist, isLoading, isFetching }, removeFromWishlist } = useWishlist()

    if (isLoading || isFetching) return <LoadingScreen />
    if (!wishlist?.length) return <EmptyWishlist />
    return (
        <>
            <Grid item xs={12} display='grid' pl={2} gap={3}>
                <Grid item xs={12} ml={-2}>
                    <Typography variant="tabTitle">
                        My Wishlist - {wishlist?.length}
                    </Typography>
                </Grid>
                {
                    wishlist?.map(({ id, product }, key) =>
                        <Fragment key={product?.id}>
                            <Link className="checkout__product" key={id} to={`/shop/product/${product?.id}`}>
                                <Box position='absolute' top={5} right={5} zIndex={100}>
                                    <IconButton onClick={(e) => {
                                        e.preventDefault()
                                        removeFromWishlist.mutate(id)
                                    }}><DeleteOutlineIcon /></IconButton>
                                </Box>
                                {/* /////////////////// */}
                                <div className='product_imgNQty'>
                                    <img src={product.images[0].url + '/tr:w-100'} alt="" />
                                </div>
                                <div className='checkout__product--details'>
                                    <Typography textTransform='capitalize' fontSize={18} fontWeight={500} >{product.name}</Typography>
                                    <FlexBox gap={1} color='grey' mt={0.25} fontWeight={500}>
                                        <Rating size='small' readOnly icon={<StarIcon fontSize='small' />} emptyIcon={<StarEmptyIcon fontSize='small' />} name="read-only" value={product?.rating || 0} />
                                        ({product?.rating || 0})
                                    </FlexBox>
                                    <FlexBox gap={1} mt={2}>
                                        <FlexBox alignItems='baseline' gap={2}>
                                            {
                                                product?.discount > 0 &&
                                                <Typography color='grey' sx={{ textDecoration: 'line-through' }} fontSize={14} fontWeight={400}>
                                                    ₹{product.price}
                                                </Typography>
                                            }
                                            <Typography color='var(--brandMain)' fontSize={18} fontWeight={600}>
                                                ₹{product.price - calculateDiscount(product.price, product.discount)}
                                            </Typography>
                                        </FlexBox>
                                        {
                                            product?.discount > 0 &&
                                            <Chip label={`${12}% off`} size='small' color='primary' />
                                        }
                                    </FlexBox>
                                </div>
                            </Link >
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