import React, {useEffect, useState } from 'react';
import { MdOutlineLogout} from "react-icons/md";
import logo from "../assets/logo.png";
import { HiUserCircle } from "react-icons/hi"
import { Link } from 'react-router-dom'
import { BiLogOut } from "react-icons/bi"
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {faXmark} from '@fortawesome/free-solid-svg-icons';



const Navbar = ( ) => {

    const [click, setClick] = useState(false);
    const [dropdownOpen , setDropdownOpen] = useState(false)
    const [user, setUser] = useState();
    const getUserProfileUrl = process.env.REACT_APP_HOST+'api/profile';
    const config = {
        headers:{"accessToken" : localStorage.getItem('accessToken')}
    }

    const handleClick = () => setClick(!click);

    const handleLogout = ()=>{
       
    }

    const getUserProfile = ()=>{
        axios.get(getUserProfileUrl , config)
        .then(response => {
            
            const data = response.data
            setUser(data)
        }).catch(err=>{
            console.log(err)
        })

    }
    
   
  
    const closeDropdown = () => {
        setDropdownOpen(false);
      };



   
  
   

    return (
        
        <div className='project-page-header'>
            <img className = 'project-page-header-Img' src={logo} alt=""/>
            <div className='project-page-header-logout' onClick={()=>setDropdownOpen(!dropdownOpen)}>
                <HiUserCircle size={50}/>
                {user && (<p>{user.name}  {user.surname}</p>) }

                <div className={`navbar-dropdown ${dropdownOpen ? 'is-active' : ''}`}>
                    <Link to="/profile" className="navbar-item" onClick={closeDropdown}>
                    <HiUserCircle size={25}/> My Profile
                    </Link>
                    <div className="navbar-item" onClick={handleLogout}>
                    <BiLogOut size={25}/> Logout
                    </div>
                 </div>
                
            </div>
          
            <div className="nav-icon" onClick={handleClick}>
                <FontAwesomeIcon icon={click ? faXmark : faBars} size='xl' />
            </div>
            

         </div>
         
       
    );
};

export default Navbar;