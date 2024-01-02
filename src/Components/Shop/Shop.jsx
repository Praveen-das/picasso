import { useCallback, useLayoutEffect, useState } from 'react'
import './shop.css'
import Card from '../Card/Card'
import { Box, Button, Menu, MenuItem, Pagination, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useProducts } from '../../Hooks/useProducts';
import Masonry from '@mui/lab/Masonry';
import { useFilter } from '../Sidebar/useFilter';
import noresultImg from '../../Assets/Images/noresult.png'
import useFacets from '../../Hooks/useFacets';
import FilterListIcon from '@mui/icons-material/FilterList';

function Shop({ toggleFilter, setToggleFilter }) {
    const { filter, setFilter } = useFilter()
    const { facets: { data } } = useFacets()
    const total = data?.total || 0

    const { pathname } = useLocation()
    let pathName = pathname.slice(1)
    const { data: products = [], isFetching, isLoading } = useProducts()

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [skeleton] = useState(new Array(20).fill())

    const handleSort = (item, data) => {
        setFilter('orderBy', { [item]: data.value }, true);
        handleClose()
    }

    const getSortTitle = useCallback(() => {
        let item = filter.find(o => o.item === 'orderBy')
        if (!item) return 'Most recent'

        let [values] = Object.entries(item.value || null)
        let key = values.join('_')

        switch (key) {
            case 'createdAt_desc':
                return 'Most recent'
            case 'price_asc':
                return 'Price - low to high'
            case 'price_desc':
                return 'Price - high to low'
            case 'discount_asc':
                return 'Discount - low to high'
            case 'discount_desc':
                return 'Discount - high to low'
            default:
                break
        }

    }, [filter])

    if (pathName === 'results' && !isLoading && !products?.length) return <NO_RESULTS />
    return (
        <>
            <div className="shop_products">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem 0px 1rem 0' }} >
                    {
                        pathName === 'results' && !isLoading ?
                            <Box display='flex' alignItems='baseline'>
                                <Typography fontSize={18} >Showing results for</Typography>
                                <Typography ml={1} fontSize={20} fontWeight={700}>
                                    {filter?.find(({ item }) => item === 'q')?.value || ''}
                                </Typography>
                            </Box>
                            :
                            <Button onClick={() => setToggleFilter(s => !s)} startIcon={<FilterListIcon fontSize='small' />} size='small'>{toggleFilter ? 'Hide' : 'show'} Filter</Button>
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
                            <Typography noWrap fontSize={12} variant='subtitle2'>{getSortTitle()}</Typography>
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
                        // defaultValue={}
                        >
                            <MenuItem dense onClick={() => handleSort('createdAt', { name: 'Most recent', value: 'desc' })}>Most recent</MenuItem>
                            <MenuItem dense onClick={() => handleSort('price', { name: 'Price - high to low', value: 'desc' })}>Price - high to low</MenuItem>
                            <MenuItem dense onClick={() => handleSort('price', { name: 'Price - low to high', value: 'asc' })}>Price - low to high</MenuItem>
                            <MenuItem dense onClick={() => handleSort('discount', { name: 'Discount - high to low', value: 'desc' })}>Discount - high to low</MenuItem>
                            <MenuItem dense onClick={() => handleSort('discount', { name: 'Discount - low to high', value: 'asc' })}>Discount - low to high</MenuItem>
                        </Menu>
                    </div>
                </div>
                <Masonry defaultColumns={3} columns={{ xs: 1, sm: 2, md: 3, lg: 3 }} spacing={5} sx={{ m: 0 }}>
                    {
                        products ? products.map((o, i) => (
                            <Card sx={{ width: '100%' }} key={o?.id} product={o} />
                        )) : <div />
                    }
                </Masonry>
            </div>
            {
                products > 10 &&
                < Pagination page={filter.find(({ item }) => item === 'p')?.value || 1} color="primary" sx={{ alignSelf: 'center', mt: 'auto' }} onChange={(_, value) => setFilter('p', value, true)} count={Math.ceil(total / 10)} />
            }
        </>
    )
}

export default Shop

function NO_RESULTS() {
    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    maxHeight: '500px',
                    display: 'grid',
                    justifyItems: 'center',
                    alignContent: 'center',
                    gap: 1
                }}
            >
                <img height={200} src={noresultImg} alt="" />
                <Typography variant='h5'>Sorry, no results found!</Typography>
                <Typography>Please check the spelling or try searching for something else</Typography>
            </Box>
        </>
    )
}