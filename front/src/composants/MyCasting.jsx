import React, {useState, useRef, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Cards from './Cards';
import axios from 'axios';
import CastingModal from './CastingModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLocationDot} from  '@fortawesome/free-solid-svg-icons';
import created from '../assets/Add.png'
import ordered from '../assets/order.png'
import delivered from '../assets/delivered1.png'
import ongoing from '../assets/sync.png'
import completed from '../assets/check.png'
import location from '../assets/location.png'





const MyCasting = () => {
    const initialColumns = {
        created: [],
        ordered: [],
        delivered: [],
        ongoing: [],
        completed: []
      };
    const {project_id} = useParams();
    const getAllCastingUrl = process.env.REACT_APP_API_HOST+`api/projects/${project_id}/castings`
    const getProjectUrl = process.env.REACT_APP_API_HOST+`api/project/${project_id}`
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
        const result = await axios.get(getProjectUrl , {withCredentials:true})
        setProject(result.data)
      } catch(err){
        console.log(err)
      }

    }


    /**
     * handling modal opening
     * @function
     * @name handleOpenModal
     * @param {number} castingId casting id to display in modal
     * @returns {void}
     */
    const handleOpenModal = (castingId) => {
        setSelectedCastingId(castingId);
        setIsModalOpen(true);
       
      };

    /**
     * Close the modal by resetting the selected casting id and closing the modal.
     *
     * @function
     * @name handleCloseModal
     * @returns {void}
     */
      const handleCloseModal = () => {
        setSelectedCastingId(null);
        setIsModalOpen(false);
      };
   
  
  /**
   * Retrieves all castings from the API and updates the "castings" state with the received data.
   *
   * @function
   * @name getAllCasting
   * @returns {void}
   */
    const getAllCasting = async()=>{
        try{
            const result = await axios.get(getAllCastingUrl,{withCredentials:true})
            const data = result.data
            setCastings(data)
        }
        catch(err){
            console.log(err)
        }
    }
    

   
    /**
     * Handles the "mousedown" event on the container to enable horizontal scrolling.
     *
     * @function
     * @name handleMouseDown
     * @param {Object} e - mouse event.
     * @returns {void}
     */
      const handleMouseDown = (e) => {
        setIsDown(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
      };


    /**
     * Handles the "mouseleave" event on the container to disable horizontal scrolling.
     *
     * @function
     * @name handleMouseLeave
     * @returns {void}
     */
      const handleMouseLeave = () => {
        setIsDown(false);
      };
      

    /**
     * Handles the "mouseup" event on the container to disable horizontal scrolling.
     *
     * @function
     * @name handleMouseUp
     * @returns {void}
     */
      const handleMouseUp = () => {
        setIsDown(false);
      };
    

    /**
     * Handles the "mousemove" event on the container to perform horizontal scrolling.
     *
     * @function
     * @name handleMouseMove
     * @param {Object} e - L'événement de la souris (mousemove).
     * @returns {void}
     */
      const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 3; // Ajustez le multiplicateur selon votre préférence pour la vitesse de défilement
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
                  <img className = 'location-icon' src={location} alt='location img'/>
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
                <h4 className='colunm-title'>Created</h4>
                <img src={created} alt=" created icon" />
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
                <h4 className='colunm-title'>Ordered</h4>
                <img src={ordered} alt="ordered icon" />
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
                <h4 className='colunm-title'>Delivered</h4>
                <img src={delivered} alt="delivered icon" />
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
                <h4 className='colunm-title'>Ongoing</h4>
                <img src={ongoing} alt="ongoing icon" />
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
                <h4 className='colunm-title'>Completed</h4>
                <img src={completed} alt="completed icon" />
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