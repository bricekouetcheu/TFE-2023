import React from 'react';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import NewProject from '../../pages/NewProject';
import { BrowserRouter } from 'react-router-dom';
import { normalizeAddress, createAddress } from '../../composants/StepTwo';
import axios from 'axios';

jest.mock('axios');



const testAgendasData = [
  { id: 1, summary: 'Agenda 1' },
  { id: 2, summary: 'Agenda 2' },
];
const fileContent = JSON.stringify({
    data: 'Contenu fictif du fichier IFC',
  });

const testFiles = [
    new File([fileContent], 'example1.ifc', {
        type: 'application/ifc',
      }),
      new File([fileContent], 'example2.ifc', {
        type: 'application/ifc',
      }),
  ];
beforeEach(() => {
    
    axios.get.mockResolvedValueOnce({ data: testAgendasData });
    axios.post.mockResolvedValueOnce({});

    axios.defaults.withCredentials = true;
     // Mocking the geocode API call
  axios.get.mockImplementation((url) => {
    if (url.includes('maps.googleapis.com')) {
      // Simulating a successful response
      return Promise.resolve({
        data: {
          results: [
            {
              geometry: {
                location: { lat: 12.345, lng: 67.890 },
              },
            },
          ],
        },
      });
    }
  });
});
    
 

afterEach(() => {

  jest.resetAllMocks();
});

it('renders and navigates through all steps', async () => {


  
    // simulate api call for agendas data
    axios.get.mockResolvedValueOnce({ data: testAgendasData });
  
    // render component
    render(<BrowserRouter><NewProject /></BrowserRouter>);
    expect(axios.get).toHaveBeenCalledTimes(1);
  
    // Step 1: StepOne
    await waitFor(() => {
    
        expect(screen.getByText('Nom du Projet')).toBeInTheDocument();
        
        expect(screen.getByTestId('agenda-select')).toBeInTheDocument();
      });

        
    fireEvent.change(screen.getByTestId('project-name-input'), { target: { value: 'Mon Projet Test' } });
    fireEvent.click(screen.getByText('Agenda 1'));

    // click to pass to step2
    fireEvent.click(screen.getByTestId('btn-next'));
      
    await waitFor(() => {
        expect(screen.getByTestId('street-input')).toBeInTheDocument();
      });
 
      // fill address informations
   fireEvent.change(screen.getByTestId('street-input'), { target: { value: 'rue du midi' } });
   fireEvent.change(screen.getByTestId('number-input'), { target: { value: '147' } });
   fireEvent.change(screen.getByTestId('city-input'), { target: { value: 'Bruxelles' } });
   fireEvent.change(screen.getByTestId('postalcode-input'), { target: { value: '1000' } });

   // Click to pass to step 3
   fireEvent.click(screen.getByTestId('btn-next'));
    

   await waitFor(() => {
    expect(screen.getByText('Importez votre fichier IFC')).toBeInTheDocument();
   
  },{ timeout: 500 });

   
    const submitButton = screen.getByTestId('btn-submit');
    const UploadInput = screen.getByTestId('file-upload-input')
  
    Object.defineProperty(UploadInput, 'files', {
        value: testFiles,
      });
   
    fireEvent.change(UploadInput);

    expect(screen.getByText('example1.ifc')).toBeInTheDocument();
    // click on the submit button
    fireEvent.click(submitButton,{ preventDefault: jest.fn()});
    

    await waitFor(()=>{
        
        expect(axios.post).toHaveBeenCalledTimes(1);
    
  

    })
   

  });