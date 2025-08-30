import { Box, Typography } from "@mui/material";
import paintingsImg from "../Assets/Images/collections_section/paintings.webp";
import natureImg from "../Assets/Images/collections_section/nature.webp";
import muralImg from "../Assets/Images/collections_section/murals.webp";
import homeDecorImg from "../Assets/Images/collections_section/home_decor.webp";
import paintingsImg2 from "../Assets/Images/collections_section/paintings.webp";
import natureImg2 from "../Assets/Images/collections_section/nature.webp";
import muralImg2 from "../Assets/Images/collections_section/murals.webp";
import homeDecorImg2 from "../Assets/Images/collections_section/home_decor.webp";

const images = [paintingsImg, natureImg, muralImg, homeDecorImg, paintingsImg2, natureImg2, muralImg2, homeDecorImg2];

function Asd() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: "var(--vSpacing)",
        gap: 5,
        px: 4,
      }}
    >
      <Box>
        <Typography fontSize={50} width={500} fontWeight={700}>
          SHOP BY MEDIUM
        </Typography>
      </Box>
      <Box
        sx={{
          boxSizing: "border-box",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          px: 10,
          overflow: "auto",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {images.map((url, i) => (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              px: 10,
              [i % 2 === 0 ? "pt" : "pb"]: 10,
              boxSizing: "border-box",
            }}
            alt=""
          >
            <Box>
              <Box
                as="img"
                sx={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 10 }}
                src={url}
                alt=""
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Asd;
