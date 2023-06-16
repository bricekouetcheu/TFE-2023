import React, { useState, useEffect } from 'react';
import { IFCLoader } from "web-ifc-three/IFCLoader";
import { Canvas } from "@react-three/fiber";
import * as THREE from 'three';
import { OrbitControls } from "@react-three/drei";
import { IFCWALLSTANDARDCASE, IFCSLAB } from 'web-ifc';
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from "three-mesh-bvh";

const ifcLoader = new IFCLoader();

const Ifcviewer = () => {
  const [ifcModel, setIfcModel] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [entities, setEntities] = useState(null);

  console.log(entities)

  ifcLoader.ifcManager.setWasmPath("../../");
  ifcLoader.ifcManager.setupThreeMeshBVH(
    computeBoundsTree,
    disposeBoundsTree,
    acceleratedRaycast
  );

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
      const properties = await manager.getItemProperties(0, id, false);
      propertiesArray.push(properties);
    }
    return propertiesArray;
  }

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
    <div className='ifcviewer-container'>
      <input type="file" name="load" className="file-input" onChange={loadIfcModel} />
      <select onChange={handleTypeChange}>
        <option value="">Select Type</option>
        <option value="IFCWALLSTANDARDCASE">Wall</option>
        <option value="IFCSLAB">Slab</option>
      </select>
      {entities && (<select onChange={handleEntityChange} value={selectedEntity}>
        <option value="">Select Entity</option>
        {entities.map((entity, index) => (
          <option key={index} value={entity.Name.value}>{entity.Name.value}</option>
        ))}
      </select>)}
    </div>
  );
};

export default Ifcviewer;
