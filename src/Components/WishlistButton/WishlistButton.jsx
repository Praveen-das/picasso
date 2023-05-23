import { Children, cloneElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useWishlist from '../../Hooks/useWishlist';
import useCurrentUser from '../../Hooks/useCurrentUser';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useEffect } from 'react';

function WishlistButton({ primaryText, secondaryText, button, iconButton, productId, color = 'primary', size = 'small' }) {
    const [wishlist, setWishlist] = useState(null);

    const { currentUser } = useCurrentUser();
    const wishlists = currentUser.data?.wishlist

    const { addToWishlist, removeFromWishlist } = useWishlist();

    const navigate = useNavigate();

    useEffect(() => {
        if (!wishlists) return;
        setWishlist(wishlists?.find(p => p.product_id === productId));
    }, [wishlists, productId]);

    function handleWishlist(e) {
        e.preventDefault();
        if (currentUser.data === null) return navigate('/login')
        if (wishlist) return removeFromWishlist.mutate(wishlist.id);
        addToWishlist.mutate(productId);
    }

    return (
        <>
            {
                button ?
                    cloneElement(button,
                        {
                            onClick: handleWishlist,
                            style: { color },
                            startIcon: wishlist ?
                                <FavoriteIcon fontSize={size} color='inherit' /> :
                                <FavoriteBorderIcon fontSize={size} color='inherit' />,
                            children: wishlist ? secondaryText : primaryText
                        }) :
                    cloneElement(iconButton, {
                        onClick: handleWishlist,
                        style: { color },
                        children: wishlist ?
                            <FavoriteIcon fontSize={size} color='inherit' /> :
                            <FavoriteBorderIcon fontSize={size} color='inherit' />
                    })
            }
        </>
    )
}

export default WishlistButton
