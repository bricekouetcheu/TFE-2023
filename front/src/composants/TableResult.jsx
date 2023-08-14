/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React,{useRef} from 'react';
import {AiOutlineFilePdf} from 'react-icons/ai';
import { PDFDownloadLink} from '@react-pdf/renderer';
import createPDF from './CreatePdf';
import { forwardRef } from 'react';


const TableResult = forwardRef (({data , submit},ref) => {

  

  return (
    <div className='table-Order' ref={ref}  >
      <h1> Bon de Commande</h1>
   
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