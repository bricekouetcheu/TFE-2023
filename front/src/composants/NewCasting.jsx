import React, {useState , useEffect} from 'react';
import { IFCLoader } from "web-ifc-three/IFCLoader";
import { Canvas } from "@react-three/fiber";
import * as THREE from 'three';
import { OrbitControls } from "@react-three/drei";
import { IFCWALLSTANDARDCASE, IFCSLAB } from 'web-ifc';
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from "three-mesh-bvh";
import axios from "axios"
import { useParams } from 'react-router-dom';
const ifcLoader = new IFCLoader();

const NewCasting = () => {

    //Declaration des states
    const [ifcModel, setIfcModel] = useState(null);
    const [selectedType, setSelectedType] = useState("");
    const [selectedEntity, setSelectedEntity] = useState("");
    const [entities, setEntities] = useState("");
    const {project_id} = useParams();
    console.log(project_id)

    //config web-ifc-three
    ifcLoader.ifcManager.setWasmPath("../../");
    ifcLoader.ifcManager.setupThreeMeshBVH(
      computeBoundsTree,
      disposeBoundsTree,
      acceleratedRaycast
    );

    // fonction permettant de recuperer les entités selon le type passé en paramettre
    async function getAll(category) {
        const manager = ifcLoader.ifcManager;
        const items = await manager.getAllItemsOfType(0, category, false);
        return items;
      }
    
      // fonction permettant de recuperer les proprietés des elements du tableau passé en paramettre
      async function getEntityProperties(ids) {
        const manager = ifcLoader.ifcManager;
        const propertiesArray = [];
        for (const id of ids) {
          const properties = await manager.getItemProperties(0, id, false);
          propertiesArray.push(properties);
        }
        return propertiesArray;
      }


      useEffect(() => {
        let mounted = true;
       // fonction permettant de recuperer le fichier ifc sur le serveur

        const loadIfcFileFromServer = async () => {
            console.log('bonjour')
          const response = await axios.get(`http://localhost:4000/api/files/${project_id}`, {
            headers: {
              responseType: 'blob'
            },
          });
      
          const file = await response.data;
          const blob = new Blob([file]);
          const ifcUrl = URL.createObjectURL(blob);
          ifcLoader.load(ifcUrl, (model) => {
            if (mounted) {
              setIfcModel(model);
            }
          });
        };
      
        loadIfcFileFromServer();
      
        return () => {
          mounted = false;
        };
      }, []);
    
      useEffect(() => {
        
        let mounted = true;
        const fetchData = async () => {
          if (selectedType === 'IFCWALLSTANDARDCASE') {
            const walls = await getAll(IFCWALLSTANDARDCASE);
            const properties = await getEntityProperties( walls )
            if (mounted) {
              setEntities( properties );
            }
          } else if (selectedType === 'IFCSLAB') {
            const slabs = await getAll(IFCSLAB);
            const properties = await getEntityProperties(slabs)
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
    
    
    
      const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
        setSelectedEntity(null);
      };
    
      const handleEntityChange = (e) => {
        setSelectedEntity(e.target.value);
      };


    return (
        <div className='dashboard-content'>
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
                         {entities && (<select onChange={handleEntityChange}>
                                         <option value=" ">Select Entity</option>
                                             {entities.map((entity, index) => (
                                         <option key={index} value={entity.Name.value}>{entity.Name.value}</option>
                                          ))}
                                    </select>)}
                        </div>
                    <div>
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