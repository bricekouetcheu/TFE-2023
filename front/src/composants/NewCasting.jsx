import React, {useState , useEffect} from 'react';
import { IFCLoader } from "web-ifc-three/IFCLoader";
import { IFCWALLSTANDARDCASE, IFCSLAB } from 'web-ifc';
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from "three-mesh-bvh";
import axios from "axios"
import { useParams } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Select, { components } from "react-select";
import InputOption from './InputOption'
/*import { getAllItemByCategory, getItem, getEntityProperties, getTotalVolume } from './ifcUtils';*/

const ifcLoader = new IFCLoader();



const NewCasting = () => {

    //Declaration des states
    const [ifcModel, setIfcModel] = useState(null);
    const [selectedType, setSelectedType] = useState("");
    const [openCircular, setOpenCircular] = useState(false)
    const [selectedEntity, setSelectedEntity] = useState("");
    const [entities, setEntities] = useState("");
    const {project_id} = useParams();
    const getFilesUrl =  process.env.REACT_APP_HOST+`api/files/${project_id}`
    console.log(selectedEntity)
    
   
    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
        setSelectedEntity(null);
      };
    
      const handleEntityChange = (selectedOptions) => {
        const selectedValues = selectedOptions.map((option) => option.value);
        setSelectedEntity(selectedValues);
      };

      const handleSubmit = (e)=>{

      }
   
    //config web-ifc-three
    ifcLoader.ifcManager.setWasmPath("../../");
    ifcLoader.ifcManager.setupThreeMeshBVH(
      computeBoundsTree,
      disposeBoundsTree,
      acceleratedRaycast
    );

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
        console.log(propertiesArray);
      }
    
    //fonction permettant de recuperre le volume total du beton a utiliser pour le casting   
     function getTotalVolume(objets) {
    let somme = 0;
    console.log('test1',objets)
    
    for (let i = 0; i < objets.length; i++) {
      console.log('bonjour')
      
      const objet = objets[i];
      console.log(objet)
      if (objet.hasOwnProperty('NetVolume')) {
        console.log('test1,' , true)
        somme += objet.NetVolume;
      }
    }
    
    console.log('test3', somme);
    }
   
      useEffect(() => {
        
         // fonction permettant de recuperer le fichier ifc sur le serveur
        const loadIfcFileFromServer = async () => {

            setOpenCircular(true)
            const response = await axios.get(
                `${process.env.REACT_APP_HOST}api/files/${project_id}`,
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
    
    


    return (
        <div className='dashboard-content'>
              
           
            <div className={ entities ? 'formNewCasting': 'formNewCastingEntities' }>
         
                <h3> Create a new casting</h3>
                <div className='form-casting'>
                      <div className='ifcviewer-container'>
      
                         <select onChange={handleTypeChange}>
                            <option value="1">Select Type</option>
                            <option value="IFCWALLSTANDARDCASE">Wall</option>
                            <option value="IFCSLAB">Slab</option>
                        </select>
                        {entities && (<Select
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
                        <textarea></textarea>
                    </div>
                </div>
                <button className='NewCasting-btn '> Create</button>
            </div>
        
    </div>
    );
};

export default NewCasting;