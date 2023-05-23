import './card.css'
import { Link } from 'react-router-dom'
import WishlistButton from '../WishlistButton/WishlistButton'
import { Box, IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';


function Card({ product, sx }) {
    const images = product?.images
    const defaultImage = images?.find((o) => o.fileId === product.defaultImage)

    return (
        <Link style={{ position: 'relative', display: 'inline-block' }} to={`/shop/product/${product?.id}`}>
            {/* <img style={{ ...sx, display: 'block' }} src={product?.urls?.small} alt="" /> */}
            <img loading='lazy' style={{ ...sx, display: 'block' }} src={defaultImage?.url + '/tr:w-200'} alt="" />
            {/* <label className='product_artist' htmlFor="">{product?.category?.name}</label> */}
            <div className="product_card--actions">
                <Box position='absolute' top='5px' right='5px' color='white'>
                    <WishlistButton
                        iconButton={<IconButton />}
                        productId={product?.id}
                        color='white'
                    />
                </Box>
                <label style={{ pointerEvents: 'none' }} htmlFor="">VIEW ARTWORK</label>
            </div>
        </Link>
    )

}

export default Card
