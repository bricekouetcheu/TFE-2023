/* eslint-disable react/prop-types */
import React from 'react';
import { Marker , Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import L from 'leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';




const MarkerProject = (props) => {
  

  const Navigate = useNavigate()


 /**
 * Handles deleting a project by calling the delete project function passed as a prop.
 *
 * @function
 * @name handleDeleteProject
 * @returns {void}
 */
  const handleDeleteProject = () => {
    props.deleteProject(props.id); // Call delete project function from props
  };

  
  const icon = L.icon({ 
    iconRetinaUrl:iconRetina, 
    iconUrl: iconMarker, 
    shadowUrl: iconShadow 
});



    return (
        <Marker position={props.position} icon={icon}  style={{height:'20px' }}>
         <Popup className="popup" style = {{width:'450px'}}>
          <div className='popup-content-option'>
            <h3>{props.name}</h3>
            <div className='popup-option'>
              <button onClick={()=>{Navigate(`/Dashboard/${props.id}`)}}>Ouvrir</button>
              <FontAwesomeIcon icon={faTrash} onClick={handleDeleteProject} cursor='pointer'/>

            </div>
            
          
            
          </div>
        </Popup>
          
        
      </Marker>
    );
};

export default MarkerProject;