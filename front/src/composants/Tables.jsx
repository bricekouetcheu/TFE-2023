import * as React from 'react';
import Test from './Test';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
// Votre composant parent

const  Tables = ()=>{
  const {casting_id} = useParams()
  const getTemplateUrl = process.env.REACT_APP_HOST+`api/templateData/25`
  const [tableData, setTableData] = useState();

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

  },[])

  const handleTableDataChange = (newData) => {
    setTableData(newData);
    
  };


  const orderConcrete = ()=>{
    /*const updatedData = tableData.map((row) => {
      return { id: row.id, question: row.question, value: row.value };
    });

    const jsonData = JSON.stringify(updatedData);
    // Envoyer jsonData à votre API

    console.log(jsonData);*/
    console.log(tableData)
  }

  return (
    <div  className='table-page'>
      <Navbar></Navbar>
      <h1>Verifiez les informations</h1>
      {/* Autres composants et contenu ici */}
      {tableData && <Test data={tableData} onDataChange={handleTableDataChange} /> }
      
      <button onClick={orderConcrete} className='form-btn'> commander </button>
    </div>
  );
}
export default Tables;
