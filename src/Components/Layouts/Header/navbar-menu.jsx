"use client";
import React from "react";
import { motion } from "framer-motion";
import { Box, Typography, Paper, Stack, useTheme, Link } from "@mui/material";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({ setActive, active, item, children }) => {
  const theme = useTheme();

  return (
    <Box position="relative" onMouseEnter={() => setActive(item)}>
      <motion.p
        transition={{ duration: 0.3 }}
        style={{
          cursor: "pointer",
          color: theme.palette.mode === "dark" ? "#fff" : "#000",
          opacity: active === item ? 0.9 : 1,
        }}
      >
        {item}
      </motion.p>

      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <Box position="absolute" top="calc(100% + 1.2rem)" left="50%" sx={{ transform: "translateX(-50%)", pt: 2 }}>
              <motion.div transition={transition} layoutId="active">
                <Paper
                  elevation={12}
                  sx={{
                    backdropFilter: "blur(10px)",
                    borderRadius: 4,
                    overflow: "hidden",
                    bgcolor: theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)",
                    border: `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}`,
                  }}
                >
                  <motion.div layout style={{ padding: 16, width: "max-content", height: "100%" }}>
                    {children}
                  </motion.div>
                </Paper>
              </motion.div>
            </Box>
          )}
        </motion.div>
      )}
    </Box>
  );
};

export const Menu = ({ setActive, children }) => {
  const theme = useTheme();

  return (
    <Box
      component="nav"
      onMouseLeave={() => setActive(null)}
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
        px: 4,
        py: 1,
        borderRadius: "9999px",
        bgcolor: theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(255,255,255,0.5)",
        border: theme.palette.mode === "dark" ? "1px solid rgba(255,255,255,0.2)" : "1px solid transparent",
        backdropFilter: "blur(10px)",
        boxShadow: theme.shadows[3],
      }}
    >
      {children}
    </Box>
  );
};

export const ProductItem = ({ title, description, href, src }) => {
  const theme = useTheme();

  return (
    <Box href={href} underline="none">
      asd
      {/* <Box
        component="img"
        src={src}
        alt={title}
        sx={{
          width: 140,
          // height: 70,
          borderRadius: 2,
          objectFit: "cover",
          boxShadow: 10,
          // flexShrink: 0,
        }}
      /> */}
      {/* <Box>
          <Typography
            variant="h6"
            sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000", mb: 0.5 }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.mode === "dark" ? "#ccc" : "#444",
              maxWidth: "10rem",
            }}
          >
            {description}
          </Typography>
        </Box> */}
      {/* <Stack direction="row" spacing={2}>
        
      </Stack> */}
    </Box>
  );
};

export const HoveredLink = ({ children, href, ...rest }) => {
  const theme = useTheme();

  return (
    <Link
      href={href}
      {...rest}
      underline="hover"
      sx={{
        color: theme.palette.mode === "dark" ? "#ccc" : "#555",
        "&:hover": {
          color: theme.palette.mode === "dark" ? "#fff" : "#000",
        },
      }}
    >
      {children}
    </Link>
  );
};
