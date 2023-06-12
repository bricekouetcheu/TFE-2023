import {React , useEffect , useState} from 'react';
import { MapContainer, TileLayer, Marker , Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import L from 'leaflet';
import axios from 'axios';
import MarkerProject from './MarkerProject';





const Maps = () => {
    const icon = L.icon({ 
        iconRetinaUrl:iconRetina, 
        iconUrl: iconMarker, 
        shadowUrl: iconShadow 
    });

   
   
    const getProjectUrl = 'http://localhost:4000/api/projects'
    const [projects, setProjects] = useState([]);
   

  
    const geocodeAddress = (address) => {
      const APIkey = process.env.REACT_APP_KEY
      console.log(APIkey)
      const apiKey = 'AIzaSyC8M7uA-l0SqfoQfF1A2iAAujYZZ5pEEDU'; // Remplacez par votre clé d'API de géocodage
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${APIkey}`;
     
  
      return axios.get(apiUrl)
        .then(response => {
          const { results } = response.data;
          if (results.length > 0) {
           
            const { lat, lng } = results[0].geometry.location;
            return { lat, lng };
          } else {
            console.log('Adresse introuvable:', address);
            return null;
          }
        })
        .catch(error => {
          console.log('Erreur lors de la requête de géocodage', error);
          return null;
        });
    };

    
    useEffect(() => {
      axios.get('http://localhost:4000/api/projects')
        .then(result => {
          const data = result.data;
  
          // Convertir les adresses en coordonnées
          const promises = data.map(project =>
            geocodeAddress(project.project_address)
              .then(coordinates => {
                return {
                  ...project,
                  coordinates: coordinates
                };
               
              })
          );
  
          Promise.all(promises)
            .then(projectsWithCoordinates => {
              console.log(projectsWithCoordinates)
              setProjects(projectsWithCoordinates);
             
             
            })
            .catch(error => {
              console.log('Erreur lors de la conversion des adresses en coordonnées', error);
            });
        })
        .catch(error => {
          console.log('Erreur lors de la requête API', error);
        });

        console.log(projects)
    }, []);
    
    return (
      <MapContainer center={[50.84412746075126, 4.346185725867165]} zoom={13} scrollWheelZoom={false} style={{height :'100%', width:'100%'}}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
        {projects.length > 0 && (
      projects.map((project, index) => (
    <MarkerProject key={index} position={[project.coordinates.lat, project.coordinates.lng]} name={project.project_name}  id = {project.project_id}/>
        ))
      )}
  
      
    </MapContainer>
     
    );
};

export default Maps;