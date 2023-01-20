import { useQuery } from '@tanstack/react-query';
import { _getOrdersByUserId } from '../../lib/sales.api';


const useOrders = () => useQuery(['orders'], _getOrdersByUserId);
export default useOrders