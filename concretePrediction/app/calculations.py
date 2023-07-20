# CURING CALCULATIONS
def getCuringTime(resistanceEvolution, envConditions, concrete_temperature):
    if resistanceEvolution == "R" and envConditions == "good" and concrete_temperature >= 10:
        return 1
    elif (resistanceEvolution == "R" and envConditions == "good" and concrete_temperature < 10) or (resistanceEvolution == "R" and envConditions == "normal" and concrete_temperature >= 10) or (resistanceEvolution == "N" and envConditions == "good" and concrete_temperature >= 10):
        return 2
    elif (resistanceEvolution == "R" and envConditions == "bad" and concrete_temperature >= 10) or (resistanceEvolution == "N" and envConditions == "normal" and concrete_temperature >= 10) or (resistanceEvolution == "S" and envConditions == "good" and concrete_temperature >= 10):
        return 3
    elif (resistanceEvolution == "R" and envConditions == "normal" and concrete_temperature < 10) or (resistanceEvolution == "N" and envConditions == "good" and concrete_temperature < 10) or (resistanceEvolution == "N" and envConditions == "bad" and concrete_temperature >= 10) or (resistanceEvolution == "S" and envConditions == "normal" and concrete_temperature >= 10) or (resistanceEvolution == "very S" and envConditions == "good" and concrete_temperature >= 10):
        return 4
    elif (resistanceEvolution == "R" and envConditions == "bad" and concrete_temperature < 10) or (resistanceEvolution == "S" and envConditions == "good" and concrete_temperature < 10):
        return 5
    elif (resistanceEvolution == "N" and envConditions == "normal" and concrete_temperature < 10) or (resistanceEvolution == "S" and envConditions == "good" and concrete_temperature < 10) or (resistanceEvolution == "S" and envConditions == "normal" and concrete_temperature >= 10):
        return 6
    elif (resistanceEvolution == "S" and envConditions == "bad" and concrete_temperature >= 10):
        return 7
    elif (resistanceEvolution == "N" and envConditions == "bad" and concrete_temperature < 10) or (resistanceEvolution == "S" and envConditions == "normal" and concrete_temperature < 10):
        return 8
    elif (resistanceEvolution == "S" and envConditions == "bad" and concrete_temperature < 10) or (resistanceEvolution == "S" and envConditions == "bad" and concrete_temperature >= 10):
        return 10
    elif (resistanceEvolution == "S" and envConditions == "normal" and concrete_temperature < 10):
        return 12
    elif (resistanceEvolution == "S" and envConditions == "bad" and concrete_temperature < 10):
        return 15


def getResistanceEvolution(fcm2_fcm28_ratio, type2_addition, rc2_rc28_ratio, cement_type):
    if fcm2_fcm28_ratio is not None:
        return ratio(fcm2_fcm28_ratio)
    elif type2_addition:
        return "S"
    elif rc2_rc28_ratio is not None:
        return ratio(rc2_rc28_ratio)
    elif cement_type is not None:
        return cementType(cement_type)
    else:
        return ("S")


def getEnvConditions(wind, humidity):
    if humidity < 50 and wind > 5:
        return 'bad'
    elif 50 <= humidity < 80:
        return "normal"
    elif humidity >= 80 and wind < 5:
        return 'good'
    else:
        return "normal"


def ratio(ratio):
    # Determines the evolution of the strength according to the ratio Fcm2/Fcm28 of the concrete or Rc2/Rc25 of the cement
    if 0 > ratio >= 0.5:
        return "R"
    elif 0.3 <= ratio < 0.5:
        return "N"
    elif 0.15 <= ratio < 0.3:
        return "S"
    elif ratio < 0.15:
        return "S"


def cementType(type):
    # Determines the evolution of the strength according to the type of cement
    cementTypes = {
        "CEM 42.5 R": "R",
        "CEM 52.5 N": "R",
        "CEM 52.5 R": "R",

        "CEM 32.5 R": "N",
        "CEM 42.5 N": "N",

        "CEM 32.5 N": "S"
    }
    return cementTypes[type]