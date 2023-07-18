import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../../composants/Navbar';
import axios from 'axios';

jest.mock('axios')

describe('Navbar component', () => {
    it('renders correctly', () => {
      render( <Navbar/>);

      expect(screen.getByTestId('navbar')).toBeInTheDocument();
      
    });


    it('should render a dropdown', ()=>{

    })

    it('should render navbar with userProfile', async()=>{

      //fake data
      const userData = [{
        user_name:'brice',
        user_surname : 'kouetcheu'
      }];
      
      //simuler l'envoie de la requete
      axios.get.mockResolvedValueOnce({data: userData})
      render (<Navbar/>)
      await screen.findByText('brice kouetcheu');

   
      expect(screen.getByText('brice kouetcheu')).toBeInTheDocument();
    })
  
  });