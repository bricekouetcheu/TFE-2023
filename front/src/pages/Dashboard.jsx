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
import logo from '../assets/logo.png';
import { faPlus, faCircleInfo, faArrowRightFromBracket, faCubes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyCasting from '../composants/MyCasting';
import NewCasting from '../composants/NewCasting';
import CalendarContent from '../composants/CalendarContent';
import NewCalendar from '../composants/NewCalendar';
import plus from '../assets/plus.png';
import schedule from '../assets/schedule.png';
import logout from '../assets/logout.png';
import dashboard from '../assets/dashboard.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


const drawerWidth = 340;


/**
 * 
 * @param {*} props 
 * @returns 
 */
function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = useState('Mycasting');
  const logoutUrl = process.env.REACT_APP_API_HOST+'api/logout';
  const Navigate = useNavigate();

    /**
     * make a http get request to logout the user
     * if logout went successfully the user is redirect to login page
     *
     * @async
     * @function
     * @name handleLogout
     * @returns {void}
     */
    const handleLogout = async()=>{
      console.log('bonjour')
      try{
          const response = await axios.get(logoutUrl, {withCredentials:true}) 
          if(response.data === "deconnexion reussie"){
              Navigate('/login')

          }  

      }catch(err){
          console.log(err)

      }
     
  }


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
    contentComponent = <NewCasting/>;
  } else if (selectedOption === 'Mycasting') {
    contentComponent = <MyCasting></MyCasting>;
  } else if(selectedOption === 'MyCalendar'){
    contentComponent = <NewCalendar></NewCalendar>;
  };

  
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
        <img className = 'sidebar-logo-dashboard' src={logo} alt="" onClick={()=>Navigate('/projects')}/>

      </Box >
      <Divider />
      <Box >
        <List >
          <ListItemButton onClick={() => handleSidebarItemClick('Newcasting')} id='sidebar-menu'>
            <ListItemIcon>
              <img src={plus} alt='' className='sidebar-icon'/>
        
            </ListItemIcon>
            <ListItemText primary="Ajouter un nouveau casting" />
          </ListItemButton>
          <ListItemButton onClick={() => handleSidebarItemClick('Mycasting')} id='sidebar-menu'>
            <ListItemIcon>
              <img src={dashboard} alt='' className='sidebar-icon'/>
            </ListItemIcon>
            <ListItemText primary="Mes Castings" />
          </ListItemButton>
          <ListItemButton onClick={() => handleSidebarItemClick('MyCalendar')} id='sidebar-menu'>
            <ListItemIcon>
              <img src={schedule} alt='' className='sidebar-icon'/>
            </ListItemIcon>
          <ListItemText primary="Calendrier" />
      </ListItemButton>
      <ListItemButton  id='sidebar-menu' onClick={()=> handleLogout() } >
        <ListItemIcon>
          <img src={logout} alt='' className='sidebar-icon'/>
        </ListItemIcon>
        <ListItemText primary="Se deconnecter"  sx={{color:'#F64953'}}/>
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
          backgroundColor: '#fff',
          boxShadow: 'none',
          /*backgroundColor: '#f6f8fa',*/
          /*backgroundColor:' #007fae'*/
          /*boxShadow: '0px 1px 1px rgba(9, 30, 66, 0.25), 0px 0px 1px 1px rgba(9, 30, 66, 0.13)'*/
          border: '1px solid #EEEEEE', 
         
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
            <MenuIcon sx={{fontSize:'0.9em', color:'black'}}/>
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{alignContent:'center' , marginRight:'40%', fontWeight:'700', color:'#000000'}}>
            Tableau de bord
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        {}
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

  window: PropTypes.func,
};

export default ResponsiveDrawer;