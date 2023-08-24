import React from 'react';
import { render, screen, fireEvent,act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StepTwo from '../../composants/StepTwo';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';


jest.mock('axios', () => ({
  get: jest.fn(),
}));  

const mockOnNext = jest.fn();
const mockOnPrev = jest.fn();
const mockHandleFormData = jest.fn();

const renderStepTwo = (values) => {
    return render(
      <BrowserRouter>
        <StepTwo values={values} onNext={mockOnNext} onPrev={mockOnPrev} handleFormData={mockHandleFormData} />
      </BrowserRouter>
    );
  };





  it('should display error message when suivant button is clicked with empty values' , async()=>{
     // Mocking the axios.get function for getAllAddress
     axios.get.mockResolvedValue({ data: ['rue philippe de champagne 22, 1000 bruxelles'] });

     // Intercepting the geocodeAddress function to simulate success
     axios.get.mockImplementation((url) => {
       if (url.includes('maps.googleapis.com')) {
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
   
    const emptyValues = {
        street: '',
        number: '',
        city: '',
        postalcode: '',
      };

      renderStepTwo(emptyValues);
      const nextButton = screen.getByTestId('btn-next');
      act(() => {
        fireEvent.click(nextButton);
      });

      const ErrorMessage = await screen.findByText('veuillez remplir tous les champs')
      expect(ErrorMessage).toBeInTheDocument();
      expect(mockOnNext).not.toHaveBeenCalled();

  })

  it('should call next function is values are filled' , async()=>{

    axios.get.mockResolvedValue({ data: ['rue philippe de champagne 22, 1000 bruxelles'] });

  // Intercepting the geocodeAddress function to simulate success
    axios.get.mockImplementation((url) => {
    if (url.includes('maps.googleapis.com')) {
      return Promise.resolve({
        data: {
          results: [
            {
              geometry: {
                location: { lat: 50.84403628823497, lng: 4.346995612248622 },
              },
            },
          ],
        },
      });
    }
  });

 
    const filledValues = {
        street: 'Rue du midi',
        number: '147',
        city: 'Bruxelles',
        postalcode: '1000',
      };

      renderStepTwo(filledValues);
      const nextButton = screen.getByTestId('btn-next');
      await act( async() => {
        fireEvent.click(nextButton);
      });
      
      expect(mockOnNext).toHaveBeenCalled();
  })