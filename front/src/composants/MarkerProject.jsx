import React from 'react';
import { MapContainer, TileLayer, Marker , Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import L from 'leaflet';
import { popupContent, popupHead, popupText, okText } from "./popupStyles";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';




const MarkerProject = (props) => {
  

  const Navigate = useNavigate()

  
  const icon = L.icon({ 
    iconRetinaUrl:iconRetina, 
    iconUrl: iconMarker, 
    shadowUrl: iconShadow 
});



    return (
        <Marker position={props.position} icon={icon}  style={{height:'20px' }}>
         <Popup className="request-popup">
          <div className='popup-content'>
            <h3>{props.name}</h3>
            <div className='popup-option'>
              <button onClick={()=>{Navigate(`/HomeProject/${props.id}`)}}>Open</button>
              <FontAwesomeIcon icon={faTrash} />

            </div>
            
          
            
          </div>
        </Popup>
          
        
      </Marker>
    );
};

export default MarkerProject;