import React, { useRef, useState } from 'react'
import { List, ListItemButton, ListItemText, Collapse, ListItem, Slider, Checkbox, Chip, Fade, Grow, Slide } from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useProducts } from '../../Hooks/useProducts';

const ratinglist = [4, 3, 2, 1]

function Sidebar() {
    const { data } = useProducts()
    const navigate = useNavigate()
    const { state } = useLocation()

    const [open, setOpen] = useState([]);
    const categoryList = data && data[2]
    const materialList = data && data[3]
    const price_range = data && data[4]

    const handleList = (item) => {
        if (open.includes(item))
            return setOpen(pre => pre.filter(o => o !== item))
        return setOpen(pre => [...pre, item])
    }

    const title = { variant: 'button', fontWeight: 700, fontSize: 14 }
    const primaryTypographyProps = { fontWeight: 600, textTransform: 'capitalize', fontSize: 12 }

    const handleFilter = (item, data, action) => {
        let res
        if (!state?.filter?.length) {
            res = [{ item, name: data.name, value: data.id }]
        } else {
            const items = state?.filter.find(o => o.name === data.name)
            if (items) {
                res = state.filter.filter(o => o.name !== data.name)
            } else {
                if (action === 'replace') {
                    state.filter = state.filter.filter(o => o.item !== item)
                }
                res = [{ item, name: data.name, value: data.id }, ...state?.filter]
            }
        }
        navigate('/shop', { state: { ...state, filter: res } })
    }

    return (
        <List
            dense
            sx={{
                // width: '100%',
                // maxWidth: 360,
                bgcolor: 'background.paper',
                // px: 2,
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            <ListItem>
                <ListItemText primary="Filters" primaryTypographyProps={title} />
            </ListItem>
            <List dense>
                <ListItem>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {state?.filter?.map((chip, index) => {
                            if (chip.item === 'sortBy') return
                            if (chip.item === 'category') return
                            return <Chip
                                key={chip.name}
                                variant='filled'
                                color='primary'
                                label={chip.name}
                                onClick={() => navigate('/shop', { state: { ...state, filter: state?.filter?.filter((_, i) => i !== index) } })}
                                size='small'
                                sx={{ fontSize: 10, height: 20, textTransform: 'capitalize', ":hover": { textDecoration: 'line-through', cursor: 'pointer' } }}
                            />
                        })}
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
                            <ListItemText primaryTypographyProps={primaryTypographyProps}>From {price_range?._min?.price || 0}</ListItemText>
                            <ListItemText sx={{ textAlign: 'right' }} primaryTypographyProps={primaryTypographyProps}>Up to {price_range?._max?.price || 99999}</ListItemText>
                        </Box>
                        <PriceRange
                            handleFilter={handleFilter}
                            range={[price_range?._min?.price || 0, price_range?._max?.price || 99999]}
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
                        !!materialList?.length && materialList?.map((material, i) =>
                            <Fade
                                style={{ transitionDelay: `${i * 50}ms` }}
                                {...(Boolean(material) ? { timeout: 500 } : {})}
                                in={Boolean(material)}
                                mountOnEnter
                                unmountOnExit
                            >
                                <ListItemButton onClick={() => handleFilter('material', material)} key={material.id} sx={{ pl: 4 }}>
                                    <Checkbox
                                        checked={Boolean(state?.filter?.find(o => o?.name === material?.name))}
                                        edge="start"
                                        tabIndex={-1}
                                        size='small'
                                        disableRipple
                                        sx={{ py: '5px' }}
                                    />
                                    <ListItemText primaryTypographyProps={primaryTypographyProps} primary={material?.name} />
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
            <Collapse in={open.includes('ratings')} timeout="auto" unmountOnExit>
                <List disablePadding dense sx={{ maxHeight: 300, overflow: 'auto' }}>
                    {
                        ratinglist.map((vote, i) => (
                            <Fade
                                style={{ transitionDelay: `${i * 60}ms` }}
                                {...(open.includes('ratings') ? { timeout: 500 } : {})}
                                in={open.includes('ratings')}
                                mountOnEnter
                                unmountOnExit
                            >
                                <ListItemButton key={vote} onClick={() => handleFilter('rating', { name: `Rating ${vote} & above`, id: vote }, 'replace')} sx={{ pl: 4 }}>
                                    <Checkbox checked={Boolean(state?.filter?.find(o => o.item === 'rating' && o?.value === vote))} edge="start" size='small' />
                                    <ListItemText primary={`${vote} & above`} primaryTypographyProps={primaryTypographyProps} />
                                </ListItemButton>
                            </Fade>
                        ))
                    }
                </List>
            </Collapse >
        </List >
    )
}

export default Sidebar

function PriceRange({ range, handleFilter }) {
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
        onChangeCommitted={(_, val) => handleFilter('price_range', { name: `from ${val[0]} to ${val[1]}`, id: { min: val[0], max: val[1] } }, 'replace')}
        size='small'
        valueLabelDisplay="auto"
        step={500}
        min={range[0]}
        max={range[1]}
    />
}