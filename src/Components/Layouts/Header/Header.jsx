import { useMemo, useState } from "react";
import "./header.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import DropDown from "../../Ui/DropDown/DropDown";
import Avatar from "../../Ui/Avatar/Avatar";
import { useNavigate } from "react-router-dom";
import Search from "../../../Components/Ui/Search/Search";
import FavoriteIcon from "@mui/icons-material/FavoriteBorder";
import { useStore } from "../../../Store/Store";
import useCurrentUser from "../../../Hooks/useCurrentUser";
import useAuth from "../../../Hooks/useAuth";
import { Badge, Box, IconButton, Typography } from "@mui/material";
import CartIcon from '@mui/icons-material/ShoppingBagOutlined';
import LoginIcon from '@mui/icons-material/LoginOutlined';
import PersonIcon from '@mui/icons-material/PersonOutlineOutlined';

function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation()
  let pathName = pathname.slice(1)
  const { currentUser } = useCurrentUser();
  const { handleLogout } = useAuth()

  return (
    <>
      <nav id='navbar'>
        <div className="navbar">
          <div className="left">
            <Link to="/">
              <label className="header_brandName">
                ARTWORLD.
              </label>
            </Link>
            {
              pathName !== 'admin' &&
              <Search onSearch={(query) => navigate(`/results?q=${query}`)} />
            }
          </div>
          <div className="right">
            <Link id='nav_links' to='/cart' >
              <CartIcon fontSize='small' />
            </Link>
            {
              currentUser.data !== null ?
                <Select
                  mainElement={
                    <IconButton size='small'>
                      <Avatar
                        sx={{ width: 30, height: 30 }}
                        displayName={currentUser.data?.displayName}
                        profilePicture={currentUser.data?.photo}
                      />
                    </IconButton>
                  }
                >
                  {
                    currentUser.data?.role === 'seller' &&
                    <Menu to="/dashboard">Dashboard</Menu>
                  }
                  <Menu to='/profile'>Profile</Menu>
                  <Menu onClick={handleLogout}>Logout</Menu>
                </Select>
                :
                <Link id='nav_links'
                  to="/login"
                >
                  <LoginIcon fontSize='small' />
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
        <Link style={{ display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 700 }} to="/shop" >
          <MenuIcon fontSize="small" sx={{ mr: 2 }} />
          All Categories
        </Link>
        <Box display='flex' gap={3} textTransform='uppercase'>
          <Link to="/shop" className='nav_bottom' >
            Latest
          </Link>
          <Link to="/shop" className='nav_bottom' >
            Product
          </Link>
          <Link to="/shop" className='nav_bottom' >
            Shop
          </Link>
        </Box>
        <Link style={{ marginLeft: 'auto' }} to="/dashboard" >
          Sell on Artworld
        </Link>
      </Box> */}
      </nav>
    </>
  );
}

function Select({ mainElement, children }) {

  return (
    <Box
      sx={{
        position: "relative",
        ":hover": {
          ".select_options": {
            opacity: 1,
            translate: '10px 0',
            pointerEvents: 'all',
            transition: '0.2s',
          }
        }
      }}
    >
      {mainElement}
      <Box
        className='select_options'
        sx={{
          position: 'absolute',
          right: 0,
          bgcolor: 'white',
          opacity: 0,
          translate: '10px 20px',
          pointerEvents: 'none',
          // borderRadius: '5px',
          overflow: 'hidden',
          transition: '0.1s',
          boxShadow: "0 5px 10px rgb(0 0 0 / 17%)",
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

function Menu({ children, to, onClick }) {

  return (
    <Link to={to} onClick={onClick}>
      <Box
        sx={{
          pl: 3,
          pr: 5,
          py: 1,
          bgcolor: 'white',
          display: 'flex',
          alignItems: 'center',
          transition: '0.2s',
          ":hover": {
            color: 'var(--brand) !important',
          }
        }}
      >
        <Typography fontSize={14} fontWeight={600}>
          {children}
        </Typography>
      </Box>
    </Link>
  )
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
    <Link to='/chat' className='create' >Messages</Link>
  </Badge>;
}

