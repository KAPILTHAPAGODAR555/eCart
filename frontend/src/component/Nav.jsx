import * as React from 'react';
import { useState , useEffect } from 'react';
import axios from 'axios';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';


import Cookie from 'js-cookie';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { showCart } from './config/redux/action';

const drawerWidth = 240;
let navItems = ['About', 'Contact' , 'Signup'];

  

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}));
const map = {
  'About': '/about',
  'Contact' : '/contact',
  'Signup' : '/signup',
  'cart' :'/cart',
  'logout' :'/logout',
  'order' :'/order'
}
const navigationIcons = {
  'About': <InfoIcon />,
  'Contact': <ContactPhoneIcon />,
  'Signup': <PersonAddIcon />,
  'logout': <LogoutIcon />,
  'order': <ShoppingBagIcon />
};


export default function Nav(props) {
  const { window } = props;
  let navigate = useNavigate();
  const {isLogin  , cartItemsStatus , cartCount} = useSelector(state => state.auth); 
  const [mobileOpen, setMobileOpen] = React.useState(false);
   const [user , isUser] = useState({
          status: false,
          id: 0
      });
      const handleLogout = () => {
        
         let token = Cookie.get('token');
            if(token){
                Cookie.remove('token');
            }
             isLogin = false;
             navigate("/");
      }
      const dispatch = useDispatch();
      const [ccart , setCart] = useState([]);
    useEffect(()=> {
      dispatch(showCart());
    }, [])
//   if(user.status){
//     console.log(user.status);
//   navItems =  [  'order' , 'cart', 'About', 'Contact' , 'logout'];
// }
  if(isLogin){
    console.log(user.status);
  navItems =  [  'order' , 'cart', 'About', 'Contact' , 'logout'];
}

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Link to='/'>
      <Typography variant="h6" sx={{ my: 2 }}>
        eCart
      </Typography>
    </Link>
      <Divider />
      <List>
        {navItems.map((item) => (

          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
             {item == 'logout'? <ListItemText primary={item} onClick={handleLogout} />  : <Link to={map[item]} style={{textDecoration: 'none' , color: 'black'}}>
                <ListItemText primary={item} />
              </Link>}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <Link to='/' style={{textDecoration: 'none' , color: 'white'}}>
            eCart
            </Link>
          </Typography>
        
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
            <Link to={map[item]}>
              <Button key={item} sx={{ color: '#fff' }}>
                 <StyledBadge badgeContent={item=='cart' && cartItemsStatus ? cartCount : 0} color="secondary">
                {item == 'cart' ? <ShoppingCartIcon /> : navigationIcons[item]}
                </StyledBadge>
           
              </Button>
             </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}