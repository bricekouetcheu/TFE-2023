import React from 'react';
import {isMobile} from 'react-device-detect';
import Navbar from '../composants/Navbar';

const Checking = () => {

    const renderContent = ()=>{
        if(isMobile){
            return(
            <div className='checking-page'>


            </div>
            )
        }
        return{

        }
    }
        
    return (
        <div className='checking-page'>
            <Navbar></Navbar>
            <div className='checking-page-content'>
                <p>Verification du Bon de livraison</p>
            </div>
            
        </div>
    );
};

export default Checking;