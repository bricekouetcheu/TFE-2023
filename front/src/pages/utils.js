export function checkValidity (order, delivery){
    const orderKeys = Object.keys(order);
     
     
    for (let i = 0; i < orderKeys.length; i++){
        const orderKey = orderKeys[i]
        const orderValue = order[orderKey]
        let ismatching = false
     
  
        if (orderKey === 'Diametre maximal des granulats'){
            const orderDmax = order[orderKey]
            const orderDmaxValue = orderDmax.replace(/\s/g, '').match(/\d+/g).map(Number);
            for(let j=0 ; j < delivery.length ; j++){
                if(delivery[j].includes('Dmax')){
                    const deliveryDmax = delivery[j]
                    const deliveryDiameters = deliveryDmax.replace(/\s/g, '').match(/\d+/g).map(Number);
                      if(orderDmaxValue[0] ===  deliveryDiameters[0]){
                          ismatching = true
                          break;
                      }
                }
            }
        }else if(orderKey === 'Domaine utilisation'){
            if(orderValue.toLowerCase() === 'ba'){
                for(let j = 0 ; j< delivery.length; j++){
                    if(delivery[j].includes('Béton armé')){
                        ismatching = true;
                        break;
                    }
                }
  
            }
        }else if(orderKey === 'Classe Environnement'){
          const orderEnvironment = order[orderKey]
          for(let j=0; j < delivery.length ; j++){
              
              if(delivery[j].includes('Classe(s)')){
                  ismatching = orderEnvironment.split(' ').some((value)=> delivery[j].includes(value))
                  break
                  
              }
          }
        
  
        }
  
        for(let j=0 ; j < delivery.length ; j++){
            const deliveryValue = delivery[j].toLowerCase()
            if(deliveryValue.includes(orderValue.toLowerCase())){
                ismatching = true
                break;
            }
        }
      if (!ismatching) {
        return false;
      }
  
        
    }
  
     
      return true
    
}