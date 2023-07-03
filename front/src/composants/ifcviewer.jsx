import React, { useState, useEffect } from 'react';
import { IFCLoader } from "web-ifc-three/IFCLoader";

import { IFCWALLSTANDARDCASE, IFCSLAB } from 'web-ifc';
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from "three-mesh-bvh";

const ifcLoader = new IFCLoader();

const Ifcviewer = () => {
 const [ifcModel, setIfcModel] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [entities, setEntities] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(entities)
 // let ifcModel = null;
  ifcLoader.ifcManager.setWasmPath("../../");
  ifcLoader.ifcManager.setupThreeMeshBVH(computeBoundsTree, disposeBoundsTree, acceleratedRaycast);
 
 

  const loadIfcModel = async (e) => {
    const file = e.target.files[0];
    const ifcURL = URL.createObjectURL(file);
    setLoading(true);
    ifcLoader.load(ifcURL, (model) => 
              setIfcModel(model))
    setLoading(false);
  };

  

  async function getAllItemByCategory(category) {
    const manager = ifcLoader.ifcManager;
    const items = await manager.getAllItemsOfType(0, category, false);
    console.log(items)
    return items;
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
    return propertiesArray
  }

  function calculerSommeNetVolume(objets) {
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


  async function getItemProperties(ids) {
    const manager = ifcLoader.ifcManager;
    const propertiesArray = [];
    for (const id of [ids[0]]) {
      const properties = await manager.getItemProperties(0, id, true);
      propertiesArray.push(properties);
    }
    return propertiesArray;
  }

  /*const filtrerObjetParPropriete = (arr)=> {
    const objetFiltre = arr.find(objet => {
      return objet.Name && objet.Name.value === "BaseQuantities";
    });
  
    if (objetFiltre && objetFiltre.Quantities && Array.isArray(objetFiltre.Quantities)) {
      const objetQuantite = objetFiltre.Quantities.find(quantite => {
        return quantite.Name && quantite.Name.value === "GrossVolume";
      });
      console.log('test2',objetQuantite.VolumeValue.value);
    }
  
    return undefined;
  }

 async function getVolume(id){
      const manager = ifcLoader.ifcManager;
      const quantity = await manager.getPropertySets(0,id,true)
    
        filtrerObjetParPropriete(quantity)
      console.log('test',quantity)
  }*/





  useEffect(() => {
    let mounted = true;
  
   /* const loadIfcFileFromServer = async () => {
      const response = await axios.get('http://localhost:4000/api/files/10', {
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
    };*/
  
    //loadIfcFileFromServer();
  
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    
    let mounted = true;
    const fetchData = async () => {
     /* getVolume(34509)*/
     /* getVolume(25322)*/
     calculerSommeNetVolume(await getEntityProperties([34509, 59290]))
     /*console.log('toto',await getEntityProperties([34509, 59290]))*/
     
      if (selectedType === 'IFCWALLSTANDARDCASE') {
        const walls = await getAllItemByCategory(IFCWALLSTANDARDCASE);
        const properties = await getItemProperties(walls);
        if (mounted) {
          setEntities(properties);
        }
      } else if (selectedType === 'IFCSLAB') {
        const slabs = await getAllItemByCategory(IFCSLAB);
        const properties = await getItemProperties(slabs);
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
    <div className='ifcviewer-container'>
      <input type="file" name="load" className="file-input" onChange={ loadIfcModel}  />
      <select onChange={handleTypeChange}>
        <option value="1">Select Type</option>
        <option value="IFCWALLSTANDARDCASE">Wall</option>
        <option value="IFCSLAB">Slab</option>
      </select>
      {entities && (
        <select onChange={handleEntityChange} value={selectedEntity}>
          <option value="">Select Entity</option>
          {entities.map((entity, index) => (
            <option key={index} value={entity.expressID}>
              {entity.Name.value}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Ifcviewer;


