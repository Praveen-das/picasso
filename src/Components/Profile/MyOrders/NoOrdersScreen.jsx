import { Typography } from '@mui/material';
import { ReactComponent as NoOrders } from '../../../Assets/Images/noorders.svg';

export function NoOrdersScreen() {

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
            <NoOrders height={200} style={{
                marginRight: -20,
                marginBottom: '2.5rem'
            }} />
            <Typography color='#000' variant='h6' fontSize={22}>NO ORDERS FOUND</Typography>
            <Typography color='#555' fontWeight={500} fontSize={16}>Looks like you haven't made any orders yet</Typography>
        </div>);
}
