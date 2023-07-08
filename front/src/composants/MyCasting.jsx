import React, {useState, useRef, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Cards from './Cards';
import axios from 'axios';
import CastingModal from './CastingModal';



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
    const [castings, setCastings]= useState(null)
    const [selectedCastingId, setSelectedCastingId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const containerRef = useRef(null);
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [columns, setColumns] = useState(initialColumns);


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
    
    //fonction permettant de deplacer une carte d'une colonne a une autre
      const moveCard = (card, sourceColumn, targetColumn) => {
        const updatedColumns = { ...columns };
        const sourceCards = updatedColumns[sourceColumn];
        const targetCards = updatedColumns[targetColumn];
    
        // Remove card from source column
        const cardIndex = sourceCards.findIndex((item) => item.casting_id === card.casting_id);
        if (cardIndex !== -1) {
          sourceCards.splice(cardIndex, 1);
        }
    
        // Add card to target column
        targetCards.push(card);
    
        setColumns(updatedColumns);
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
        getAllCasting()

      },[])
    
      return (
        <div className='home-Board'>
           <h1>Bonjourcisbosbsnpos</h1>
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
            {columns.created.map((card) => (
            <Cards 
             id = {card.casting_id}
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
            {columns.ordered.map((card) => (
                <Cards 
                id = {card.casting_id}
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
            {columns.delivered.map((card) => (
                <Cards 
                id = {card.casting_id}
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
            {columns.ongoing.map((card) => (
              <Cards 
              id = {card.casting_id}
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
            {columns.completed.map((card) => (
              <Cards 
              id = {card.casting_id}
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