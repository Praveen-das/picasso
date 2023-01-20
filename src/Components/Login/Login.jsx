import { Box, Grid, Typography, Modal, Fade } from "@mui/material";
import { memo, useEffect, useState } from "react";
import RightIcon from "@mui/icons-material/ChevronRight";
import LeftIcon from "@mui/icons-material/ChevronLeft";
import Signin from "./Signin";
import "./login.css";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom";

function Login() {
  const [window, setWindow] = useState(false);
  const navigate = useNavigate()
  const [open, setOpen] = useState(true)

  const box_style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 100,
    height: 600,
    display: "grid",
    placeItems: "center",
    gridTemplateColumns: "1fr 1fr",
    overflow: "hidden",
    backgroundColor: "white !important",
  };
  const leftBoxStyle = {
    transform: `translateX(${window ? "100%" : 0})`,
    boxShadow: `${window ? "none" : "5px 0 20px var(--shadow)"}`,
    zIndex: window ? "unset" : 2,
  };
  const rightBoxStyle = {
    transform: `translateX(${window ? "-100%" : 0})`,
    boxShadow: window ? "5px 0 20px var(--shadow)" : "none",
  };
  const signinStyle = {
    pointerEvents: `${window ? "none" : "all"}`,
    opacity: `${window ? 0 : 1}`,
  };
  const signupStyle = {
    pointerEvents: `${window ? "all" : "none"}`,
    opacity: `${window ? 1 : 0}`,
  };

  return (
    <Modal
    sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, overflow: 'hidden' }}
    open={open}
    onClose={() => {
        document.documentElement.style.overflow = 'auto'
        setWindow(false);
        setOpen(false);
      }}
      closeAfterTransition
    >
      <Fade in={open} onExited={() => navigate('/')}>
        <Box sx={box_style}>
          <Grid
            style={leftBoxStyle}
            className="login_left"
            item
            width={{ xs: "300px", md: "500px" }}
          >
            <div
              style={{ opacity: window ? 1 : 0 }}
              className="signup_hero"
            >
              <Grid item xs={12}>
                <Typography variant="h5" fontSize="2rem">
                  Hello Friend !
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography lineHeight={1.4} variant="h2" fontSize={18}>
                  Signup now and start your journey with us
                </Typography>
              </Grid>
              <button
                onClick={() => setWindow(!window)}
                className="signup_btn"
                sx={{ background: "white" }}
                type="submit"
                variant="contained"
              >
                <RightIcon sx={{ width: "1.3em", height: "1.3em" }} />
              </button>
            </div>
            <div
              style={{ opacity: window ? 0 : 1 }}
              className="signin_hero"
            >
              <Grid item xs={12}>
                <Typography variant="h5" fontSize="2rem">
                  Welcome Back !
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography lineHeight={1.4} variant="h2" fontSize={18}>
                  To keep connected with us, please login with your personal
                  details
                </Typography>
              </Grid>
              <button
                onClick={() => setWindow(!window)}
                className="signup_btn"
                sx={{ background: "white" }}
                type="submit"
                variant="contained"
              >
                <LeftIcon sx={{ width: "1.3em", height: "1.3em" }} />
              </button>
            </div>
          </Grid>
          <Grid
            style={rightBoxStyle}
            className="login_right"
            item
            width={{ xs: "300px", md: "500px" }}
          >
            <div className="signinStyle" style={signinStyle}>
              <Signin />
            </div>
            <div className="signupStyle" style={signupStyle}>
              <Signup setWindow={setWindow} />
            </div>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
}

export default memo(Login);
