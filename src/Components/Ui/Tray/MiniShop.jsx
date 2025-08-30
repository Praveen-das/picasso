import "./tray.css";
import { useProductQuery } from "../../../Hooks/useProducts";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MainTitle } from "../MainTitle";
import { gap, landingMotionProps, spacing, vSpacing } from "../../../const";
import mural from "../../../Assets/Images/collections_section/murals.webp";
import useFacets from "../../../Hooks/useFacets";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import TitleWithCTA from "../TitleWithCTA";
import Card from "../Card/Card2";

const path = new URLSearchParams();
path.append("order", "rating_desc");
path.append("limit", 9);
path.append("collection", 1);

function MiniShop() {
  const [tab, setTab] = useState({ id: null, idx: 0 });
  const navigate = useNavigate();
  const {
    facets: { data: facets },
    isFetching,
    isLoading,
  } = useFacets();

  const { data } = useProductQuery("popular-collections", "/products?" + path.toString());
  const collections = facets?.collections || [];

  const handleNavigate = () => {
    const newpath = new URLSearchParams(path.toString());
    newpath.set("limit", 20);
    navigate("/shop?" + newpath.toString());
  };

  return (
    <Box
      {...landingMotionProps}
      sx={{
        mt: vSpacing,
        px: spacing,
      }}
    >
      <Grid container rowSpacing={gap}>
        <Grid item xs={12}>
          <TitleWithCTA label="Get Popular Art Collection Here" onClick={handleNavigate} />
        </Grid>

        <Grid item xs={12} md={3.5}>
          <Box
            className="no-scrollbar"
            sx={{
              display: { xs: "flex", md: "grid" },
              gap: { xs: 1, sm: 2 },
              position: "sticky",
              top: "1em",
              width: "100%",
              overflowX: "scroll",
              contain: "inline-size",
            }}
          >
            {collections.map((s, idx) => {
              let style = { bgcolor: "primary.main", color: "white" };
              return (
                s && (
                  <Box
                    key={idx}
                    onClick={() => {
                      setTab({ id: s.id, idx });
                      path.set("collection", s.id);
                    }}
                    sx={{
                      color: "black",
                      width: "max-content",
                      px: { xs: 2, sm: 6 },
                      py: { xs: 0.5, sm: 2 },
                      borderRadius: 5,
                      cursor: "pointer",
                      transition: "0.3s",
                      ...(tab.idx === idx && style),
                      ":hover": style,
                    }}
                  >
                    <Typography
                      whiteSpace="nowrap"
                      textTransform="capitalize"
                      fontSize={{ xs: 14, lg: 16 }}
                      fontWeight={300}
                      color="inherit"
                    >
                      {s.name}
                    </Typography>
                  </Box>
                )
              );
            })}
          </Box>
        </Grid>

        <Grid item xs={12} md={8.5}>
          <Box
            className="no-scrollbar"
            sx={{
              display: { xs: "flex", md: "grid" },
              gridTemplateColumns: { md: "repeat(3,1fr)" },
              columnGap: gap,
              rowGap: 8,
              overflow: "scroll",
              contain: "inline-size",
            }}
          >
            {data?.map((item) => (
              <Card
                sx={{
                  minWidth: { xs: "15em", md: "100%" },
                  aspectRatio: "9/16",
                }}
                product={item}
              />
              // <Box
              //   key={item.id}
              //   position="relative"
              //   sx={{
              //     minWidth: { xs: "15em", md: "100%" },
              //     aspectRatio: "6/7.5",
              //     borderRadius: 5,
              //     overflow: "hidden",
              //     cursor: "pointer",
              //     "&:hover img": { transform: "scale(1.1)" },
              //   }}
              // >
              //   <Box
              //     component="img"
              //     src={item.images[0].url}
              //     sx={{
              //       width: "100%",
              //       height: "100%",
              //       transition: "0.5s",
              //       contain: "inline-size",
              //     }}
              //   />
              //   <Box position="absolute" top={10} left={10}>
              //     <Typography fontWeight={300} bgcolor="black" color="white" px={2} py={0.5} borderRadius={3}>
              //       {item.name}
              //     </Typography>
              //   </Box>
              // </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MiniShop;
