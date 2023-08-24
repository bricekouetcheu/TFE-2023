import React, {useState , useEffect} from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const NewCalendar = () => {

    const {project_id} = useParams();
    const [events, setEvents] = useState()
    const [project, setProject]=useState();
    const getProjectUrl = process.env.REACT_APP_API_HOST+`api/project/${project_id}`;



    const renderEventContent = (eventInfo) => {
      const projectColor = getColorForProject(eventInfo.event.project_name); // Get color for project_name
  
      return (
        <div className="custom-event" style={{ backgroundColor: projectColor }}>
          <p>{eventInfo.event.title}</p>
          <p>Project: {eventInfo.event.project_name}</p>
          <p>Location: {eventInfo.event.project_address}</p>
        </div>
      );
    };
   
    /**
   * @function
   * @name getEvents
   * @param {*} agenda_id agenda linked to the project
   * @returns {void}
   */
  const getEvents = async(agenda_id)=>{

    const getEventsUrl = process.env.REACT_APP_API_HOST+`api/events/${agenda_id}`;
    try{
      const response = await axios.get(getEventsUrl , {withCredentials:true});
      console.log(response.data)
      setEvents(formatEvents(response.data));


    }catch(err){
      console.log(err);


    }
  };

  const formatEvents = (list) => {
    const colorMap = {}; // To store colors for each project_name

    return list.map((item) => {
      const projectColor = getColorForProject(item.project_name , list); // Get color for project_name

      if (!colorMap[item.project_name]) {
        colorMap[item.project_name] = projectColor;
      }

      return {
        title: item.summary,
        project_address: item.project_address,
        project_name: item.project_name,
        start: item.start.dateTime || item.start.date,
        end: item.end.dateTime || item.end.date,
        color: projectColor,
        
       // Assign the color for this event
      };
    });
  };

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
          setProject(result.data);
          console.log(result.data)
    
          getEvents(result.data.agenda_id);
        } catch(err){
          console.log(err);
        }
    
      };


      useEffect(()=>{
        getProject()
      },[])


      const getColorForProject = (projectName , listEvents) => {
        if (!projectName) {
          return 'gray'; // Default color if projectName is not provided
        }
      
        const similarProjects = listEvents.filter(event => event.project_name === projectName);
        const colorMap = {};
      
        similarProjects.forEach(project => {
          if (!colorMap[project.project_name]) {
            const randomColor = getRandomColor(); // Implement your own random color generation
            colorMap[project.project_name] = randomColor;
          }
        });
      
        return colorMap[projectName];
      };
      
      const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };
      

    return (
        <div className='calendar-content' >
            <FullCalendar
            events = {events}
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay"
            }}
            locale='fr'
            plugins={[dayGridPlugin]}
           initialView="dayGridMonth" 
         
            />
            
        </div>
    );
};

export default NewCalendar;
