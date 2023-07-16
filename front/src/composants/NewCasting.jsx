import React, {useState , useEffect, useRef} from 'react';
import { IFCLoader } from "web-ifc-three/IFCLoader";
import { IFCWALLSTANDARDCASE, IFCSLAB } from 'web-ifc';
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from "three-mesh-bvh";
import axios from "axios"
import { useParams } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Select, { components } from "react-select";
import InputOption from './InputOption'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
/*import { getAllItemByCategory, getItem, getEntityProperties, getTotalVolume } from './ifcUtils';*/

const ifcLoader = new IFCLoader();



const NewCasting = () => {
 

    //Declaration des states
    const [errorMessage, setErrorMessage]= useState('')
    const [ifcModel, setIfcModel] = useState(null);
    const [selectedType, setSelectedType] = useState("");
    const [openCircular, setOpenCircular] = useState(false)
    const [selectedEntity, setSelectedEntity] = useState("");
    const [entities, setEntities] = useState("");
    const [description, setDescription] = useState("")
    const {project_id} = useParams();
    const getFilesUrl =  process.env.REACT_APP_API_HOST+`api/files/${project_id}`
    const createCastingUrl = process.env.REACT_APP_API_HOST+`api/projects/${project_id}/casting`
    const [submitted, setSubmitted] = useState(false)
    const selectRef = useRef(null);
    
    

   
    //config web-ifc-three
    ifcLoader.ifcManager.setWasmPath("../../");
    ifcLoader.ifcManager.setupThreeMeshBVH(
      computeBoundsTree,
      disposeBoundsTree,
      acceleratedRaycast
    );


    //recuperer tous les elements apartenant a une certaine categorie
     async function getAllItemByCategory(category) {
        const manager = ifcLoader.ifcManager;
        const items = await manager.getAllItemsOfType(0, category, false);
        return items;
      }
    
      // fonction permettant de recuperer les proprietés des elements du tableau passé en paramettre
       async function getItem(ids) {
        const manager = ifcLoader.ifcManager;
        const propertiesArray = [];
        for (const id of ids) {
          const properties = await manager.getItemProperties(0, id, false);
          propertiesArray.push(properties);
        }
        return propertiesArray;
      }
    
      //
      async function getEntityProperties(ids) {
        const manager = ifcLoader.ifcManager;
        const propertiesArray = [];
        
        let p = {};
        let keyList = ['HasProperties', 'Quantities']
        for (const id of ids) {
          const properties = await manager.getPropertySets(0, id, true);
          
          for (const property of properties) {
            for (const keyELement of keyList) {
              if ( keyELement in property) {
                for (const property2 of property[keyELement]) {
                  for (const [key, value] of Object.entries(property2)) {
                    /*console.log(key, value);*/
                    if  (key.includes("Value")){
                      p[property2['Name']['value']] = value['value'];
                      break;
                    } 
                  }
                }
              }
            }
          }
          propertiesArray.push(p);
        }
       
        return propertiesArray;
      }
    
    //fonction permettant de recuperre le volume total du beton a utiliser pour le casting   
     function getTotalVolume(objets) {
    let somme = 0;
    
    for (let i = 0; i < objets.length; i++) {
      
      const objet = objets[i];
      if (objet.hasOwnProperty('NetVolume')) {
        somme += objet.NetVolume;
      }
    }
    return somme
    }
   
      useEffect(() => {
        
         // fonction permettant de recuperer le fichier ifc sur le serveur
        const loadIfcFileFromServer = async () => {

            setOpenCircular(true)
            const response = await axios.get(
                getFilesUrl,
                {
                  headers: {
                    "accessToken": localStorage.getItem('token')
                  },
                  responseType: 'blob'
                }
              );
            
            const file = await response.data;
            const blob = new Blob([file]);
            const ifcUrl = URL.createObjectURL(blob);
            ifcLoader.load(ifcUrl, (model) => {
                         setIfcModel(model);
                         setOpenCircular(false)
                       
              });
              
  
        };
      
        loadIfcFileFromServer();
      
    
      }, []);


      useEffect(() => {
        // ...
    
        if (submitted) {
          // Réinitialiser les états apres la soumission du formulaire
          setDescription("");
          selectRef.current.clearValue();
          setSelectedType("0");
          setSubmitted(false);
        }
    
        // ...
      }, [submitted]);
    
      useEffect(() => {
        
        let mounted = true;
        const fetchData = async () => {
          if (selectedType === 'IFCWALLSTANDARDCASE') {
            const walls = await getAllItemByCategory(IFCWALLSTANDARDCASE);
            const properties = await getItem( walls )
            if (mounted) {
              setEntities( properties );
            }
          } else if (selectedType === 'IFCSLAB') {
            const slabs = await getAllItemByCategory(IFCSLAB);
            const properties = await getItem(slabs)
            if (mounted) {
              setEntities(properties);
            }
          }
        };
        if (ifcModel) {
          fetchData();
        }
        return () => {
          mounted = false;
        };
      }, [ifcModel, selectedType]);





      const handleDescription = (e)=>{
        setDescription(e.target.value)
      }
    
      const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
        setSelectedEntity(null);
      };
    
      const handleEntityChange = (selectedOptions) => {
        const selectedValues = selectedOptions.map((option) => option.value);
        setSelectedEntity(selectedValues)
        if(submitted){
            setSelectedEntity([])
        }
        
      };

      const handleSubmit = async (e)=>{
        try{
            if(selectedEntity){
                let castingData = {};
                if(selectedType === 'IFCWALLSTANDARDCASE'){
                     castingData = {
                        casting_description: description,
                        casting_volume: Math.ceil(getTotalVolume(await getEntityProperties(selectedEntity))),
                        template_id: 1
                    }

                }else if(selectedType === 'IFCSLAB'){
                    
                    castingData = {
                        casting_description: description,
                        casting_volume: Math.ceil(getTotalVolume(await getEntityProperties(selectedEntity))),
                        template_id: 2
                    }
                }
             
                const result = await axios.post(createCastingUrl , castingData)
                
                Swal.fire({
                    icon: 'success',
                    title: 'New casting created!',
                    showConfirmButton: true,
                    confirmButtonColor: '#007fae',
                    timer: 2500,
                    
                  });
                 setSubmitted(true)
                 
                
                console.log(result.data)
            }else{
                setErrorMessage('Please choose the entities')
              
                console.log(setErrorMessage)

            }

        }catch(err){
            console.log(err)
        }

        e.preventDefault()
      }


    return (
        <div className='dashboard-content'>
              
            
              
              <div className={ entities ? 'formNewCasting': 'formNewCastingEntities' }>
               
               <h3> Create a new casting</h3>
               <div className='form-casting'>
                     <div className='ifcviewer-container'>
     
                        <select onChange={handleTypeChange} value={selectedType}>
                           <option value="0">Select Type</option>
                           <option value="IFCWALLSTANDARDCASE">Wall</option>
                           <option value="IFCSLAB">Slab</option>
                       </select>
                       {entities && (<Select
                                           ref={selectRef}
                                           className='select-checkbox'
                                            defaultValue={[]}
                                            isMulti
                                            closeMenuOnSelect={false}
                                            hideSelectedOptions={false}
                                            onChange={ handleEntityChange}
                                           options={entities.map((entity, index) => ({
                                               value: entity.expressID,
                                               label: entity.Name.value
                                           }))}
                                           components={{ Option: InputOption }}
                                           />)}
                       
                       </div>
                   <div className='Add-description'>
                       <label htmlFor="casting name">
                           Add a Description
                       </label>
                       <textarea onChange={handleDescription} value={description} ></textarea>
                   </div>
               </div>
               <button className='NewCasting-btn' onClick={handleSubmit}  > Create </button>
           </div>
           
    </div>
    );
};

export default NewCasting;