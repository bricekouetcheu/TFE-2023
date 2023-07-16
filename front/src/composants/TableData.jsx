import * as React from 'react';
import {useState, useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Select, MenuItem } from '@mui/material';


const TableData = ({ data, onDataChange })=> {

  const handleProcessRowUpdate = (updatedRow, originalRow) => {
    // Find the index of the row that was edited
    const rowIndex = data.findIndex((row) => row.id === updatedRow.id);
  
    // Replace the old row with the updated row
    const updatedRows = [...data];
    updatedRows[rowIndex] = updatedRow;
  
    // Update the state with the new rows
    /*setTableData(updatedRows);*/
    onDataChange(updatedRows);

  
    // Return the updated row to update the internal state of the DataGrid
    return updatedRow;
  };

  const handleCellEditCommit = React.useCallback(
    ({ id, field, value }) => {
      const updatedData = data.map((row) => {
        if (row.id === id) {
          return { ...row, [field]: value };
        }
        return row;
      });
     
      onDataChange(updatedData);
    },
    [data, onDataChange]
  );


  const columns = [
    { field: 'question',
      headerName: 'Question',
      sortable: false,
      flex:1,
      headerAlign: 'center',
      headerClassName: 'header-divider',
      
      align:'center',
      width: 100,
      editable: false,
      renderCell: (params) => (
        <div
        className='column-question'
          style={{
            minWidth: 0,
            maxWidth: 100,
            
            whiteSpace: 'nowrap',
            overflow: '',
            textOverflow: 'ellipsis',
            fontWeight: params.field === 'question' ? 'bold' : 'normal', 
            
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: 'value',
      sortable: false,
      headerName: 'Value',
      headerAlign: 'center',
      headerClassName: 'header-divider',
      cellClassName:'cell-content',
      
      align: 'center',
      width: 300,
      editable: true,
      renderCell: (params) => {
        if (params.row.question === "type_beton") {
          // Lignes 1 et 3 auront un menu déroulant avec des options
          return (
           
                 <select className='select-datagrid'
            style={{
           
            }}
              value={params.value}
              onChange={(e) =>
                handleCellEditCommit({
                  id: params.id,
                  field: params.field,
                  value: e.target.value,
                })
              }
            >
              <option className='option-select' value="classique">classique</option>
              <option className='option-select' value="auto_placant">auto_placant</option>
             
            </select>

       
         
          );
        }if(params.row.question=== "resistance"){
          return (
           
            <select className='select-datagrid'
       style={{
      
       }}
         value={params.value}
         onChange={(e) =>
           handleCellEditCommit({
             id: params.id,
             field: params.field,
             value: e.target.value,
           })
         }
       >
         <option className='option-select' value="C16/20">C16/20</option>
         <option className='option-select' value="C20/25">C20/25</option>
         <option className='option-select' value="C25/30">C25/30</option>
         <option className='option-select' value="C30/37">C30/37</option>
         <option className='option-select' value="C70/85">C70/85</option>
         <option className='option-select' value="C80/95">C80/95</option>
         <option className='option-select' value="C90/105">C90/105</option>
         <option className='option-select' value="C100/115">C100/115</option>
        
        
       </select>

  
    
     );

        }
        // Les autres lignes afficheront simplement la valeur textuelle
        return (
          <div
            style={{
              minWidth: 0,
              maxWidth: 350,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {params.value}
          </div>
        );
      },
    },
  ];

  return (
    <div id='datagrid' className='datagrid-className'>
      
      <DataGrid
      
        rows={data}
        columns={columns}
        processRowUpdate={handleProcessRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
        onCellEditCommit={handleCellEditCommit}
        disableColumnMenu
        disableColumnSelector
        disableDensitySelector
        disableSelectionOnClick
        autoHeight
        hideFooterPagination = {true}
        hideFooter = {true}
        hideFooterSelectedRowCount = {true}
        
        
      />
    </div>
  );
}

export default TableData ;
