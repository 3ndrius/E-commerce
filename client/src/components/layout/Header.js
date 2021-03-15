import * as React from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import { Route , Link} from 'react-router-dom'
import Avatar from "@material-ui/core/Avatar";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import MailIcon from "@material-ui/icons/Mail";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Box from "@material-ui/core/Box"
import MoreIcon from "@material-ui/icons/MoreVert";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Search from './Search'
import { useDispatch, useSelector } from 'react-redux';
import { requestLogoutUser } from '../../actions/userActions'
import { toast } from 'react-toastify'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    height: 90,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    paddingRight: 50,
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function PrimarySearchAppBar({history}) {

  const classes = useStyles();
  const dispatch = useDispatch();

  const { loading, user, isAuthenticated } = useSelector(state => state.auth)

  const { cartItems } = useSelector(state => state.cart) 

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(requestLogoutUser())
    toast.success("Logout success");
  }
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
   const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isAuthenticated ?  
    <Box>
      <MenuItem onClick={handleMenuClose}><Link to={'/profile'}>Profile</Link></MenuItem>
      <MenuItem onClick={handleMenuClose}><Link to={'/orders'}>Orders</Link></MenuItem>
      {(user && user.role === 'admin')  &&
      <MenuItem onClick={handleMenuClose}><Link to={'/dashboard'}>Dashboard</Link></MenuItem> }
      <MenuItem onClick={handleMenuClose} onClick={handleLogout}>Logout</MenuItem>
      </Box>
      :
      <Box>
      <MenuItem onClick={handleMenuClose}><Link to={'/login'}>Login</Link></MenuItem>
      <MenuItem onClick={handleMenuClose}><Link to={'/register'}>Register</Link></MenuItem>
    </Box>
 }
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
      
      <IconButton
          color="inherit"
          >
             <Badge badgeContent={17} color="secondary">
                <FavoriteBorderOutlinedIcon />
              </Badge>
        </IconButton>
              <Typography variant="paragraph">
                Favorites
              </Typography>
            
      </MenuItem>

      <MenuItem>
      <IconButton
          color="inherit"
          >
            <Badge badgeContent={cartItems?.length} color="secondary">
                <ShoppingCartOutlinedIcon />
              </Badge>
        </IconButton>
              <Typography variant="paragraph">
                ShopCart
              </Typography>
            </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          color="inherit"
          >
             { isAuthenticated ? <Avatar src={user.avatar.url} alt={`avatar-${user.name}`} />  : <AccountCircleOutlinedIcon /> }
        </IconButton>
          <Typography variant="paragraph">
            Account
          </Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar
        position="static"
        style={{ boxShadow: "none" }}
        className={classes.appbar}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            className={classes.title}
            variant="h6"
            
            component="div"
          >
            E-commerce
          </Typography>

          <Route render={({history}) => (<Search history={history} />)} />

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >

          { isAuthenticated ? <Avatar src={user.avatar.url} alt={`avatar-${user.name}`} style={{height:"28px", width:"28px"}}/>  : <AccountCircleOutlinedIcon /> }
            </IconButton>

               <Link to="/cart">
            <IconButton aria-label="show 4 new mails" color="inherit" style={{height:"56px", color:"white" ,padding:"0 10px"}}>
              <Badge badgeContent={cartItems?.length} color="secondary">
                 <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
                 </Link> 

            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <FavoriteBorderOutlinedIcon />
              </Badge>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
