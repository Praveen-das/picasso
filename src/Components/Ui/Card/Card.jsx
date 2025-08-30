import "./card.css";
import { Link } from "react-router-dom";
import WishlistButton from "../WishlistButton/WishlistButton";
import { Box, IconButton, Typography } from "@mui/material";
import { forwardRef } from "react";
import { Image } from "../Image";
import Cardd from "../Card";
import { grey } from "@mui/material/colors";

const Card = forwardRef(({ product, sx }, ref) => {
  const image = product?.images[0]?.image?.filePath;
  const url = product?.images[0]?.url;

  const href = image ? process.env.REACT_APP_IMAGEKIT_BASEURL + image + "?tr=w-400" : url;
  const placeHolder = process.env.REACT_APP_IMAGEKIT_BASEURL + image + "?tr=w-5";

  return (
    <Link to={`/shop/product/${product?.id}`}>
      <Box
        className="product_card"
        ref={ref}
        sx={{
          ...sx,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box sx={{ p: { sm: 4 }, pb: 2, borderRadius: 5, width: "100%", height: "100%" }}>
          <Image
            className="product_image"
            sx={{ width: "100%", borderRadius: 5 }}
            href={href}
            placeHolder={placeHolder}
            alt={product?.name}
          />
        </Box>
        <Box className="card_overlay">
          {/* <div className="wishlist-btn">
            <WishlistButton
              IconButton={IconButton}
              buttonProps={{ size: "small" }}
              productId={product?.id}
            />
          </div> */}
          <div className="card_overlay--items">
            <Typography fontWeight={600}>{product?.name}</Typography>
            <Typography variant="body2" color={grey[500]}>
              {product?.sales_person?.displayName}
            </Typography>
          </div>
        </Box>
      </Box>
    </Link>
  );
});

export default Card;
