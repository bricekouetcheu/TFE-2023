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


  jest.spyOn(React, 'useState').mockReturnValueOnce([
    ['123 rue de la Test', '456 street of Test'].map(normalizeAddress),
    jest.fn(),
  ]);
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

    /*fireEvent.change(screen.getByTestId('agenda-select'), { target: { value: 1 } });*/

    fireEvent.click(screen.getByText('Agenda 1'));

    // Cliquer sur le bouton Suivant pour passer à l'étape suivante (StepTwo)
    fireEvent.click(screen.getByTestId('btn-next'));
      
    await waitFor(() => {
        expect(screen.getByTestId('street-input')).toBeInTheDocument();
      });
 
   fireEvent.change(screen.getByTestId('street-input'), { target: { value: 'rue du midi' } });
   fireEvent.change(screen.getByTestId('number-input'), { target: { value: '147' } });
   fireEvent.change(screen.getByTestId('city-input'), { target: { value: 'Bruxelles' } });
   fireEvent.change(screen.getByTestId('postalcode-input'), { target: { value: '1000' } });

   // Cliquer sur le bouton Suivant pour passer à l'étape suivante (StepThree)
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