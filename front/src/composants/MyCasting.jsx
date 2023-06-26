import React, {useState, useRef} from 'react';



const MyCasting = () => {
    const initialData = [
        {
          casting_id: 14,
          casting_description: 'vfdvdf',
          casting_volume_beton: 48,
          casting_volume_starting_date: '2023-06-24T22:00:00.000Z',
          casting_volume_end_date: null,
          project_id: 1,
          status_id: 1
        },
        {
          casting_id: 15,
          casting_description: 'vscdsbe',
          casting_volume_beton: 48,
          casting_volume_starting_date: '2023-06-24T22:00:00.000Z',
          casting_volume_end_date: null,
          project_id: 1,
          status_id: 1
        },
        {
          casting_id: 16,
          casting_description: 'csdsvzdsc',
          casting_volume_beton: 48,
          casting_volume_starting_date: '2023-06-24T22:00:00.000Z',
          casting_volume_end_date: null,
          project_id: 1,
          status_id: 1
        },
        {
          casting_id: 17,
          casting_description: 'fvdd',
          casting_volume_beton: 34,
          casting_volume_starting_date: '2023-06-24T22:00:00.000Z',
          casting_volume_end_date: null,
          project_id: 1,
          status_id: 1
        },
        {
          casting_id: 18,
          casting_description: 'cscss',
          casting_volume_beton: 40,
          casting_volume_starting_date: '2023-06-24T22:00:00.000Z',
          casting_volume_end_date: null,
          project_id: 1,
          status_id: 1
        },
        {
          casting_id: 19,
          casting_description: 'scsdc',
          casting_volume_beton: 20,
          casting_volume_starting_date: '2023-06-24T22:00:00.000Z',
          casting_volume_end_date: null,
          project_id: 1,
          status_id: 1
        },
        {
          casting_id: 20,
          casting_description: 'fvdcs',
          casting_volume_beton: 34,
          casting_volume_starting_date: '2023-06-24T22:00:00.000Z',
          casting_volume_end_date: null,
          project_id: 1,
          status_id: 1
        },
        {
          casting_id: 21,
          casting_description: 'cdvscss',
          casting_volume_beton: 48,
          casting_volume_starting_date: '2023-06-24T22:00:00.000Z',
          casting_volume_end_date: null,
          project_id: 1,
          status_id: 1
        },
        {
          casting_id: 22,
          casting_description: 'fvscs',
          casting_volume_beton: 6,
          casting_volume_starting_date: '2023-06-24T22:00:00.000Z',
          casting_volume_end_date: null,
          project_id: 1,
          status_id: 1
        }
      ];

      const containerRef = useRef(null);
      const [isDown, setIsDown] = useState(false);
      const [startX, setStartX] = useState(0);
      const [scrollLeft, setScrollLeft] = useState(0);
      const initialColumns = {
        created: initialData,
        ordered: [],
        delivered: [],
        ongoing: [],
        completed: []
      };
    
      const [columns, setColumns] = useState(initialColumns);
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
    
      return (
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
              <div key={card.casting_id} className="card">
                <div>{card.casting_description}</div>
    
                {/* Move buttons */}
                <button onClick={() => moveCard(card, 'created', 'ordered')}>Move to Ordered</button>
                <button onClick={() => moveCard(card, 'created', 'delivered')}>Move to Delivered</button>
                {/* Add more move buttons if needed */}
              </div>
            ))}
    
            </div>
        
          </div>
          <div className="column">
          <div className='column-header'>
                <h4>Ordered</h4>
            </div>
            <div className='column-content'>
            {columns.ordered.map((card) => (
              <div key={card.casting_id} className="card">
                <div>{card.casting_description}</div>
                {/* Move buttons */}
                <button onClick={() => moveCard(card, 'ordered', 'created')}>Move to Created</button>
                <button onClick={() => moveCard(card, 'ordered', 'delivered')}>Move to Delivered</button>
                {/* Add more move buttons if needed */}
              </div>
            ))}
            </div>
           
          </div>
          <div className="column">
          <div className='column-header'>
                <h4>Delivered</h4>
            </div>
            <div className='column-content'>
            {columns.delivered.map((card) => (
              <div key={card.casting_id} className="card">
                <div>{card.casting_description}</div>
                {/* Move buttons */}
                <button onClick={() => moveCard(card, 'delivered', 'ordered')}>Move to Ordered</button>
                <button onClick={() => moveCard(card, 'delivered', 'ongoing')}>Move to Ongoing</button>
                {/* Add more move buttons if needed */}
              </div>
            ))}
            </div>
          
          </div>
          <div className="column">
          <div className='column-header'>
                <h4>Ongoing</h4>
            </div>
            <div className='column-content'>
            {columns.ongoing.map((card) => (
              <div key={card.casting_id} className="card">
                <div>{card.casting_description}</div>
                {/* Move buttons */}
                <button onClick={() => moveCard(card, 'ongoing', 'delivered')}>Move to Delivered</button>
                <button onClick={() => moveCard(card, 'ongoing', 'completed')}>Move to Completed</button>
                {/* Add more move buttons if needed */}
              </div>
            ))}
            </div>
        
          </div>
          <div className="column">
            <div className='column-header'>
                <h4>Completed</h4>
            </div>
            <div className='column-content'>
            {columns.completed.map((card) => (
              <div key={card.casting_id} className="card">
                <div>{card.casting_description}</div>
                {/* Move buttons */}
                <button onClick={() => moveCard(card, 'completed', 'ongoing')}>Move to Ongoing</button>
                {/* Add more move buttons if needed */}
              </div>
            ))}
            </div>
            
          
          </div>
          
        </div>
      );
};

export default MyCasting;