from typing import Union

from fastapi import FastAPI
from pydantic import BaseModel
import datetime
import time
import random
import numpy as np

from concrete_hardening import StrengthClass, CementType, ConcreteStrength



class ConcreteModel(BaseModel):
    strengthClass : Union[float,  None] = StrengthClass.C20_25
    cementType : Union[float ,  None] = CementType.S
    temperature_hist: Union[list , None] = []
    time_hist : Union[list ,  None] = []
    t_cast : Union[float, None] = 0


app = FastAPI()


@app.get("/health/")
def health():
    return('health')

@app.post("/prediction/{target}")
def prediction(concrete: ConcreteModel, target : float):
    """
    Create a concrete strength prediction.
    """

    # factor to convert second to days
    s2d = 1./(3600.*24)

    # I create the fake temperature history
    # t --> time (in timestamp)
    # T --> Temperature
    # t0 -> time when the measurement starts
    # tCast -> time when the casting start

    Duration = 35  # days
    now = time.time()
    
    if concrete.t_cast == 0 : 
        tCast = now 
        t0 = tCast 
    else : 
        tCast = concrete.t_cast
        t0 = tCast 
    t = np.linspace(t0, t0+Duration/s2d, 100)
   
    T = np.array(concrete.temperature_hist)
    T= np.array(t) *0 + 20.0

    # I create a concrete cast with their properties (Strength CLass, Cement TYpe)
    myConcreteCast = ConcreteStrength(concrete.strengthClass, concrete.cementType)
    # I provide the Temperature History
    myConcreteCast.setTempHistory(t, T)

    # I provide the time when the casting starts
    myConcreteCast.setCastingTime(tCast)

    # Computing the concrete Maturity
    # sur base des temp => recalculer age équivalent (age selon les temp et non selon un environnement normatif (20°C et 95% humidité))
    # équivalence entre temps réelle (B_cc_) et le
    myConcreteCast.computeMaturity()

    # COMPUTING how long do we have to wait the achieve a desired compressive strength treshhold....
    # inverser la formule avec Beta => "que vaut mon T pour que f_cm(T) atteigne la valeur cible"
    # cmb de temps attendre pour que f_cm soit au moins à une certains valeur
    r = myConcreteCast.getTimeStrength(target)
    tUncast = r.x[0]
    print('Ready to uncast in %d days' % int(np.ceil((tUncast-now)*s2d)))

    return {"uncasting_waiting_time": np.round((tUncast-now)*s2d),
            "uncasting_timestamp": np.round(tUncast)}
    
