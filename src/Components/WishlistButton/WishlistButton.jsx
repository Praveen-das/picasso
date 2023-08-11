import { Children, cloneElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useWishlist from '../../Hooks/useWishlist';
import useCurrentUser from '../../Hooks/useCurrentUser';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useEffect } from 'react';

function WishlistButton({ primaryText, secondaryText, button, iconButton, productId, color = 'primary', size = 'small' }) {
    const [state, setState] = useState(null);
    const { currentUser } = useCurrentUser()

    const {
        addToWishlist,
        removeFromWishlist,
        wishlist: { data: wishlist }
    } = useWishlist();

    const navigate = useNavigate();

    useEffect(() => {
        if (!wishlist) return;
        setState(wishlist?.find(p => p.product_id === productId));
    }, [wishlist, productId]);

    function handleWishlist(e) {
        e.preventDefault();
        if (currentUser.data === null) return navigate('/login')
        if (state) return removeFromWishlist.mutate(state.id);
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
                            startIcon: state ?
                                <FavoriteIcon fontSize={size} color='inherit' /> :
                                <FavoriteBorderIcon fontSize={size} color='inherit' />,
                            children: state ? secondaryText : primaryText
                        }) :
                    cloneElement(iconButton, {
                        onClick: handleWishlist,
                        style: { color },
                        children: state ?
                            <FavoriteIcon fontSize={size} color='inherit' /> :
                            <FavoriteBorderIcon fontSize={size} color='inherit' />
                    })
            }
        </>
    )
}

export default WishlistButton
