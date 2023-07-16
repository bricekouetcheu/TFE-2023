import * as React from 'react';
import Test from '../composants/Test';
import { useEffect,useState,useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../composants/Navbar';
import Test2 from '../composants/Test2';
import { CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

// Votre composant parent

const  Order = ()=>{
  const {casting_id} = useParams()
  const getTemplateUrl = process.env.REACT_APP_API_HOST+`api/templateData/${casting_id}`
  const updateCastingUrl = process.env.REACT_APP_API_HOST+`api/castings/${casting_id}`
  const [tableData, setTableData] = useState();
  const [token, setToken] = useState('')
  const [order, setOrder] = useState()
  const [submitted, setSubmitted] = useState(false);
  const scrollRef = useRef(null)
  const Navigate = useNavigate()

  
  console.log(order)


  //fonction permettant de scroller 
  const scrolltoLastElement = () =>{
    const lastElement = scrollRef.current?.lastElement ;
     lastElement?.scrollIntoView({ behavior: 'smooth' });

  }
  
 
//fonction permtaant de passer la commande de beton
  const submitOrder = async()=>{
    try{
      const result = await axios.put(updateCastingUrl)
      console.log(result.data)

      Swal.fire({
        icon: 'success',
        title: 'Commande effectuée avec success!',
        showConfirmButton: true,
        confirmButtonColor: '#007fae',
        timer: 1500,
        
      });

      setTimeout(() => {
        Navigate(-1)
        
      }, (1502));
     

    }catch(err){

    }
  }

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

  useEffect(()=>{
    if(order){
      scrolltoLastElement()
    }
  },[order])

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
        scrollRef.current.scrollIntoView( { behavior: 'smooth' , block:'end'})

       
      
      } catch (error) {
        console.error('Error submitting form:', error);
        
    }
 
    }
    
  };

  return (
    <div  className='table-page' ref={scrollRef}>
      <Navbar></Navbar>
      <h1>Verifiez les informations</h1>
      {/* Autres composants et contenu ici */}
      {tableData && <Test data={tableData} onDataChange={handleTableDataChange} /> }
      
      <button onClick={submitForm} className='form-btn-order'> Confirmer {submitted && <CircularProgress className='circular' sx={{color:"#fff"}} size={19}/>}</button>

      {order && <Test2 data={order} className = "order"  submit={submitOrder}/> }

     
    </div>
  );
}
export default Order;
