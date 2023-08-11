import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { _getSalesOrderByUserId } from '../../lib/sales.api';

const useSalesOrders = () => {
    const [filter, setFilter] = useState('')
    const orders = useQuery(
        ['sales_orders',
            filter], () => _getSalesOrderByUserId(filter),
        { keepPreviousData: true })

    orders['groupBy'] = setFilter

    return orders
}
export default useSalesOrders