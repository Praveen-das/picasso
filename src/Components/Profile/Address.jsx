import { useState } from 'react'
import { Box, Grid, IconButton, Menu, MenuItem, MenuList, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import useCurrentUser from '../../Hooks/useCurrentUser';

function Address({ data, onClick, defaultAddress }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [popover, setPopover] = useState(false)

    const { updateUser, deleteUserAddress } = useCurrentUser();

    const addressStyling = () => {
        if (defaultAddress)
            return {
                sx: {
                    width: '100%',
                    padding: '5px 1rem',
                    boxShadow: '4px 4px 7px 2px var(--shadow)',
                    borderRadius: 2,
                    transform: 'translate(0, -2px)'
                }
            }
        return {
            sx: {
                width: '100%',
                padding: '5px 1rem',
                boxShadow: '2px 2px 5px 2px var(--shadow)',
                borderRadius: 2,
                transform: 'translate(0, 0)'
            }
        }
    }

    const handleDeletion = async () => {
        const list = await deleteUserAddress(data.id)
        if (defaultAddress) {
            await updateUser({ default_address: list[0].id })
        }
        setPopover(false)
    }

    return (
        <div onClick={onClick} style={{ width: '100%', cursor: 'pointer', position: 'relative' }}>
            {
                defaultAddress &&
                <BookmarkIcon fontSize='medium' sx={{ position: 'absolute', top: -6, right: 30, color: 'var(--brand)' }} />
            }
            <IconButton size='small' sx={{ position: 'absolute', right: 0, top: 3, zIndex: 200 }} onClick={(e) => {
                setPopover(true)
                setAnchorEl(e.currentTarget);
            }}>
                <MoreVertIcon fontSize='small' />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={popover}
                onClose={() => {
                    setPopover(false)
                    setAnchorEl(null);
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
                <MenuList dense sx={{ padding: 0 }}>
                    {!defaultAddress && <MenuItem onClick={() => updateUser({ default_address: data.id }).then(() => setPopover(false))}>Make default</MenuItem>}
                    <MenuItem onClick={handleDeletion}>Delete</MenuItem>
                </MenuList>
            </Menu>
            <Grid item xs={12} display='flex' justifyContent='center' pb={2} ml={{ sm: 2 }}>
                <Box {...addressStyling()}>
                    <Typography variant='h6' fontSize={15} fontWeight={600} lineHeight={1.5}>{data.name}</Typography>
                    <Typography variant='body2' >{data.address}</Typography>
                    <Typography variant='body2' >{data.city}</Typography>
                    <Typography variant='body2' >{data.state}</Typography>
                    <Typography variant='body2' >{data.pincode}</Typography>
                    <Typography variant='body2' >{data.email}</Typography>
                    <Typography variant='body2' >{data.mobile}</Typography>
                </Box>
            </Grid>
        </div>
    )
}

export default Address
