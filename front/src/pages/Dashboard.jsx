import * as React from 'react';
import { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logo from "../assets/logo.png";
import logoB from "../assets/logoB.png";
import { faPlus, faCircleInfo, faArrowRightFromBracket, faCubes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyCasting from '../composants/MyCasting';
import NewCasting from '../composants/NewCasting';


const drawerWidth = 340;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = useState('Newcasting');



  const handleSidebarItemClick = (option) => {
      setSelectedOption(option);
    };

    useEffect(() => {
        if (mobileOpen) {
          setMobileOpen(false);
        }
      }, [selectedOption]);



    let contentComponent = null;

    if (selectedOption === 'Newcasting') {
      contentComponent = <NewCasting />;
    } else if (selectedOption === 'Mycasting') {
      contentComponent = <MyCasting></MyCasting>;}

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className='dashboard-side'>
      
      <Box sx={{
        height:'12%',
        width: '100%',
        display: 'flex',
        alignItems:'center',
        justifyContent:'center',
        
      }}>
        <img className = 'sidebar-logo-dashboard' src={logo} alt=""/>

     </Box >
      <Divider />
      <Box >
      <List >
      <ListItemButton onClick={() => handleSidebarItemClick('Newcasting')} id='sidebar-menu'>
        <ListItemIcon>
          <FontAwesomeIcon icon={faPlus}  className='sidebar-icon' />
        </ListItemIcon>
        <ListItemText primary="Ajouter un nouveau casting" />
      </ListItemButton>
      <ListItemButton onClick={() => handleSidebarItemClick('Mycasting')} id='sidebar-menu'>
        <ListItemIcon>
          <FontAwesomeIcon icon={faCircleInfo} className='sidebar-icon'   />
        </ListItemIcon>
        <ListItemText primary="Mes Castings" />
      </ListItemButton>
      <ListItemButton onClick={() => handleSidebarItemClick('Mycasting')} id='sidebar-menu'>
        <ListItemIcon>
          <FontAwesomeIcon icon={ faCubes} className='sidebar-icon'   />
        </ListItemIcon>
        <ListItemText primary="Viewer" />
      </ListItemButton>
      <ListItemButton  id='sidebar-menu'>
        <ListItemIcon>
          <FontAwesomeIcon icon={faArrowRightFromBracket}  className='sidebar-icon' />
        </ListItemIcon>
        <ListItemText primary="Se deconnecter" />
      </ListItemButton>
    </List>

      </Box>
 
  
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex',
    
    
    height:'' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          height:'15%',
          display:'flex',
          justifyContent:'center',
          backgroundColor:' #007fae'
         
        }}
      >
        <Toolbar sx={{
            display:'flex',
            justifyContent:'space-between'
        }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' }, fontSize:'50px' }}
          >
            <MenuIcon sx={{fontSize:'0.9em'}}/>
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{alignContent:'center' , marginRight:'40%'}}>
            Project dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ 
            height: '100vh',
            
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'fff',
            flexGrow: 1,
            overflowX:'hidden',
            
             
             
            
            width: '100%',
            maxWidth: {
             md: '100%',
    },   
             }}
      >
        {contentComponent}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;