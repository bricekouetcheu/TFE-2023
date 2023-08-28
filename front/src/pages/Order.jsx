import * as React from 'react';
import Table from '../composants/TableData';
import { useEffect,useState,useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../composants/Navbar';
import TableResult from '../composants/TableResult';
import { CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import createPDF from '../composants/CreatePdf';



const  Order = ()=>{
  const {casting_id} = useParams();
  const [casting , setCasting] = useState();
  const {project_id} = useParams();
  const getOnCastingUrl = process.env.REACT_APP_API_HOST+`api/projects/${project_id}/casting/${casting_id}`;
  const getTemplateUrl = process.env.REACT_APP_API_HOST+`api/templateData/${casting_id}`;
  const updateCastingUrl = process.env.REACT_APP_API_HOST+`api/castings/${casting_id}`;
  const createOrderUrl = process.env.REACT_APP_API_HOST+`api/order/${casting_id}`;
  const [tableData, setTableData] = useState();
  const [token, setToken] = useState('');
  const [order, setOrder] = useState();
  const [submitted, setSubmitted] = useState(false);
  const scrollRef = useRef(null);
  const Navigate = useNavigate();

  console.log(tableData)


  /**
   * get casting data.
   *
   * @async
   * @function
   * @name fetchCastingData
   * @returns {Promise<void>} - A promise successfully resolved when casting data is retrieved and updated in the state.
   */
    const fetchCastingData = async () => {
      try {
        const response = await axios.get(getOnCastingUrl , {withCredentials:true} ); 
        const data = response.data;
        setCasting(data);
      } catch (error) {
        console.log(error);
      }
    };


    

  /**
   * 
   * @function
   * @name scrolltoLastElement
   * @returns 
   */
  const scrolltoLastElement = () =>{
    const lastElement = scrollRef.current?.lastElementChild ;
    lastElement?.scrollIntoView({ behavior: 'smooth' });
    
  };

 
 /**
  * @async
  * @function
  * @name UpdateCastingStatus
  */
  const UpdateCastingStatus = async()=>{
    try{
      const result = await axios.put(updateCastingUrl,{withCredentials:true});

    }catch(err){
      console.log(err);
    }
    

  };
  
  

  /**
   * @async 
   * @function 
   * @name submitOrder
   * 
   */
  const submitOrder = async()=>{
    try{
      const response =  await axios.post(createOrderUrl, order ,
        {withCredentials:true});
     
      UpdateCastingStatus();
      console.log(response);
      Swal.fire({
        icon: 'success',
        title: 'Commande effectuée avec succes!',
        showConfirmButton: true,
        confirmButtonColor: '#00BCB6',
        timer: 1500,
        
      });

      setTimeout(() => {
        Navigate(-1);
        
      }, (1502));
     

    }catch(err){

    }
  };


  /**
   * @function
   * @name createOrder
   * @param {*} initialData 
   * @returns 
   */
  const createOrder = (initialData) => {

    if(casting){
      let newData = {
        "volume" : casting[0].casting_volume_beton+ "m³"
    };

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
              newData['Données Complementaires'] = null;
            } /*else {
              newData['Données Complementaires']  = item.answer;
            }*/
          }
          break;
       
        default:
          break;
        }
      });
    
      return newData;

  
  
  }

    
    
  
   
  };
  

  /**
   * 
   */
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
        { headers },
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
      const result = await axios.get(getTemplateUrl,{withCredentials:true});
      
      const data = result.data[0].template_data;
      setTableData(data);
    }catch(err){
      console.log(err);
    }

  };

  useEffect(()=>{
    gettemplateData();
    fetchCastingData()
    login();

  },[]);

  useEffect(()=>{
    if(order){
      
      scrolltoLastElement();
    }
  },[order]);

  const handleTableDataChange = (newData) => {
    setTableData(newData);
    
  };


  const ParseData = (data)=>{
    const transformedData = {
      responses: [],
    };
  
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const response = {
        question: item.question,
        value: item.value,
      };
      transformedData.responses.push(response);
    }
  
    return transformedData;
  };


  // fonction permettant de soumettre les données
  const submitForm = async () => {

    if(token){
      setSubmitted(true);
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      };
      const questions = ParseData(tableData);
      console.log('test1', questions)
  
      try {
     
        const response = await axios.post(
          'https://apibbri-betonappbeton.azurewebsites.net/forms/default/submissions',
          questions,
          { headers },
        );
  
        const responseData = response.data;
        console.log('test', responseData);
        // Handle the response data as needed
        const newOrder = createOrder(responseData);
        setOrder( newOrder );
        setSubmitted(false);

       
      
      } catch (error) {
        console.error('Error submitting form:', error);
        
      };
 
    }
    
  };

  return (
    <div  className='table-page'>
      <Navbar currentPage='order'></Navbar>
      <h1>Verifiez les informations</h1>
      {/* Autres composants et contenu ici */}
      {tableData && <Table data={tableData} onDataChange={handleTableDataChange} /> }
      
      <button onClick={submitForm} className='form-btn-order'> Confirmer {submitted && <CircularProgress className='circular' sx={{color:'#fff'}} size={19}/>}</button>

      {order && <TableResult data={order} className = "order"  submit={submitOrder} ref={scrollRef}/> }

     
    </div>
  );
};
export default Order;
