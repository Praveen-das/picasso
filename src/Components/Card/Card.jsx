import './card.css'
import { Link } from 'react-router-dom'
import WishlistButton from '../WishlistButton/WishlistButton'
import { Box, IconButton } from '@mui/material'

function Card({ product, sx: { borderRadius, height, ...sx } }) {
    const images = product?.images
    // const defaultImage = images?.find((o) => o.fileId === product.defaultImage)

    return (
        <Link to={`/shop/product/${product?.id}`}>
            <div
                className='product_card'
                style={{ borderRadius, height }}
            >
                <img className="product_image" style={{ height: '100%', minWidth: 150 }} src={images[0]?.url + '/tr:w-200'} alt="" />
                <div className="product_card--actions" style={{ borderRadius }}>
                    <Box position='absolute' top='5px' right='5px' color='white'>
                        <WishlistButton
                            iconButton={<IconButton />}
                            productId={product?.id}
                            color='white'
                        />
                    </Box>
                    <label style={{ pointerEvents: 'none' }} >VIEW ARTWORK</label>
                </div>
            </div>
        </Link>
    )

}

export default Card
