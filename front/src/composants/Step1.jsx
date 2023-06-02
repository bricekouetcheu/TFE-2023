import {useState, React} from 'react';

const Step1 = ({ErrorMessage, onNext}) => {

    const [projectName, setProjectName] = useState('')
    const [isFormValid, setIsFormValid] = useState(false);

    const handleNext = () => {
        // Valider les données du formulaire ou effectuer des traitements supplémentaires si nécessaire
    
        // Appeler la fonction onNext pour envoyer les données au composant parent
        onNext({ projectName });
    };

    onNext(projectName)
    
    return (
      <div className='step1'>
        <h2>Project name</h2>
         <input type="text"
          placeholder='Enter your project name...'
          onChange={(e) => setProjectName(e.target.value)}
          value={projectName}
           />
            {projectName.trim() === '' && <p className='error-message'>{ErrorMessage}</p>}
      </div>
    );
  };

  export default Step1;