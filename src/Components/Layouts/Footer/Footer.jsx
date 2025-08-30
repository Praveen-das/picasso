import "./footer.css";
import instagram from "../../../Assets/Icons/instagram.svg";
import facebook from "../../../Assets/Icons/facebook.svg";
import twitter from "../../../Assets/Icons/twitter.svg";
import { Box } from "@mui/material";
import Card from "../../Ui/Card";
import { spacing } from "../../../const";

function Footer() {
  return (
    <Box
      sx={{
        px: { ...spacing, xs: 0 },
      }}
    >
      <Box
        sx={{
          px: { xs: 2, md: 14 },
          pt: { xs: 4, md: 8 },
          mt: "var(--vSpacing)",
          height: "fit-content",
          bgcolor: "primary.main",
          color: "white",
          borderTopLeftRadius: { md: 20 },
          borderTopRightRadius: { md: 20 },
        }}
      >
        <div className="footer-container">
          <div className="list">
            <ul>
              About Us
              <li>Oil paintings</li>
              <li>Acryplic paintings</li>
              <li>Watercolor paintings</li>
              <li>Illustrations</li>
              <li>Mural paintings</li>
              <li>Digital arts</li>
            </ul>
            <ul>
              SELL
              <li>Oil paintings</li>
              <li>Acryplic paintings</li>
              <li>Watercolor paintings</li>
              <li>Illustrations</li>
              <li>Mural paintings</li>
              <li>Digital arts</li>
            </ul>
          </div>
          <div className="contact">
            <ul>
              Contact Us
              <li>artworld@gmail.com</li>
              <li>+1-202-555-0125</li>
              <li>
                <div className="follow">
                  <img src={instagram} alt="instagram" />
                  <img src={facebook} alt="instagram" />
                  <img src={twitter} alt="instagram" />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer2">
          <p>Privacy Policy</p>
          <p>Site map</p>
          <p>© 2021 Picasso.com</p>
        </div>
      </Box>
    </Box>
  );
}

export default Footer;
