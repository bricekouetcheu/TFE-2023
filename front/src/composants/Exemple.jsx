import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const login = async () => {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      const requestData = {
        email: 'anonymous@bbri.be',
        password: '',
      };

      try {
        const response = await axios.post(
          'https://apibbri-betonappbeton.azurewebsites.net/auth/login',
          requestData,
          { headers }
        );

        const responseData = response.data;
        const accessToken = responseData.accessToken;
        setToken(accessToken);
      } catch (error) {
        console.error('Error during login:', error);
      }
    };

    login();
  }, []);

  useEffect(() => {
    const submitForm = async () => {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      };

      const questions = {
        responses: [
          {
            question: 'type_element',
            value: 'sols',
          },
          {
            question: 'type_sol',
            value: 'habitation',
          },
          {
            question: 'lasercreed',
            value: false,
          },
          {
            question: 'agressivite',
            value: 'eleve',
          },
          {
            question: 'sulfates',
            value: true,
          },
          {
            question: 'application',
            value: 'structure',
          },
          {
            question: 'type_beton',
            value: 'classique',
          },
          {
            question: 'resistance_calculee',
            value: true,
          },
          {
            question: 'resistance',
            value: 'C35/45',
          },
          {
            question: 'beton_armee_fibres',
            value: true,
          },
          {
            question: 'epaisseur_element',
            value: '350',
          },
          {
            question: 'mode_dechargement',
            value: 'pompe_gt_50m',
          },
          {
            question: 'city_pompe',
            value: true,
          },
          {
            question: 'duree_dechargement',
            value: '60',
          },
          {
            question: 'chantier_accessible_camion',
            value: 'oui',
          },
          {
            question: 'information_complementaire',
          },
        ],
      };

      try {
        const response = await axios.post(
          'https://apibbri-betonappbeton.azurewebsites.net/forms/default/submissions',
          questions,
          { headers }
        );

        const responseData = response.data;
        // Handle the response data as needed
        console.log(responseData);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };

    if (token) {
      submitForm();
    }
  }, [token]);

  return <div>Your component JSX here</div>;
};

export default MyComponent;
