import "./header.css";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

function AdminHeader() {
  const { pathname } = useLocation();

  return (
    <Box
      sx={{
        px: 3,
        pb: 4,
      }}
    >
      <Link to="/">
        <label className="header_brandName">ARTWORLD.</label>
      </Link>
    </Box>
  );
}

export default AdminHeader;
