// Converted version of HeroSection using MUI v5.13.7 instead of shadcn/Tailwind

import React, { useState, useEffect, useRef, TouchEvent, WheelEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Box from "@mui/material/Box";
import Button from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import paintingsImg from "../Assets/Images/collections_section/paintings.webp";
import natureImg from "../Assets/Images/collections_section/nature.webp";
import muralImg from "../Assets/Images/collections_section/murals.webp";
import homeDecorImg from "../Assets/Images/collections_section/home_decor.webp";

const artCategories = [
  {
    id: 1,
    title: "Nature's Beauty",
    description: "Capture the essence of natural landscapes and wildlife",
    image: paintingsImg,
    bgImage: paintingsImg,
  },
  {
    id: 2,
    title: "Mural Magic",
    description: "Urban art that transforms spaces and tells stories",
    image: natureImg,
    bgImage: natureImg,
  },
  {
    id: 3,
    title: "Artful Home Decor",
    description: "Elegant pieces that elevate your living space",
    image: muralImg,
    bgImage: muralImg,
  },
  {
    id: 4,
    title: "Ethnic Dress Artistry",
    description: "Traditional craftsmanship meets contemporary design",
    image: homeDecorImg,
    bgImage: homeDecorImg,
  },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);

  const sectionRef = useRef(null);
  const theme = useTheme();
  const isMobileState = useMediaQuery(theme.breakpoints.down("md"));

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % artCategories.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + artCategories.length) % artCategories.length);
  };

  const currentCard = artCategories[currentIndex];

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [currentIndex]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0009;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
      if (!touchStartY) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = () => {
      setTouchStartY(0);
    };

    const handleScroll = () => {
      if (!mediaFullyExpanded) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  const mediaWidth = 600 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const textTranslateX = 20 + scrollProgress * (isMobileState ? 180 : 200);

  const firstWord = currentCard.title ? currentCard.title.split(" ")[0] : "";
  const restOfTitle = currentCard.title ? currentCard.title.split(" ").slice(1).join(" ") : "";

  return (
    <Box ref={sectionRef} sx={{ minHeight: "100vh", bgcolor: "background.default", overflow: "hidden" }}>
      <Box
        position="relative"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="start"
        minHeight="100vh"
      >
        {/* <AnimatePresence mode="wait">
          <motion.div
            key={currentCard.id}
            style={{ position: "absolute", inset: 0, zIndex: 0, height: "100%" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 - scrollProgress * 0.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${currentCard.bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(20px)",
                transform: "scale(1.1)",
              }}
            />
            <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(0,0,0,0.4)" }} />
          </motion.div>
        </AnimatePresence> */}

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 10 }}>
          <Box position="relative" height="100vh" display="flex" alignItems="center" justifyContent="center">
            <Button
              onClick={prevSlide}
              sx={{
                position: "absolute",
                left: 32,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "text.primary",
                backdropFilter: "blur(5px)",
                zIndex: 20,
                transition: "all 0.3s ease-in-out",
              }}
            >
              <ChevronLeft />
            </Button>

            <Button
              onClick={nextSlide}
              sx={{
                position: "absolute",
                right: 32,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "text.primary",
                backdropFilter: "blur(5px)",
                zIndex: 20,
                transition: "all 0.3s ease-in-out",
              }}
            >
              <ChevronRight />
            </Button>

            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: mediaWidth,
                height: "max-content",
                // maxWidth: "95vw",
                maxHeight: "85vh",
                borderRadius: 4,
                boxShadow: "0px 20px 60px rgba(0,0,0,0.2)",
                // overflow: "hidden",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCard.id}
                  style={{ position: "relative", width: "100%", height: "100%" }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                      bgcolor: "red",
                      borderRadius: 4,
                    }}
                  >
                    <Box
                      component="img"
                      src={currentCard.image}
                      alt={currentCard.title}
                      sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 3 }}
                    />
                    {/* 
                    <Box
                      position="fixed"
                      top={0}
                      left={0}
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      textAlign="center"
                      gap={2}
                    >
                      <motion.h2
                        style={{
                          fontSize: 100,
                          textTransform: "uppercase",
                          fontWeight: 800,
                          margin: 0,
                          color: theme.palette.text.primary,
                          transform: `translateX(-${textTranslateX}vw)`,
                        }}
                      >
                        {firstWord}
                      </motion.h2>
                      <motion.h2
                        style={{
                          fontSize: 100,
                          textTransform: "uppercase",
                          fontWeight: 800,
                          margin: 0,
                          color: theme.palette.text.primary,
                          transform: `translateX(${textTranslateX}vw)`,
                        }}
                      >
                        {restOfTitle}
                      </motion.h2>
                    </Box> */}
                  </Box>
                </motion.div>
              </AnimatePresence>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Hero;
