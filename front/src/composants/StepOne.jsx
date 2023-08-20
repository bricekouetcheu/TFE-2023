/* eslint-disable react/prop-types */
import { useState, React, useEffect } from 'react';
import validator from 'validator';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import calendar from '../assets/google-calendar.png';

const StepOne = ({ onNext, handleFormData, handleSelectData, values }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [agendas, setAgenda] = useState([]);
  const [selectedAgenda, setSelectedAgenda] = useState(null);
  const [selectedAgendaId, setSelectedAgendaId] = useState(null); // State to store selected agendaId
  const getAgendaUrl = process.env.REACT_APP_API_HOST + `api/agendas`;
  const Navigate = useNavigate();


  console.log(selectedAgendaId)

  const getAllAgendas = async () => {
    try {
      const response = await axios.get(getAgendaUrl, { withCredentials: true });
      const filteredAgenda = response.data.filter((agenda) => !agenda.primary);
      setAgenda(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleProjectName = (e) => {
    e.preventDefault();

    if (validator.isEmpty(values.projectName) || !selectedAgendaId) {
      setErrorMessage('Veuillez remplir tous les champs');
    } else {
      onNext();
    }
  };

  useEffect(() => {
    values.AgendaId = 'Selectionnez un agenda pour ce projet';
    getAllAgendas();
  }, []);

  return (
    <div className='step1'>
      {agendas.length > 0 && (
        <>
          <h1 className='project-title'>Nom du Projet </h1>
          <input
            placeholder='Nom du projet'
            defaultValue={values.projectName}
            name='projectName'
            onChange={handleFormData('projectName')}
            data-testid='project-name-input'
          />
          {agendas.length > 0 && (
            <div className='dropdown__container'>
              <div className='dropdown__title'>
                <img src={calendar} alt="google calendar icon" />
                <span>{selectedAgenda ? selectedAgenda.summary : 'Selectionnez un agenda'}</span>
                
            </div>
              <ul className='dropdown__list'>
                {agendas.map((agenda) => (
                  <li
                    key={agenda.id}
                    onClick={() => {
                        setSelectedAgenda(agenda);
                        setSelectedAgendaId(agenda.id);
                      }} // Set the selected agendaId
                  >
                    {agenda.summary}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <h1 className='errorMessage'>{errorMessage}</h1>
          <div className='step1-navigation'>
            <button
              className='btn-step1'
              onClick={() => Navigate('/projects')}
              data-testid='btn-home'
            >
              Acceuil<FontAwesomeIcon icon={faHouse} />
            </button>
            <button
              className='btn-step1'
              onClick={handleProjectName}
              data-testid='btn-next'
            >
              Suivant <span> </span>{' '}
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default StepOne;
