import { Box, Button, Typography } from "@mui/material";
import { ReactComponent as IMG } from '../../../../Assets/svg/wishlist.svg'
import { useNavigate } from "react-router-dom";
import { emptyItemBoxStyle } from "../../styles";

export default function EmptyWishlist() {
    const nav = useNavigate()
    return (
        <Box sx={emptyItemBoxStyle}>
            <IMG height={250} style={{ marginBottom: '2.5rem' }} />
            <Typography color='#000' variant='h6' fontSize={22}>
                Empty Wishlist
            </Typography>
            <Typography color='#555' fontWeight={500} fontSize={16}>
                You have no items in your wishlist.
            </Typography>
        </Box>
    )
}