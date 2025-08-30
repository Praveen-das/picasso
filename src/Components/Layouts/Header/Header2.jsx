import React, { useState } from "react";
import { Box, Stack, Grid } from "@mui/material";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./navbar-menu";

export function NavbarDemo() {
  return (
    <Box position="relative" width="100%" display="flex" alignItems="center" justifyContent="center">
      <Navbar />
    </Box>
  );
}

function Navbar({ className }) {
  const [active, setActive] = useState(null);

  return (
    <Box
      position="fixed"
      top={20} // equivalent to `top-10`
      left={0}
      right={0}
      mx="auto"
      zIndex={50}
      maxWidth="768px" // ~max-w-2xl
      className={className}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Artworks">
          <Stack direction="column" spacing={2} fontSize="0.875rem">
            <HoveredLink href="#paintings">Paintings</HoveredLink>
            <HoveredLink href="#sculptures">Sculptures</HoveredLink>
            <HoveredLink href="#photography">Photography</HoveredLink>
            <HoveredLink href="#digital-art">Digital Art</HoveredLink>
          </Stack>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="Artists">
          <Grid container spacing={4} padding={2} fontSize="0.875rem">
            <Grid item xs={6}>
              <ProductItem
                title="Featured Artists"
                href="#featured-artists"
                src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop"
                description="Discover our curated collection of emerging and established artists."
              />
            </Grid>
            <Grid item xs={6}>
              <ProductItem
                title="Artist Spotlight"
                href="#artist-spotlight"
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop"
                description="Monthly featured artist showcase with exclusive interviews."
              />
            </Grid>
            <Grid item xs={6}>
              <ProductItem
                title="Art Residencies"
                href="#residencies"
                src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=200&fit=crop"
                description="Connect with international art residency programs."
              />
            </Grid>
            <Grid item xs={6}>
              <ProductItem
                title="Gallery Partners"
                href="#galleries"
                src="https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=300&h=200&fit=crop"
                description="Explore partnerships with leading contemporary galleries."
              />
            </Grid>
          </Grid>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="Collections">
          <Stack direction="column" spacing={2} fontSize="0.875rem">
            <HoveredLink href="#contemporary">Contemporary</HoveredLink>
            <HoveredLink href="#abstract">Abstract</HoveredLink>
            <HoveredLink href="#portrait">Portrait</HoveredLink>
            <HoveredLink href="#landscape">Landscape</HoveredLink>
          </Stack>
        </MenuItem>
      </Menu>
    </Box>
  );
}
