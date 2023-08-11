import { Typography } from "@mui/material";
import { ReactComponent as IMG } from '../../../Assets/svg/wishlist.svg'

export default function EmptyWishlist() {
    return (
        <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.2rem',
        }}>
            <IMG height={200} style={{
                marginRight: -20,
                marginBottom: '2.5rem'
            }} />
            <Typography color='#000' variant='h6' fontSize={22}>
                Empty Wishlist
            </Typography>
            <Typography color='#555' fontWeight={500} fontSize={16}>
                You have no items in your wishlist. Start adding!
            </Typography>
        </div>
    )
}