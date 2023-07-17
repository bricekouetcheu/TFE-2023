import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Login from '../../pages/Login';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios'); // Mock d'axios pour simuler les appels réseau

describe('Login component', () => {
  it('renders correctly', () => {
    render(
        <Router>
            <Login />
        </Router>
    );
    // Ajoute ici tes assertions pour vérifier le rendu du composant
  });

});
