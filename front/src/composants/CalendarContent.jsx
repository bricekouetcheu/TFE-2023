import React , {useEffect, useState} from 'react';
import Calendar from '@ericz1803/react-google-calendar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { css } from '@emotion/react';

const CalendarContent = () => {

  const {project_id} = useParams();
  const [calendarID , setCalendarID] = useState();
  const getProjectUrl = process.env.REACT_APP_API_HOST+`api/project/${project_id}`;
  const ApiKey = process.env.REACT_APP_API_KEY;
  const language = 'FR'



  /**
   * Retrieves project information by making a GET request to the API
   *
   * @async
   * @function
   * @name getProject
   * @returns {void}
   */
  const getProject = async()=>{
    try{
      const result = await axios.get(getProjectUrl , {withCredentials:true});
      setCalendarID(result.data.agenda_id);
    } catch(err){
      console.log(err);
    }
  
  };

  let calendars = [
    {calendarId : calendarID,
      color: '#B241D1',
    },
  

  ];

  
  let styles = {
  //you can use object styles
    calendar: {
      borderWidth: '1px', //make outer edge of calendar thicker
    },

    //you can also use emotion's string styles (remember to add the line 'import { css } from "@emotion/react";')
    today: css`
    /* highlight today by making the text red and giving it a red border */
     color: red;
      border: 1px solid red;
    `,
  }; 

  


  useEffect(()=>{

    getProject();

  },[]);

  return (
    <div className='calendar-content'>
      {calendarID && (
        <div>
          <Calendar apiKey={ApiKey} calendars={calendars} styles={styles} language={language} />
        </div>
      )}

            
    </div>);
};

export default CalendarContent;