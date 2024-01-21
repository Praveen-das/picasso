import './card.css'
import { Link } from 'react-router-dom'
import WishlistButton from '../WishlistButton/WishlistButton'
import { IconButton, Typography } from '@mui/material'
import { forwardRef } from 'react'

const Card = forwardRef(({ product }, ref) => {
    const images = product?.images
    
    return (
        <Link to={`/shop/product/${product?.id}`}>
            <div
                ref={ref}
                className='product_card'
            >
                <img className="product_image" src={process.env.REACT_APP_IMAGEKIT_BASEURL + '/tr:w-400' + product?.images[0]?.filePath} alt={product?.name} />
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
