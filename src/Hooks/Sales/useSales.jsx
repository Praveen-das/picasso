import { useMutation, useQueryClient } from '@tanstack/react-query'
import { _createSalesOrder, _updateStatus } from '../../lib/sales.api'

function useSales() {
    const queryClient = useQueryClient()

    const createOrder = useMutation(_createSalesOrder, {
        onSuccess: () => {
            queryClient.invalidateQueries(['orders'])
            queryClient.invalidateQueries(['sales_orders'])
        }
    })

    const updateStatus = useMutation(_updateStatus, {
        onSuccess: () => {
            queryClient.invalidateQueries(['orders'])
            queryClient.invalidateQueries(['sales_orders'])
        }
    })

    return {
        createOrder,
        updateStatus,
    }
}

export default useSales