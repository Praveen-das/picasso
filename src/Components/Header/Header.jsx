import { useMemo } from "react";
import "./header.css";
import { Link, useLocation } from "react-router-dom";
import DropDown from "../DropDown/DropDown";
import Avatar from "../Avatar/Avatar";
import { useNavigate } from "react-router-dom";
import Search from "../Search/Search";
import AccountsIcon from "@mui/icons-material/ManageAccounts";
import FavoriteIcon from "@mui/icons-material/FavoriteBorder";
import LogoutIcon from "@mui/icons-material/Logout";
import { useStore } from "../../Context/Store";
import useCurrentUser from "../../Hooks/useCurrentUser";
import useAuth from "../../Hooks/useAuth";
import { Badge, BottomNavigationAction, Box, Drawer, Menu } from "@mui/material";
import CartIcon from '@mui/icons-material/ShoppingBagOutlined';
import LoginIcon from '@mui/icons-material/LoginOutlined';
import PersonIcon from '@mui/icons-material/PersonOutlineOutlined';
import MenuIcon from '@mui/icons-material/DehazeRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreRounded';

function Header() {
  const navigate = useNavigate();
  const { state } = useLocation()
  const { logout } = useAuth();
  const { currentUser } = useCurrentUser();

  return (
    <nav id='navbar'>
      <div className="navbar">
        <div className="left">
          <Link to="/">
            <label className="header_brandName" htmlFor="logo">
              ARTWORLD.
            </label>
          </Link>

          <Search onSearch={(query) => navigate(`/search`, { state: { ...state, query } })} />
        </div>
        {/* <div className="navbar_middle">
          
        </div> */}
        <div className="right">
          {/* 
          <Link to="/sell" className="marketplace" htmlFor="">
            Sell
          </Link> */}
          {/* <MessagesLink /> */}
          <Link id='nav_links' to="/wishlist">
            <FavoriteIcon fontSize='small' />
            {/* Wishlist */}
          </Link>
          <Link id='nav_links' to='/cart' htmlFor="">
            <CartIcon fontSize='small' />
            {/* Cart */}
          </Link>
          {
            currentUser.data !== null ?
              <Link to="/profile">
                <PersonIcon fontSize='small' />
                {/* Account */}
              </Link> :
              <Link id='nav_links' to="/login" >
                <LoginIcon fontSize='small' />
                {/* Log in */}
              </Link>
          }
          {/* <Badge badgeContent={userData && userData.cart ? userData.cart.length : 0} color="primary">
          </Badge> */}
          {/* {currentUser.data !== null ? (
            <DropDown>
              <Avatar
                displayName={currentUser.data?.displayName}
                profilePicture={currentUser.data?.photo}
              />

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
          )} */}
        </div>
        {/* <IconButton sx={{ position: 'absolute', right: '8px' }}>
                    <SearchIcon />
                </IconButton> */}
      </div>
      {/* <Box
        sx={{
          mx: 4,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          fontSize: 13,
          borderTop: '1px solid #e7e7e78a',
          position: 'sticky',
          top: 0
        }}
      >
        <Link style={{ display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 700 }} to="/shop" htmlFor="">
          <MenuIcon fontSize="small" sx={{ mr: 2 }} />
          All Categories
        </Link>
        <Box display='flex' gap={3} textTransform='uppercase'>
          <Link to="/shop" className='nav_bottom' htmlFor="">
            Latest
          </Link>
          <Link to="/shop" className='nav_bottom' htmlFor="">
            Product
          </Link>
          <Link to="/shop" className='nav_bottom' htmlFor="">
            Shop
          </Link>
        </Box>
        <Link style={{ marginLeft: 'auto' }} to="/sell" htmlFor="">
          Sell on Artworld
        </Link>
      </Box> */}
    </nav>
  );
}

export default Header;

function MessagesLink() {
  const unreadMessages = useStore(s => s.unreadMessages)
  const totalUnreadMessages = useMemo(() => {
    const u_msg = Array.from(unreadMessages?.values())
    return u_msg?.reduce((c, a) => {
      c += a.length
      return c
    }, 0) || 0
  }, [unreadMessages])

  return <Badge badgeContent={totalUnreadMessages} color="primary">
    <Link to='/chat' className='create' htmlFor="">Messages</Link>
  </Badge>;
}

