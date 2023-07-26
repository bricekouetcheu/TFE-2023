import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StepTwo from '../../composants/StepTwo';
import { BrowserRouter } from 'react-router-dom';

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
    const emptyValues = {
        street: '',
        number: '',
        city: '',
        postalcode: '',
      };

      renderStepTwo(emptyValues);
      const nextButton = screen.getByTestId('btn-next');

      fireEvent.click(nextButton);

      const ErrorMessage = await screen.findByText('remplissez tous les champs')
      expect(ErrorMessage).toBeInTheDocument();
      expect(mockOnNext).not.toHaveBeenCalled();

  })

  it('should call next function is values are filled' , async()=>{
    const filledValues = {
        street: 'Rue van lint',
        number: '25',
        city: 'Bruxelles',
        postalcode: '1070',
      };

      renderStepTwo(filledValues);
      const nextButton = screen.getByTestId('btn-next');
      fireEvent.click(nextButton);
      expect(mockOnNext).toHaveBeenCalled();
  })