import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import CastingModal from '../../composants/CastingModal';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

//simulate API responses
jest.mock('axios')

const mockData = {
    casting_description: 'premier casting',
    casting_volume_beton: '30'
};




it(" should render modal with casting informations" , async()=>{
    const mockOnCloseModal = jest.fn();

    const props = {
        castingId: 10,
        onCloseModal :  mockOnCloseModal
    }
    axios.get.mockResolvedValue({ data: [mockData] });
    render(<BrowserRouter>
        <CastingModal {...props}/>
    </BrowserRouter>);

    //check if fetchDataCasting is called 
    expect(axios.get).toHaveBeenCalledTimes(1)

    //wait data casting to be loaded
    await screen.findByText((content, element)=>{
        const hasDescriptionContent = content === 'premier casting'
        return hasDescriptionContent
    })

    //check information casting to be in the page
    expect(screen.getByText('Description')).toBeInTheDocument();
   expect(screen.getByText(mockData.casting_description)).toBeInTheDocument();
   expect(screen.getByText('30m³')).toBeInTheDocument();

})


it('should close the component if button close is clicked' , async()=>{
    const mockOnCloseModal = jest.fn();

    const props = {
        castingId:10,
        onCloseModal: mockOnCloseModal
    };
    axios.get.mockResolvedValue({ data: [mockData] });
   

    render(<BrowserRouter> <CastingModal {...props}></CastingModal></BrowserRouter>);
    

    //check if fetchDataCasting is called 
    expect(axios.get).toHaveBeenCalledTimes(1)

    await screen.findByText((content, element) => {
        const hasDescriptionText = content === 'premier casting';
        return hasDescriptionText;
      });

    const closeButon = screen.getByTestId('casting-close-btn')
    fireEvent.click(closeButon)

    //check if close button function is called
    expect(mockOnCloseModal).toHaveBeenCalledTimes(1)

})