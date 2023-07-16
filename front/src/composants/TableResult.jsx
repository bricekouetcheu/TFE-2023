import React,{useRef} from 'react';
import {AiOutlineFilePdf} from "react-icons/ai";
import { PDFDownloadLink} from '@react-pdf/renderer';
import createPDF from './CreatePdf';
import { forwardRef } from 'react';


const TableResult = forwardRef (({data , submit},ref) => {
 

    return (
        <div className='table-Order' ref={ref}  >
            <h1> Bon de Commande</h1>
              <PDFDownloadLink document={createPDF(data)} fileName='tableau.pdf' className='pdf-link'>
        
        {({ blob, url, loading, error }) =>(
            <div className='pdf-download'>
                <AiOutlineFilePdf color='red'/>
                { loading ?  'Chargement du PDF...' : 'Télécharger le PDF' }
            </div>
        ) 
        }
      </PDFDownloadLink>
     <table >
      <thead>
        <tr>
          <th>EXIGENCES</th>
          <th>RESULTATS</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([key, value]) => (
          <tr key={key}>
            <td className='left-cell'>{key}</td>
            <td className='right-cell'>{value || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  
        <button ref={ref} className='form-btn-order' onClick={submit}> commander </button>
            
        </div>
    );
});



export default TableResult;