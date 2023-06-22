import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Login from './pages/Login';

jest.mock('axios'); // Mock d'axios pour simuler les appels réseau

describe('Login component', () => {
  it('renders correctly', () => {
    render(<Login />);
    // Ajoute ici tes assertions pour vérifier le rendu du composant
  });

});
