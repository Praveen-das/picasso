import './cart.css'
import { ReactComponent as EMPTY_CART } from '../../Assets/svg/empty_cart.svg'
import { Box, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function EmptyCart() {
    const navigate = useNavigate()
    return (
        <div className="emptyCart">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1,
                    width: '100%',
                    height: '100%',
                    boxSizing: 'border-box',
                    textAlign: 'center'
                }}
            >
                <EMPTY_CART height={250} />
                <Typography mt={4} color='#000' variant='h6' fontSize={22} >Your cart is empty.</Typography>
                <Typography color='#555' fontWeight={500} fontSize={16}>You have no items in your shopping cart.<br />Let's go buy something!</Typography>
                <Button onClick={() => navigate('/shop')} sx={{ mt: 2 }} variant='contained'>Shop Now</Button>
            </Box>
        </div>
    )

}

export default EmptyCart;
