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
import userIcon from '../assets/user.png'
import profile1 from '../assets/profile1.png'



const Navbar = ({currentPage}) => {

    const [click, setClick] = useState(false);
    const [dropdownOpen , setDropdownOpen] = useState(false)
    const [userData, setUserData] = useState();
    const getUserProfileUrl = process.env.REACT_APP_API_HOST+'api/profile';
    const logoutUrl = process.env.REACT_APP_API_HOST+'api/logout';
    const Navigate = useNavigate()
   
   
   

    const handleClick = () => setClick(!click);

    const handleLogout = async()=>{
        try{
            const response = await axios.get(logoutUrl, {withCredentials:true}) 
            if(response.data == "deconnexion reussie"){
                Navigate('/')

            }  

        }catch(err){
            console.log(err)

        }
       
    }

    const getUserProfile = async()=>{
        try{
            
            const response = await axios.get(getUserProfileUrl , {withCredentials:true})
            const data = response.data
            
            setUserData(data)
            

        } catch(err){
            console.log(err)
        }
       
        
    }


    useEffect(()=>{
        getUserProfile()
       
        
    },[])
   
  
    const closeDropdown = () => {
        setDropdownOpen(false);
      };



   
  
   

    return (
   
        <div className='project-page-header' data-testid='navbar'>
                { userData && (
                        <>
                        
                <img className = 'project-page-header-Img' src={logo} alt=""/>
                <div className='project-page-header-logout' onClick={()=>setDropdownOpen(!dropdownOpen)}>
                <p className='userInfo'>{userData[0].user_name}  {userData[0].user_surname}</p>
                <img src={profile1} alt='img-profile'/>
                

                <div className={`navbar-dropdown ${dropdownOpen ? 'is-active' : ''}`}>
                    {currentPage === 'home'?
                    ( <div className="navbar-item" onClick={handleLogout}>
                    <BiLogOut size={25}/> Se deconnecter
                    </div>)
                    :

                    (<>
                    <div className="navbar-item" onClick={()=>Navigate(-1)}>
                        Tableau de bord
                    </div>
                    <div className="navbar-item" onClick={handleLogout}>
                    <BiLogOut size={25}/> Se deconnecter
                    </div>
                    </>)
                    }
                   
                    </div>
                
            </div>
                
                <div className="nav-icon" onClick={handleClick}>
                    <FontAwesomeIcon icon={click ? faXmark : faBars} size='xl' />
                </div></>

          
      
      )}
       
        
       </div>   
       
    );
};

export default Navbar;