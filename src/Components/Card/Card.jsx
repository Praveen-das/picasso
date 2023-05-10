import './card.css'
import { Link } from 'react-router-dom'
import WishlistButton from '../WishlistButton/WishlistButton'
import { Box } from '@mui/material'

function Card({ product, sx }) {
    const images = product?.images
    const defaultImage = images?.find((o) => o.fileId === product.defaultImage)

    return (
        <Link style={{ position: 'relative', display: 'inline-block' }} to={`/shop/product/${product?.id}`}>
            {/* <img style={{ ...sx, display: 'block' }} src={product?.urls?.small} alt="" /> */}
            <img style={{ ...sx, display: 'block' }} src={defaultImage?.url + '/tr:w-200'} alt="" />
            {/* <label className='product_artist' htmlFor="">{product?.category?.name}</label> */}
            <div className="product_card--actions">
                <Box position='absolute' top='5px' right='5px' color='white'>
                    <WishlistButton productId={product?.id} color='inherit' />
                </Box>
                <label style={{ pointerEvents: 'none' }} htmlFor="">VIEW ARTWORK</label>
            </div>
        </Link>
    )

}

export default Card
