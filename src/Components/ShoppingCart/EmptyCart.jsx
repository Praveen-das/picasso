import './cart.css'
import { ReactComponent as EMPTY_CART } from '../../Assets/Images/empty_cart.svg'
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function EmptyCart() {
    return (
        <div className="emptyCart">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1,
                    width: '70%',
                    height: '100%',
                    boxShadow: '0px 0px 30px var(--neu)',
                    borderRadius: 4,
                    boxSizing: 'border-box',
                    textAlign: 'center'
                }}
            >
                <EMPTY_CART height={200} />
                <Typography mt={4} color='#000' variant='h6' fontSize={22} >Your cart is empty.</Typography>
                <Typography color='#555' fontWeight={500} fontSize={16}>You have no items in your shopping cart.<br />Let's go buy something!</Typography>
                <Button component={Link} to='/' sx={{ mt: 2 }} variant='contained'>Shop Now</Button>
            </Box>
        </div>
    )

}

export default EmptyCart;
