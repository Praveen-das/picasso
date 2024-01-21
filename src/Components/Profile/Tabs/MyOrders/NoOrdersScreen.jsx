import { Box, Typography } from '@mui/material';
import { ReactComponent as NoOrders } from '../../../../Assets/svg/noorders.svg';
import { emptyItemBoxStyle } from '../../styles';

export function NoOrdersScreen() {

    return (
        <Box sx={emptyItemBoxStyle}>
            <NoOrders height={250} style={{
                marginRight: -20,
                marginBottom: '2.5rem'
            }} />
            <Typography color='#000' variant='h6' fontSize={22}>NO ORDERS FOUND</Typography>
            <Typography color='#555' fontWeight={500} fontSize={16}>Looks like you haven't made any orders yet</Typography>
        </Box>);
}
