import React, { useMemo, useState } from 'react'
import { List, ListItemButton, ListItemText, Collapse, ListItem, Slider, Checkbox, Fade, Grow, Slide, Chip, Grid } from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useFilter } from './useFilter';
import useFacets from '../../Hooks/useFacets';
import { useProducts } from '../../Hooks/useProducts';

const ratinglist = [4, 3, 2, 1]
const discountList = [10, 20, 30, 40]

const title = { variant: 'button', fontWeight: 700, fontSize: 14 }
const primaryTypographyProps = { fontWeight: 600, textTransform: 'capitalize', fontSize: 12 }

function Sidebar() {
    const navigate = useNavigate()
    const { filter, setFilter, deleteFilter } = useFilter()
    const { data: products, isLoading } = useProducts()

    const { facets: { data } } = useFacets()
    const materials = data?.materials || []
    const priceRange = data?.priceRange || null

    const { pathname } = useLocation()
    let pathName = pathname.slice(1)
    const [open, setOpen] = useState([]);

    const handleList = (item) => {
        if (open.includes(item))
            return setOpen(pre => pre.filter(o => o !== item))
        return setOpen(pre => [...pre, item])
    }

    const handlePriceRange = ([min, max]) => {
        setFilter('priceRange', { min, max }, true)
    }

    const handleFilter = (item, value) => {
        setFilter(item, value)
    }

    if (pathName === 'results' && !products?.length) return <></>
    return (
        <Grid item xs={2.5}>
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    // bgcolor: 'var(--brandLight50)',
                    // boxShadow: '2px 0px 10px -2px #d1d1d1',
                    borderRadius: 4
                }}
            >
                <List
                    dense
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    <ListItem>
                        <ListItemText primary="Filters" primaryTypographyProps={title} />
                    </ListItem>
                    <List dense>
                        <ListItem>
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                {
                                    filter.map(({ item, value, label }) => {
                                        if (item === 'orderBy') return null

                                        return <Chip
                                            key={value}
                                            variant='filled'
                                            color='primary'
                                            label={label}
                                            onClick={() => {
                                                if (item === 'priceRange') return deleteFilter(item)
                                                if (item === 'q') return navigate('/shop')
                                                setFilter(item, value)
                                            }}
                                            size='small'
                                            sx={{ fontSize: 10, height: 20, textTransform: 'capitalize', ":hover": { textDecoration: 'line-through', cursor: 'pointer' } }}
                                        />
                                    })
                                }
                            </div>
                        </ListItem >
                    </List>

                    {/* ----------------------------Price range---------------------------- */}
                    <ListItem>
                        <ListItemText primary="Price" primaryTypographyProps={title} />
                    </ListItem >
                    <List dense>
                        <ListItem >
                            <Box sx={{ width: '100%', mt: -1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <ListItemText primaryTypographyProps={primaryTypographyProps}>From {priceRange?.min || 0}</ListItemText>
                                    <ListItemText sx={{ textAlign: 'right' }} primaryTypographyProps={primaryTypographyProps}>Up to {priceRange?.max || 99999}</ListItemText>
                                </Box>
                                <PriceRange
                                    onChange={handlePriceRange}
                                    range={[priceRange?.min || 0, priceRange?.max || 99999]}

                                />
                            </Box>
                        </ListItem>
                    </List>

                    {/* ----------------------------Material---------------------------- */}
                    <ListItemButton sx={{ borderRadius: 50 }} onClick={() => handleList('material')} >
                        <ListItemText primary="Material" primaryTypographyProps={title} />
                        {open.includes('material') ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={!open.includes('material')} timeout="auto" unmountOnExit>
                        <List disablePadding dense sx={{ maxHeight: 200, overflow: 'auto' }}>
                            {
                                !!materials?.length && materials?.map((material, i) =>
                                    <Fade
                                        key={material}
                                        style={{ transitionDelay: `${i * 50}ms` }}
                                        {...(Boolean(material) ? { timeout: 500 } : {})}
                                        in={Boolean(material)}
                                        mountOnEnter
                                        unmountOnExit
                                    >
                                        <ListItemButton onClick={() => handleFilter('material', material)} key={material} sx={{ pl: 4 }}>
                                            <Checkbox
                                                checked={Boolean(filter?.find(({ value }) => value === material))}
                                                edge="start"
                                                tabIndex={-1}
                                                size='small'
                                                disableRipple
                                                sx={{ py: '5px' }}
                                            />
                                            <ListItemText primaryTypographyProps={primaryTypographyProps} primary={material} />
                                        </ListItemButton>
                                    </Fade>
                                )
                            }
                        </List>
                    </Collapse >

                    {/* ----------------------------Rating---------------------------- */}
                    <ListItemButton sx={{ borderRadius: 50 }} onClick={() => handleList('ratings')} >
                        <ListItemText primary="Customer ratings" primaryTypographyProps={title} />
                        {open.includes('ratings') ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={!open.includes('ratings')} timeout="auto" unmountOnExit>
                        <List disablePadding dense sx={{ maxHeight: 300, overflow: 'auto' }}>
                            {
                                ratinglist.map((vote, i) => (
                                    <Fade
                                        key={i}
                                        style={{ transitionDelay: `${i * 60}ms` }}
                                        {...(open.includes('ratings') ? { timeout: 500 } : {})}
                                        in={!open.includes('ratings')}
                                        mountOnEnter
                                        unmountOnExit
                                    >
                                        <ListItemButton key={vote} onClick={() => setFilter('rating', vote)} sx={{ pl: 4 }}>
                                            <Checkbox checked={Boolean(filter?.find(o => o.value === vote))} edge="start" size='small' />
                                            <ListItemText primary={`${vote} & above`} primaryTypographyProps={primaryTypographyProps} />
                                        </ListItemButton>
                                    </Fade>
                                ))
                            }
                        </List>
                    </Collapse >

                    {/* ----------------------------Discount---------------------------- */}
                    <ListItemButton sx={{ borderRadius: 50 }} onClick={() => handleList('discount')} >
                        <ListItemText primary="Discount" primaryTypographyProps={title} />
                        {open.includes('discount') ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={!open.includes('discount')} timeout="auto" unmountOnExit>
                        <List disablePadding dense sx={{ maxHeight: 300, overflow: 'auto' }}>
                            {
                                discountList.map((vote, i) => (
                                    <Fade
                                        key={i}
                                        style={{ transitionDelay: `${i * 60}ms` }}
                                        {...(open.includes('discount') ? { timeout: 500 } : {})}
                                        in={!open.includes('discount')}
                                        mountOnEnter
                                        unmountOnExit
                                    >
                                        <ListItemButton key={vote} onClick={() => setFilter('discount', vote)} sx={{ pl: 4 }}>
                                            <Checkbox checked={Boolean(filter?.find(o => o.value === vote))} edge="start" size='small' />
                                            <ListItemText primary={`${vote}% or more`} primaryTypographyProps={{ ...primaryTypographyProps, textTransform: 'none' }} />
                                        </ListItemButton>
                                    </Fade>
                                ))
                            }
                        </List>
                    </Collapse >
                </List >
            </Box>
        </Grid>
    )
}

export default Sidebar

function PriceRange({ range, onChange = () => null }) {
    const [value, setValue] = useState(range);
    const { state } = useLocation()

    useEffect(() => {
        if (!state?.filter?.find(o => o.item === 'price_range')) {
            setValue(range)
        }
    }, [state])

    return <Slider
        value={value}
        onChange={(_, val) => setValue(val)}
        onChangeCommitted={(_, val) => onChange(val)}
        size='small'
        valueLabelDisplay="auto"
        step={500}
        min={range[0]}
        max={range[1]}
    />
}