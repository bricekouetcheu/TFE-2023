import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StepOne from '../../composants/StepOne';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

jest.mock('axios');

const testAgendasData = [
  { id: 1, summary: 'Agenda 1' },
  { id: 2, summary: 'Agenda 2' },
];

it('render component with conditionnal props', async () => {
  // simulate api call
  axios.get.mockResolvedValueOnce({ data: testAgendasData });

  //render component
  render(<BrowserRouter><StepOne onNext={() => {}} handleFormData={() => {}} handleSelectData={() => {}} values={{}} /></BrowserRouter>);

 
  expect(axios.get).toHaveBeenCalledTimes(1);

  await waitFor(() => {
    
    expect(screen.getByText('Nom du Projet')).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
    expect(screen.getByTestId('agenda-select')).toBeInTheDocument();
  });
  
});


