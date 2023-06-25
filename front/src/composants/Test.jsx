import React from 'react';
import Tables from './Tables';


const Test = () => {

    const data = [{"question":"type_element","value":"poutre"},
    {"question":"beton_apparent","value":true},
    {"question":"environnement","value":"exterieur"},
    {"question":"environnement_exterieur","value":"exterieur_gel_pluie"},
    {"question":"agressivite","value":"moyen"},
    {"question":"sulfates","value":true},
    {"question":"application","value":"inconnu"},
    {"question":"type_beton","value":"classique"},
    {"question":"resistance_calculee","value":true},
    {"question":"resistance","value":"C25/30"},
    {"question":"epaisseur_element","value":"40"},
    {"question":"diametre_armature","value":"0.3"},
    {"question":"enrobage","value":"40"},
    {"question":"armatures_serrees","value":true},
    {"question":"mode_dechargement","value":"pompe_gt_50m"},
    {"question":"city_pompe","value":true},
    {"question":"duree_dechargement","value":"60"},
    {"question":"chantier_accessible_camion","value":"oui"},
    {"question":"information_complementaire"}]
    return (
        <div>
        <h1>Tableau éditable</h1>
        <Tables data={data} />
      </div>
    );
};

export default Test;