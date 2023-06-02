import {useState, React} from 'react';


const combineAddress = (street, postalCode, city) => {
    return `${street}, ${postalCode} ${city}`;
  };

const Step2 = ({ErrorMessage, onNext}) => {

    const [street, setStreet]= useState('')
    const [city, setCity]= useState('')
    const [postalCode, setPostalCode] = useState('')

    const handleNext = () => {
        // Valider les données du formulaire ou effectuer des traitements supplémentaires si nécessaire
    
        // Combinez les différentes parties de l'adresse pour former une adresse complète
        const fullAddress = combineAddress(street, postalCode, city);
    
        // Appeler la fonction onNext pour envoyer les données au composant parent
        onNext({ fullAddress });
      };
    


    return (
      <div className='step2'>
        <h2>Project Location</h2>
        <div className='step2-address'>
            <div className='left'>
                <div className='left-label'>
                    <label For="address">Street</label>
                    <input type="text"
                    value={street}
                    onChange={(e)=>e.target.value}/>
                </div>
                <div className='left-label'>
                    <label For=" location">City</label>
                    <input type="text" 
                    value={city}
                    onChange={(e)=>e.target.value}/>
                </div>
               
            </div>
            <div className='right'>
                <label For="location">Postal code</label>
                <input type="text"
                value={postalCode}
                onChange={(e)=>e.target.value}
                 name=""
                  id=""/>
            </div>

        </div>
        {(street.trim() === '' || city.trim() === '' || postalCode.trim() === ' ' )&& <p className='error-message'>{ErrorMessage}</p>}
      </div>
    );
  };

  export default Step2;