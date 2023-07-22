import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import Cards from '../../composants/Cards';
import { BrowserRouter } from 'react-router-dom';


it('should render the cards with props', () => {
    const props = {
      number: 0,
      description: 'Description du casting',
      status_name: 'created',
      id: 123,
      onOpenModal: jest.fn(), 
      onOpenPredictionModal: jest.fn(),
    };
    render(<BrowserRouter>
        <Cards {...props} />
    </BrowserRouter>
    );
    
    //checking if number and description are displayed
    const titleElement = screen.getByText('Casting 1');
    const descriptionElement = screen.getByText('Description du casting');
    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });


  it ('should call onOpenModal when button is clicked', () => {
    const mockOnOpenModal = jest.fn();

    // case status_name = created
    const props = {
        number: 0,
       description: 'Description du casting',
       status_name: 'created',
       id: 123,
       onOpenModal: mockOnOpenModal, 
       onOpenPredictionModal: jest.fn(),
      
    };
    render(<BrowserRouter>
     <Cards {...props} />
    </BrowserRouter>);
    
    // Similate button click action
    const openButton = screen.getByText('OUVRIR');
    fireEvent.click(openButton);
  
    // check if onOpenModal has been called at least one time
    expect(mockOnOpenModal).toHaveBeenCalledTimes(1);
  });


  it('should start prediction when button is clicked' , ()=>{
    const mockOnOpenModal = jest.fn();

    // case status_name = delivered
    const props = {
        number: 0,
       description: 'Description du casting',
       status_name: 'delivered',
       id: 123,
       onOpenModal: mockOnOpenModal, 
       onOpenPredictionModal: mockOnOpenModal,
      
    };

    render(<BrowserRouter>
    <Cards {...props}></Cards>
    </BrowserRouter>)

    const predictionAction = screen.getByText('Lancer la prediction');
    fireEvent.click(predictionAction)

    expect(mockOnOpenModal).toHaveBeenCalledTimes(1)

  })


  