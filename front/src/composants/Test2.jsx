import React from 'react';
import {AiOutlineFilePdf} from "react-icons/ai";
import { PDFDownloadLink} from '@react-pdf/renderer';
import createPDF from './CreatePdf';


const Test2 = ({data}) => {

    return (
        <div className='table-Order'>
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
  
            
        </div>
    );
};



export default Test2;