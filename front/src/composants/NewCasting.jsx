import React, {useState , useEffect} from 'react';
import { IFCLoader } from "web-ifc-three/IFCLoader";
import { Canvas } from "@react-three/fiber";
import * as THREE from 'three';
import { OrbitControls } from "@react-three/drei";
import { IFCWALLSTANDARDCASE, IFCSLAB } from 'web-ifc';
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from "three-mesh-bvh";
import axios from "axios"
import { useParams } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Select, { components } from "react-select";
import InputOption from './InputOption'
import { getAllItemByCategory, getItem, getEntityProperties, getTotalVolume } from './ifcUtils';

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
      };;
   
    //config web-ifc-three
    ifcLoader.ifcManager.setWasmPath("../../");
    ifcLoader.ifcManager.setupThreeMeshBVH(
      computeBoundsTree,
      disposeBoundsTree,
      acceleratedRaycast
    );

    // fonction permettant de recuperer les entités selon le type passé en paramettre
   
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
                 <Backdrop
                 sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, position:'absolute', left:'50', top:'50' }}
                 open={openCircular}
                
                 >
                 <CircularProgress color="inherit" />
                </Backdrop> 
            <div className='dashboard-nav'>
                <h1>Project Dashboard</h1>
            </div>
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
                <button> Create</button>
            </div>
        
    </div>
    );
};

export default NewCasting;