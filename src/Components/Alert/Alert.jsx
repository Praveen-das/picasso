import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useStore } from "../../Context/Store";
import "./style.css";

function AlertMessage() {
  const { toggled, message, type, time } = useStore((state) => state.alert);

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    useStore.setState((pre) => ({
      alert: {
        ...pre.alert,
        toggled: false,
      },
    }));
  };

  return (
    <Snackbar
      sx={{ transform: "translateY(1.5rem)" }}
      open={toggled}
      autoHideDuration={time || 3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MuiAlert
        severity={type || "success"}
        sx={{ height: 50, alignItems: "center" }}
        variant="filled"
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
}
export default AlertMessage;
