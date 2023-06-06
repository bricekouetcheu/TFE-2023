import React from 'react';
import { MapContainer, TileLayer, Marker , Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import L from 'leaflet';


const MarkerProject = (props) => {
  const icon = L.icon({ 
    iconRetinaUrl:iconRetina, 
    iconUrl: iconMarker, 
    shadowUrl: iconShadow 
});

    return (
        <Marker position={props.position} icon={icon}  style={{height:'20px'}}>
        <Popup>
          A pretty CSS3 popup.
          <button>open project</button>
        </Popup>
      </Marker>
    );
};

export default MarkerProject;