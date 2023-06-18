import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {faCircleInfo} from '@fortawesome/free-solid-svg-icons';
import {faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons';

import logo from "../assets/logo.png";

const Side = ({ onItemClick }) => {

    
        const handleItemClick = (option) => {
          onItemClick(option);
        }
      
    return (
        <div className='sidebar'>
            <div className='logo'>
                <img className = 'sidebar-logo' src={logo} alt=""/>

            </div>

            <div className='sidebar-options'>
                <ul>
                    <li onClick={() => handleItemClick('Newcasting')}>
                        <FontAwesomeIcon icon={faPlus} /> <span>Create new casting</span>


                    </li>
                    <li onClick={() => handleItemClick('Mycasting')}>
                        <FontAwesomeIcon icon={faCircleInfo} /> <span>Casting Overview</span>


                    </li>

                    <li>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} /> <span>logout</span>


                    </li>
                </ul>

            </div>
            
        </div>
    );
};

export default Side;