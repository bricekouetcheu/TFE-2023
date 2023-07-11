import React, {useState, useRef, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Cards from './Cards';
import axios from 'axios';
import CastingModal from './CastingModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLocationDot} from  '@fortawesome/free-solid-svg-icons';





const MyCasting = () => {
    const initialColumns = {
        created: [],
        ordered: [],
        delivered: [],
        ongoing: [],
        completed: []
      };
    const {project_id} = useParams();
    const getAllCastingUrl = process.env.REACT_APP_HOST+`api/projects/${project_id}/castings`
    const getProjectUrl = process.env.REACT_APP_HOST+`api/project/${project_id}`
    const [castings, setCastings]= useState(null)
    const [selectedCastingId, setSelectedCastingId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const containerRef = useRef(null);
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [columns, setColumns] = useState(initialColumns);
    const [project, setProject]=useState()
    let count = 0
    
    //fonction permettant d'obtenir le projet en coursp

    const getProject = async()=>{
      try{
        const result = await axios.get(getProjectUrl)
        console.log(result.data)
        setProject(result.data)
      } catch(err){
        console.log(err)
      }

    }


    //fonction de gestion du modal
    const handleOpenModal = (castingId) => {
        setSelectedCastingId(castingId);
        setIsModalOpen(true);
        console.log('bonjour')
      };
    
      const handleCloseModal = () => {
        setSelectedCastingId(null);
        setIsModalOpen(false);
      };
   
  
    // fonction permettant de recuperer tous les castings
    const getAllCasting = async()=>{
        try{
            const result = await axios.get(getAllCastingUrl)
            const data = result.data
            console.log(data)
            setCastings(data)
        }
        catch(err){
            console.log(err)
        }
    }
    

   
      //fonction permettant de gerer le defilement a l'aide de la souris
      const handleMouseDown = (e) => {
        setIsDown(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
      };
    
      const handleMouseLeave = () => {
        setIsDown(false);
      };
    
      const handleMouseUp = () => {
        setIsDown(false);
      };
    
      const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 1; // Ajustez le multiplicateur selon votre préférence pour la vitesse de défilement
        containerRef.current.scrollLeft = scrollLeft - walk;
      };
    

      useEffect(() => {
        if (castings) {
          const updatedColumns = { ...initialColumns };
          castings.forEach((casting) => {
            updatedColumns[casting.status_name].push(casting);
          });
          setColumns(updatedColumns);
        }
      }, [castings]);

      useEffect(()=>{
        getProject()
        getAllCasting()

      },[])
    
      return (
        <div className='home-Board'>
           {project
            &&
            (<div className='project-description'>
              <h1> {project[0].project_name} </h1>
              <div>
                  <FontAwesomeIcon icon={faLocationDot} />
                  <p>{project[0].project_address} </p>
              </div>
           </div>)}
          <div className="kanban-board"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}>

         
            

            
          <div className="column">
          <div className='column-header'>
                <h4>Created</h4>
            </div>
            <div className='column-content'>
            {columns.created.map((card,index) => (
            <Cards 
             id = {card.casting_id}
             number = {count++}
             status_name = {card.status_name}
             description = {card.casting_description}
             key = {card.casting_id}
             onOpenModal= {handleOpenModal}

             ></Cards>
            ))}
    
            </div>
        
          </div>
          <div className="column">
          <div className='column-header'>
                <h4>Ordered</h4>
            </div>
            <div className='column-content'>
            {columns.ordered.map((card,index) => (
                <Cards 
                id = {card.casting_id}
                status_name = {card.status_name}
                number = {count++}
                description = {card.casting_description}
                key = {card.casting_id}
                onOpenModal= {handleOpenModal}
   
                ></Cards>
            ))}
            </div>
           
          </div>
          <div className="column">
          <div className='column-header'>
                <h4>Delivered</h4>
            </div>
            <div className='column-content'>
            {columns.delivered.map((card,index) => (
                <Cards 
                id = {card.casting_id}
                number = {count++}
                status_name = {card.status_name}
                description = {card.casting_description}
                key = {card.casting_id}
                onOpenModal= {handleOpenModal}
   
                ></Cards>
            ))}
            </div>
          
          </div>
          <div className="column">
          <div className='column-header'>
                <h4>Ongoing</h4>
            </div>
            <div className='column-content'>
            {columns.ongoing.map((card,index) => (
              <Cards 
              id = {card.casting_id}
              number = {count++}
              status_name = {card.status_name}
              description = {card.casting_description}
              key = {card.casting_id}
              onOpenModal= {handleOpenModal}
 
              ></Cards>
            ))}
            </div>
        
          </div>
          <div className="column">
            <div className='column-header'>
                <h4>Completed</h4>
            </div>
            <div className='column-content'>
            {columns.completed.map((card,index) => (
              <Cards 
              id = {card.casting_id}
              number = {count++}
              status_name = {card.status_name}
              description = {card.casting_description}
              key = {card.casting_id}
              onOpenModal= {handleOpenModal}
 
              ></Cards>
            ))}
            </div>
            
          
          </div>
          {isModalOpen && (
        <CastingModal
          castingId={selectedCastingId}
          onCloseModal={handleCloseModal}
        />
      )}
          
        </div>

        </div>
        
      );
};

export default MyCasting;