import * as React from 'react';
import Test from '../composants/Test';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../composants/Navbar';
import Test2 from '../composants/Test2';
import { CircularProgress } from '@mui/material';

// Votre composant parent

const  Order = ()=>{
  const {casting_id} = useParams()
  const getTemplateUrl = process.env.REACT_APP_HOST+`api/templateData/${casting_id}`
  const [tableData, setTableData] = useState();
  const [token, setToken] = useState('')
  const [order, setOrder] = useState()
  const [submitted, setSubmitted] = useState(false)

  const createOrder = (initialData) => {
    const newData = {};
  
    initialData.results.forEach((item) => {
      switch (item.group) {
        case 'a':
          newData['classe De Resistance'] = Array.isArray(item.answer) ? item.answer[0] : item.answer;
          break;
        case 'b1':
          newData['Domaine utilisation'] = item.answer;
          break;
        case 'b2':
          if (item.requirementTitle === 'exigence_b2') {
            if (Array.isArray(item.answer)) {
              newData['Classe Environnement'] = item.answer.join('');
            } 
          }
          break;
        case 'c':
          newData['Consistance: Valeur cible affaissement'] = item.answer;
          break;
        case 'd':
          if(item.answer){
            newData['Diametre maximal des granulats'] = item.answer+''+item.suffix;
          }
          
          break;
        case 'e':
          if (item.requirementTitle === 'exigence_e') {
            if (Array.isArray(item.answer)) {
              newData['Donnéees Complementaires'] = item.answer.join('<br>');
            } else {
              newData['Donnéees Complementaires']  = item.answer;
            }
          }
          break;
        // ... (ajouter d'autres cas pour les autres groupes et exigences si nécessaire)
        default:
          break;
      }
    });
  
    return newData;
  };
  

  //login pour recuperer le token d'acces a la api
  const login = async () => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const requestData = {
      email: 'anonymous@bbri.be',
      password: '',
    };

    try {
      const response = await axios.post(
        'https://apibbri-betonappbeton.azurewebsites.net/auth/login',
        requestData,
        { headers }
      );

      const responseData = response.data;
      const accessToken = responseData.accessToken;
      setToken(accessToken);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  //recuperer le template lié au casting
  const gettemplateData = async()=>{
    try{
      const result = await axios.get(getTemplateUrl)
      
      const data = result.data[0].template_data;
      console.log(data)
      setTableData(data)
    }catch(err){
      console.log(err)
    }

  }

  useEffect(()=>{
    gettemplateData()
    login()

  },[])

  const handleTableDataChange = (newData) => {
    setTableData(newData);
    
  };


  const ParseData = (data)=>{
    const transformedData = {
      responses: []
    };
  
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const response = {
        question: item.question,
        value: item.value
      };
      transformedData.responses.push(response);
    }
  
    return transformedData;
  }


// fonction permettant de soumettre les données
  const submitForm = async () => {

    if(token){
      setSubmitted(true)
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      };
  
      const questions = ParseData(tableData)
  
      try {
     
        const response = await axios.post(
          'https://apibbri-betonappbeton.azurewebsites.net/forms/default/submissions',
          questions,
          { headers }
        );
  
        const responseData = response.data;
        // Handle the response data as needed
        
        setOrder(createOrder(responseData))
        setSubmitted(false)
        
        console.log(createOrder(responseData));
      } catch (error) {
        console.error('Error submitting form:', error);
        
    }
 
    }
  };

  return (
    <div  className='table-page'>
      <Navbar></Navbar>
      <h1>Verifiez les informations</h1>
      {/* Autres composants et contenu ici */}
      {tableData && <Test data={tableData} onDataChange={handleTableDataChange} /> }
      
      <button onClick={submitForm} className='form-btn-order'> commander {submitted && <CircularProgress className='circular' sx={{color:"#fff"}} size={19}/>}</button>

      {order && <Test2 data={order} /> }
    </div>
  );
}
export default Order;
