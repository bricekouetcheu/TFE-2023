import { IFCLoader } from "web-ifc-three/IFCLoader";
const ifcLoader = new IFCLoader();

export async function getAllItemByCategory(category) {
    const manager = ifcLoader.ifcManager;
    const items = await manager.getAllItemsOfType(0, category, false);
    return items;
  }

  // fonction permettant de recuperer les proprietés des elements du tableau passé en paramettre
  export async function getItem(ids) {
    const manager = ifcLoader.ifcManager;
    const propertiesArray = [];
    for (const id of ids) {
      const properties = await manager.getItemProperties(0, id, false);
      propertiesArray.push(properties);
    }
    return propertiesArray;
  }

  export async function getEntityProperties(ids) {
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
export function getTotalVolume(objets) {
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