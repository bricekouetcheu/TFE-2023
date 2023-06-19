import React, { useState, useEffect } from 'react';
import { IFCLoader } from "web-ifc-three/IFCLoader";
import { Canvas } from "@react-three/fiber";
import * as THREE from 'three';
import { OrbitControls } from "@react-three/drei";
import { IFCWALLSTANDARDCASE, IFCSLAB } from 'web-ifc';
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from "three-mesh-bvh";
import axios from "axios"
const ifcLoader = new IFCLoader();

const Ifcviewer = () => {
  const [ifcModel, setIfcModel] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [entities, setEntities] = useState(null);
  console.log(entities)

  ifcLoader.ifcManager.setWasmPath("../../../");
  ifcLoader.ifcManager.setupThreeMeshBVH(computeBoundsTree, disposeBoundsTree, acceleratedRaycast);
 

  const loadIfcModel = async (e) => {
    const file = e.target.files[0];
    const ifcURL = URL.createObjectURL(file);
    ifcLoader.load(ifcURL, (model) => setIfcModel(model));
  };

  

  async function getAll(category) {
    const manager = ifcLoader.ifcManager;
    const items = await manager.getAllItemsOfType(0, category, false);
    return items;
  }

  async function getEntityProperties(ids) {
    const manager = ifcLoader.ifcManager;
    const propertiesArray = [];
    for (const id of ids) {
      const properties = await manager.getTypeProperties(0, id, false);
      propertiesArray.push(properties);
    }
    return propertiesArray;
  }

  useEffect(() => {
    let mounted = true;
  
    const loadIfcFileFromServer = async () => {
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
        const properties = await getEntityProperties(walls);
        if (mounted) {
          setEntities(properties);
        }
      } else if (selectedType === 'IFCSLAB') {
        const slabs = await getAll(IFCSLAB);
        const properties = await getEntityProperties(slabs);
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
      <input type="file" name="load" className="file-input" onChange={ loadIfcModel} />
      <select onChange={handleTypeChange}>
        <option value="1">Select Type</option>
        <option value="IFCWALLSTANDARDCASE">Wall</option>
        <option value="IFCSLAB">Slab</option>
      </select>
      {entities && (
        <select onChange={handleEntityChange} value={selectedEntity}>
          <option value="">Select Entity</option>
          {entities.map((entity, index) => (
            <option key={index} value={entity.Name.value}>
              {entity.Name.value}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Ifcviewer;

/*
import React, { useState } from 'react';

const Ifcviewer = () => {
  const ifcLoader = new IFCLoader();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ifcModel, setIfcModel] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setLoading(true);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target.result;
        const blob = new Blob([arrayBuffer]);
        console.log("the blob : ", blob);

        try {
          await loadIfcModel(blob);
          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      };

      reader.onerror = (e) => {
        setError(new Error('Erreur lors de la lecture du fichier.'));
        setLoading(false);
      };

      reader.readAsArrayBuffer(file);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const loadIfcModel = async (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const ifcData = e.target.result;
        console.log("the url : ", e.target);
        try {
          ifcLoader.load(
            ifcData,
            (model) => {
              setIfcModel(model);
              resolve();
            },
            (event) => {
              console.log('Événement de chargement : ', event);
            },
            (err) => {
              reject(new Error('Erreur lors du chargement : ' + err));
            }
          );
        } catch (err) {
          reject(new Error('Erreur lors du chargement : ' + err));
        }
      };

      reader.onerror = (e) => {
        reject(new Error('Erreur lors de la lecture du fichier.'));
      };

      reader.readAsText(blob);
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {loading && <p>Chargement en cours...</p>}
      {error && <p>Une erreur s'est produite : {error.message}</p>}
      {ifcModel && <p>Fichier IFC chargé avec succès !</p>}
    </div>
  );
};

export default Ifcviewer;*/


