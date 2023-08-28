/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React,{useRef} from 'react';
import {AiOutlineFilePdf} from 'react-icons/ai';
import { PDFDownloadLink} from '@react-pdf/renderer';
import { forwardRef } from 'react';


const OrderRecap = forwardRef (({data },ref) => {

  

  return (
    <div className='table-Order-check' ref={ref}  >
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
});



export default OrderRecap;