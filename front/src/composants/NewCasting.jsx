import React from 'react';

const NewCasting = () => {
    return (
        <div className='dashboard-content'>
            <div className='dashboard-nav'>
                <h1>Project Dashboard</h1>
            </div>
            <div className='formNewCasting'>
                <h3> Create a new casting</h3>
                <div className='form-casting'>
                    <div>
                        <label htmlFor="casting name">
                            Name
                        </label>
                        <input type="text" placeholder='Enter the casting name'  required/>
                    </div>
                    <div>
                        <label htmlFor="casting name">
                            Add a Description
                        </label>
                        <textarea></textarea>
                    </div>
                </div>
            </div>
        
    </div>
    );
};

export default NewCasting;