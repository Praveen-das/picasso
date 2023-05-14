import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useWishlist from '../../Hooks/useWishlist';
import useCurrentUser from '../../Hooks/useCurrentUser';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useEffect } from 'react';
import { Box, IconButton } from '@mui/material';

function WishlistButton({ productId, color = 'primary', size = 'small' }) {
    const [wishlist, setWishlist] = useState(null);

    const {
        wishlists, addToWishlist, removeFromWishlist
    } = useWishlist();

    const { currentUser } = useCurrentUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!wishlists.data) return;
        setWishlist(wishlists.data?.find(p => p.product_id === productId));
    }, [wishlists, productId]);

    return (
        <>
            {
                wishlist
                    ?
                    <IconButton
                        color='inherit'
                        onClick={(e) => {
                            e.preventDefault();
                            removeFromWishlist.mutate(wishlist.id);
                        }}
                    >
                        <FavoriteIcon fontSize={size} color={color} />
                    </IconButton>
                    :
                    <IconButton
                        color='inherit'
                        onClick={(e) => {
                            e.preventDefault();
                            currentUser.data === null ?
                                navigate('/login') :
                                addToWishlist.mutate(productId);
                        }}
                    >
                        <FavoriteBorderIcon fontSize={size} color={color} />
                    </IconButton>
            }
        </>
    )
}

export default WishlistButton
