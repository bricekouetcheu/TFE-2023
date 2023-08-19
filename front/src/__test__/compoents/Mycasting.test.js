import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import MyCasting from '../../composants/MyCasting';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
jest.mock('axios');

const projectData = {
    project_name: 'projet test',
  project_address: 'rue van lint 25, 1000 bruxelles',
};

const Event = {
  startTime: '',
  endTime: ' '
}

describe('testing from MyCasting',()=>{
    it('should render project name and address', async() => {
 
        axios.get.mockResolvedValueOnce({ data: projectData });
        
    
        render(<BrowserRouter><MyCasting /></BrowserRouter>);
    
        //check if fetchDataCasting is called 
        expect(axios.get).toHaveBeenCalledTimes(2)
        await screen.findByText((content, element)=>{
            const hasProject_nameContent = content === 'projet test'
            return hasProject_nameContent
        })
        const projectNameElement = await screen.findByText('projet test', { exact: false });
        const addessElement = await screen.findByText('rue van lint 25, 1000 bruxelles')
        expect(projectNameElement).toBeInTheDocument();
        expect( addessElement).toBeInTheDocument();
       
      });
    
      

})


