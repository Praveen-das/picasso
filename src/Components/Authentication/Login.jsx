import { Box, Grid, Typography } from "@mui/material";
import { memo, useState } from "react";
import RightIcon from "@mui/icons-material/ChevronRight";
import LeftIcon from "@mui/icons-material/ChevronLeft";
import Signin from "./Signin";
import "./login.css";
import Signup from "./Signup";

function Login() {
  const [window, setWindow] = useState(false);

  const box_style = {
    zIndex: 100,
    height: '100%',
    display: "grid",
    placeItems: "center",
    gridTemplateColumns: "1fr 1fr",
    backgroundColor: "white !important",
    outline: 'none',

  };
  const leftBoxStyle = {
    transform: `translateX(${window ? "100%" : 0})`,
    boxShadow: '40px 0px 50px -50px var(--shadow),-40px 0px 50px -50px var(--shadow)',
    zIndex: window ? "unset" : 2,
  };
  const rightBoxStyle = {
    transform: `translateX(${window ? "-100%" : 0})`,
    boxShadow: '40px 0px 50px -50px var(--shadow),-40px 0px 50px -50px var(--shadow)',
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
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'grid',
        placeItems: 'center',
        // bgcolor: '#dfdfdf',
        py: 2,
        boxSizing: 'border-box'
      }}
    >
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
    </Box>
  );
}

export default memo(Login);
