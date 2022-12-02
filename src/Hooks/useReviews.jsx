import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import controller from '../lib/userReview.api'

const useReviews = (productId) => {
    const {
        addUserReview,
        deleteUserReview,
        _getProductReview,
        updateUserReview } = controller

    const queryClient = useQueryClient()

    const reviews = useQuery(['review', productId], () => _getProductReview(productId), { enabled: !!productId })

    const addReview = useMutation(addUserReview, {
        onSuccess: () => queryClient.invalidateQueries(['review'])
    })

    const deleteReview = useMutation(deleteUserReview, {
        onSuccess: () => queryClient.invalidateQueries(['review'])
    })


    const updateReview = useMutation(updateUserReview, {
        onSuccess: () => queryClient.invalidateQueries(['review'])
    })

    return {
        reviews,
        addReview,
        deleteReview,
        updateReview,
    }

}

export default useReviews