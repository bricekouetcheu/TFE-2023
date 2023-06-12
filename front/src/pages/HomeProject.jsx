import {useState,React} from 'react';
import Side from '../composants/Side';
import Content from '../composants/Content';
import MyCasting from '../composants/MyCasting';
import NewCasting from '../composants/NewCasting';


const HomeProject = () => {
    const [selectedOption, setSelectedOption] = useState('Newcasting');


    const handleSidebarItemClick = (option) => {
        setSelectedOption(option);
      };


      let contentComponent = null;

      if (selectedOption === 'Newcasting') {
        contentComponent = <NewCasting />;
      } else if (selectedOption === 'Mycasting') {
        contentComponent = <MyCasting></MyCasting>;}
    return (
        <div className='Dashboard'>
          
          <Side onItemClick={handleSidebarItemClick} />
           {contentComponent}
            
            
        </div>
    );
};

export default HomeProject;