import './card.css'
import { Link } from 'react-router-dom'
import WishlistButton from '../WishlistButton/WishlistButton'
import { Box, IconButton, Typography } from '@mui/material'
import { forwardRef } from 'react'

const Card = forwardRef(({ product }, ref) => {
    const images = product?.images
    // const defaultImage = images?.find((o) => o.fileId === product.defaultImage)

    return (
        <Link to={`/shop/product/${product?.id}`}>
            <div
                ref={ref}
                className='product_card'
            >
                <img className="product_image" src={images?.[0]?.url} alt="" />
                <div className='card_overlay' >
                    <WishlistButton
                        iconButton={
                            <IconButton
                                size='small'
                                sx={{ color: 'white' }}
                            />
                        }
                        productId={product?.id}
                    />
                    <div className='card_overlay--items'>
                        <Typography className='card_overlay_text' >{product?.name}</Typography>
                        <Typography className='card_overlay_text--secondry'>by {product?.sales_person?.displayName}</Typography>
                    </div>
                </div>
            </div>
        </Link>
    )

})

export default Card
