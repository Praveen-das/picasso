import { useEffect } from "react";
import useWishlist from "../../../Hooks/useWishlist"
import { Box } from '@mui/material'

function MyWishlist() {
    const { wishlists } = useWishlist()


    useEffect(() => {
        console.log(wishlists.data);
    }, [wishlists])

    return (
        <Box display='flex' flexDirection='column' gap={2}>
            {
                wishlists.data?.map(({ product }) => (
                    <Box key={product?.id} width='100%' height='100px' bgcolor='cyan'>

                    </Box>
                ))
            }
        </Box>
    )
}

export default MyWishlist
