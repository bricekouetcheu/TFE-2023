export function getConcreteStrengthValue (strenghtClass){
    const strengthValues = new Map([
        ["C20/25", 20.],
        ["C25/30", 25.],
        ["C30/37", 30.],
        ["C40/50", 40.],
        ["C45/55", 45.],
        ["C50/60", 50.],
        ["C55/67", 55.],
        ["C60/75", 60.],
        ["C70/85", 70.],
        ["C80/95", 80.],
        ["C90/105", 90.]
      ]);
      return strengthValues.get(strenghtClass) || null;
}


export function getBetonTypes(betonType){
    const values = new Map([
         ['S' , 0.38],
         ['N' , 0.25] ,
         ['R' ,0.20],
    ])

    return values.get(betonType) || null;
}