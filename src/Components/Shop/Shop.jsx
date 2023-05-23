import { useLayoutEffect, useState } from 'react'
import './shop.css'
import Card from '../Card/Card'
import { Button, Menu, MenuItem,  Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useProducts } from '../../Hooks/useProducts';
import Masonry from '@mui/lab/Masonry';

function Shop() {
    const navigate = useNavigate()
    const { state } = useLocation()
    
    const { data, isFetching, isLoading } = useProducts()
    
    const [productList, count] = data || []
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useLayoutEffect(() => {
        if (isFetching) return
        // const tl = gsap.timeline()
        // tl.from('.product_card', {
        //     opacity: 0,
        //     stagger: 0.1
        // })
        // return () => tl.clear()
    }, [isFetching])

    const [skeleton] = useState(new Array(20).fill())

    const handleSort = (item, data) => {
        let res
        res = { item, ...data }
        handleClose()
        navigate('/shop', { state: { ...state, orderBy: res } })
    }

    return (
        <>
            <div className="shop_products">
                <div style={{ display: 'flex', justifyContent: state?.query && !isLoading ? 'space-between' : 'flex-end', alignItems: 'center', margin: '1rem 0' }}>
                    {
                        state?.query && !isLoading &&
                        <Typography color='GrayText' fontSize={14} fontWeight={600} variant='body2'>
                            {`Found ${productList?.length} ${productList?.length === 1 ? 'result' : 'results for'} ${state?.query}`}
                        </Typography>
                    }
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography fontSize={12} fontWeight={500} variant='body2'>SORT BY :</Typography>
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            size='small'
                        >
                            <Typography noWrap fontSize={12} variant='subtitle2'>{state?.orderBy?.name || 'Most recent'}</Typography>
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <MenuItem dense onClick={() => handleSort('createdAt', { name: 'Most recent', value: 'desc' })}>Most recent</MenuItem>
                            <MenuItem dense onClick={() => handleSort('price', { name: 'Price - high to low', value: 'desc' })}>Price - high to low</MenuItem>
                            <MenuItem dense onClick={() => handleSort('price', { name: 'Price - low to high', value: 'asc' })}>Price - low to high</MenuItem>
                            <MenuItem dense onClick={() => handleSort('discount', { name: 'Discount - high to low', value: 'desc' })}>Discount - high to low</MenuItem>
                            <MenuItem dense onClick={() => handleSort('discount', { name: 'Discount - low to high', value: 'asc' })}>Discount - low to high</MenuItem>
                        </Menu>
                    </div>
                </div>
                <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 3 }} spacing={10}>
                    {
                        data?.map((o) => (
                            <Card sx={{ width: '100%' }} key={o.id} product={o} />
                        ))
                    }
                </Masonry>
                {/* <div >
                    {
                        productList ?
                            productList.map((o) => (
                                <Card key={o.id} product={o} height={280} />
                            )) :
                            skeleton.map((o, i) => (
                                <Box key={i} height={280} sx={{ mt: '20px', mb: '50px', flex: '1 auto' }}>
                                    <Skeleton />
                                    <Skeleton sx={{ my: '4px' }} width="60%" />
                                    <Skeleton variant='rectangular' height={'250px'} />
                                </Box>
                            ))
                    }
                </div> */}
                {/* <div className="images_tray">
                    {
                        productList ?
                            productList.map((o) => (
                                <Card key={o.id} product={o} height={280} />
                            )) :
                            skeleton.map((o, i) => (
                                <Box key={i} height={280} sx={{ mt: '20px', mb: '50px', flex: '1 auto' }}>
                                    <Skeleton />
                                    <Skeleton sx={{ my: '4px' }} width="60%" />
                                    <Skeleton variant='rectangular' height={'250px'} />
                                </Box>
                            ))
                    }
                </div> */}
            </div>
            {/* <Pagination page={page || 1} onChange={(_, value) => navigate(`/shop`, { state: { page: value } })} color="primary" count={Math.ceil((count?.id || 0) / 2)} /> */}
        </>
    )
}

export default Shop