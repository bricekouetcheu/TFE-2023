import {React , useEffect , useState} from 'react';
import { MapContainer, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
/*import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import L from 'leaflet';*/
import axios from 'axios';
import MarkerProject from './MarkerProject';





const Maps = () => {

  const APIkey = process.env.REACT_APP_API_KEY 
  const getProjectUrl = process.env.REACT_APP_API_HOST+'api/projects'
  const [projects, setProjects] = useState([]);
    
 

  /**
   * Retrieves all projects from the API, converts their addresses to geographic coordinates and updates the list of projects with the obtained coordinates.
   *
   * @function
   * @name getAllProject
   * @param {Function} setProjects - The function to update the list of projects with geographical coordinates.
   * @returns {void}
   */
    const getAllProject = ()=>{

      axios.get(getProjectUrl, {withCredentials:true})
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
            
            setProjects(projectsWithCoordinates);
           
           
          })
          .catch(error => {
            console.log('Erreur lors de la conversion des adresses en coordonnées', error);
          });
      })
      .catch(error => {
        console.log('Erreur lors de la requête API', error);
      });
    }
   

  /**
   * get an address coordonnates.
   *
   * @function
   * @name geocodeAddress
   * @param {string} address - address to get geocoded.
   * @returns {Promise<{lat: number, lng: number}> | null} - A promise with the geographic coordinates (latitude and longitude) of the address, or null if the address could not be geocoded.
   */
    const geocodeAddress = (address) => {
      
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


   /**
   * Make a http delete request to delete a project.
   *
   * @async
   * @function
   * @name deleteProject
   * @param {string} projectId - project ids' project to delete.
   * @returns {Promise<void>} -  A promise successfully resolved when project deletionis ok and project's list is updated.
   */
    const deleteProject = async (projectId) => {
      try {
        await axios.delete(process.env.REACT_APP_API_HOST+`api/projects/${projectId}`);
        getAllProject(); 
      } catch (error) {
        console.log('Erreur lors de la suppression du projet', error);
      }
    };
    
    useEffect(() => {
     
      getAllProject()

       
    }, []);
    
    return (
      <MapContainer center={[50.84412746075126, 4.346185725867165]} zoom={13} scrollWheelZoom={false} style={{height :'100%', width:'100%'}}>
            <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
              {projects.length > 0 && (
              projects.map((project, index) => (
           <MarkerProject
              key={index} 
               position={[project.coordinates.lat, project.coordinates.lng]}
               name={project.project_name} 
               id = {project.project_id} 
               deleteProject={deleteProject}
           />
           ))
      )}
  
      
    </MapContainer>
     
    );
};

export default Maps;