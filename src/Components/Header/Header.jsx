import { useEffect, useState } from "react";
import "./header.css";
import { Link, useLocation } from "react-router-dom";
import DropDown from "../DropDown/DropDown";
import Avatar from "../Avatar/Avatar";
import { useNavigate } from "react-router-dom";
import Search from "../Search/Search";
import AccountsIcon from "@mui/icons-material/ManageAccounts";
import CartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import { useStore } from "../../Context/Store";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "./Device/Menu";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../../lib/user.api";
import useUserData from "../../Hooks/useUserData";
import useAuth from "../../Hooks/useAuth";
import { joinStrings } from "../../Utils/joinStrings";
import LoginIcon from '@mui/icons-material/Login';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { Badge } from "@mui/material";


function Header() {
  const navigate = useNavigate();
  const { state } = useLocation()
  const { logout } = useAuth();
  const { currentUser } = useUserData();
  const { data: receivers } = useQuery(['receivers'], () => '')

  const style = {
    sx: {
      fontSize: 16,
      display: "block",
    },
  };

  const hover = () => {
    let elements = document.getElementsByName("dropdown-menu-item");
    document.documentElement.style.setProperty("--opacity", 1);

    elements.forEach((elm, index) => {
      elm.onmouseenter = () => {
        if (index === 0) {
          document.documentElement.style.setProperty("--top", 0);
        }
        if (index === 1) {
          document.documentElement.style.setProperty("--top", "25%");
        }
        if (index === 2) {
          document.documentElement.style.setProperty("--top", "50%");
        }
        if (index === 3) {
          document.documentElement.style.setProperty("--top", "75%");
        }
      };
    });
  };

  return (
    <>
      <div className="navbar">
        {/* <IconButton onClick={() => setOpen(!open)} sx={{ position: 'absolute', left: '8px' }}>
                <MenuIcon />
                </IconButton>
            <Menu open={open} close={() => setOpen(!open)} /> */}
        <div className="left">
          <Link to="/">
            <label className="header_brandName" htmlFor="logo">
              ARTWORLD.
            </label>
          </Link>
          <Link to="/shop" className="shop" htmlFor="">
            New Arrivels
          </Link>
          <Link to="/shop" className="shop" htmlFor="">
            All Categories
          </Link>
          <Search onSearch={(query) => navigate(`/search`, { state: { ...state, query } })} />
        </div>
        {/* <div className="navbar_middle">
          
        </div> */}
        <div className="right">
          <Link to="/shop" className="shop" htmlFor="">
            Shop
          </Link>
          <Link to="/sell" className="marketplace" htmlFor="">
            Sell
          </Link>
          <Badge badgeContent={receivers?.length || 0} color="primary">
            <Link to='/chat' className='create' htmlFor="">Messages</Link>
          </Badge>
          {/* <Badge badgeContent={userData && userData.cart ? userData.cart.length : 0} color="primary">
                        <Link to='/cart' className='create' htmlFor="">CART</Link>
                    </Badge> */}
          {currentUser.data != null ? (
            <DropDown>
              <Avatar
                displayName={currentUser.data?.displayName}
                profilePicture={currentUser.data?.photo}
              />
              <Link to="/my-profile">
                <AccountsIcon {...style} />
                Account
              </Link>
              <Link to="/cart">
                <CartIcon {...style} />
                My Cart
              </Link>
              <Link to="/cart">
                <FavoriteIcon {...style} />
                Wishlist
              </Link>
              <div onClick={() => logout.mutateAsync().then(() => navigate('/'))}>
                <LogoutIcon {...style} />
                Logout
              </div>
            </DropDown>
          ) : (
            <Link to="/login" style={{ display: 'flex', placeItems: 'center', gap: 10 }}>
              LOG IN
            </Link>
          )}
        </div>
        {/* <IconButton sx={{ position: 'absolute', right: '8px' }}>
                    <SearchIcon />
                </IconButton> */}
      </div>
    </>
  );
}

export default Header;
