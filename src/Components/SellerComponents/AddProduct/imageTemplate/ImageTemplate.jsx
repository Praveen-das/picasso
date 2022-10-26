import React, { useState } from 'react'
import './imageTemplate.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Menu, MenuItem, MenuList } from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarsIcon from '@mui/icons-material/Stars';
import MoreVertIcon from '@mui/icons-material/MoreVert';


export default function ImageTemplate(
    {
        image,
        defaultImage,
        setDefault,
        _deleteImage
    }) {
    const [popover, setPopover] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (action) => {
        action === 'set_default' && setDefault()
        action === 'delete' && _deleteImage()
        setPopover(false)
    }

    return (
        <>
            <div
                className={`templateImage`}
            >
                {
                    defaultImage &&
                    <BookmarkIcon fontSize='medium' sx={{ position: 'absolute', top: -5, left: 2, color: 'var(--brand)' }} />
                }
                <IconButton size='small' sx={{ position: 'absolute', right: 0 }} onClick={(e) => {
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
                        {!defaultImage && <MenuItem onClick={() => handleClick('set_default')}>Make default</MenuItem>}
                        <MenuItem onClick={() => handleClick('delete')}>Delete</MenuItem>
                    </MenuList>
                </Menu>
                {/* <IconButton size='small' sx={{ position: 'absolute', right: 0,background:'white' }}><DeleteIcon /></IconButton> */}
                <img src={image.thumbnailUrl} alt="" />
            </div>
        </>
    )
}
