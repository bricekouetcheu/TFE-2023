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
        try{
            const response = await axios.get(logoutUrl, {withCredentials:true}) 
            if(response.data === "deconnexion reussie"){
                Navigate('/')

            }  

        }catch(err){
            console.log(err)

        }
       
    }


    /**
     * make a http request to get an user profile
     * setUserData is updated with data 
     *
     * @async
     * @function
     * @name getUserProfile
     * @returns {void}
     */
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
                <div className='project-page-header-logout' >
                {currentPage ==='home'?

                (<>
                        <>
                        
                        <p className='userInfo1' onClick={()=>Navigate('/AddProject')} >Ajouter un nouveau projet</p>
                        <div className='userInfo1' onClick={()=>setDropdownOpen(!dropdownOpen)}>
                            <p className=''>{userData[0].user_name}  {userData[0].user_surname}</p>
                            <img src={profile1} alt='img-profile'/>
                        </div>
                     
                    </>
                </> ):
                (
                    <>
                        <p className='userInfo' onClick={()=>Navigate('/projects')}>Acceuil</p>
                        <p className='userInfo' onClick={()=>Navigate(-1)} >Tableau de bord</p>
                        <div className='userInfo' onClick={()=>setDropdownOpen(!dropdownOpen)}>
                            <p className=''>{userData[0].user_name}  {userData[0].user_surname}</p>
                            <img src={profile1} alt='img-profile'/>
                        </div>
                     
                    </>
                )}
               
                

                <div className={`navbar-dropdown ${dropdownOpen ? 'is-active' : ''}`}>
                   <div className="navbar-item" onClick={handleLogout}>
                    <BiLogOut size={25}/> Se deconnecter
                    </div>
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