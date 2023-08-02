# -*- coding: utf-8 -*-

import numpy as np
from enum import Enum
from scipy.interpolate import splev, splrep


class StrengthClass(Enum):
    C20_25 = 20.
    C25_30 = 25.
    C30_37 = 30.
    C40_50 = 40.
    C45_55 = 45.
    C50_60 = 50.
    C55_67 = 55.
    C60_75 = 60.
    C70_85 = 70.
    C80_95 = 80.
    C90_105 = 90.


class CementType(Enum):
    S = 0.38
    N = 0.25
    R = 0.20


class ConcreteStrength():

    def __init__(self, f_ck, CementType):
        self.f_ck = None
        if (type(f_ck) == float):
            self.f_ck = f_ck
        else:
            self.f_ck = f_ck.value

        self.s = None
        if (type(CementType) == float):
            self.s = CementType
        else:
            self.s = CementType.value

        self.t = np.zeros((0))
        self.temperature = np.zeros((0))
        self.splTemp = None
        self.splMaturity = None
        self.timeFactor = 24*3600
        self.tCast = None
        self.MAX_DAYS = 30

    def __Beta_cc__(self, t):

        tt = np.array(t.copy())
        if ((type(tt) == np.float64) or ((len(tt.shape)) == 0)):
            if (tt < 1e-5):
                t = 1e-5
        else:
            ii = np.where(tt < 1e-5)

            tt[ii] = 1e-5

        array = np.exp(self.s*(1.0-np.sqrt(28.0/tt)))

        return array

    def setTempHistory(self, time, temperature, timeFactor=24*3600):
        self.t = time
        self.temperature = temperature
        self.timeFactor = timeFactor
        k = 3
        if len(self.t) <= 3 : 
            k = len(self.t)-1
        self.splTemp = splrep(self.t, self.temperature, k=k)

    def getTemperatureHistory(self, time):
        if (self.splTemp == None):
            return time*0 + 20.0
        else:
            return splev(time, self.splTemp, ext=3)

    def computeMaturity(self):

        N = 1000

        # if not (self.splTemp == None) :
        #    time = np.linspace(self.t.min(), self.t.max(), N)
        # else :
        #    time = np.linspace(self.tCast, self.tCast + 28*self.timeFactor, N)
        time = np.linspace(self.tCast, self.tCast +
                           self.MAX_DAYS*self.timeFactor, N)
        self.lAge = (time - self.tCast) / self.timeFactor

        dlAge = self.lAge[1:] - self.lAge[0:-1]
        lTemp = self.getTemperatureHistory(time)
        ii = np.where(time <= self.tCast)

        dlTemp = 0.5*(lTemp[1:] + lTemp[0:-1])
        increment = np.exp(-(4000.0/(273.0+dlTemp)-13.65))
        increment[ii] = 0
        maturity = np.cumsum(increment*dlAge)
        maturity = np.insert(maturity, 0, 0)
        self.splMaturity = splrep(time, maturity)

    def getMaturity(self, t):
        r = splev(t, self.splMaturity, ext=0)
        if ((type(r) == np.float64) or ((len(r.shape)) == 0)):
            if (t < 0):
                r = 0
        else:
            ii = np.where(t < 0)
            r[ii] = 0
        return r

    def setCastingTime(self, t):
        self.tCast = t

    def fcm(self, t):  # f_cm(t) = Beta_cc(t) * f_cm
        age = self.getMaturity(t)
        return self.__Beta_cc__(age) * (self.f_ck + 8.0)

    def fck(self, t):
        # as defined in NBN EN 1992-1 : 3.1.2 (5)
        age = self.getMaturity(t)
        array = np.array(self.fcm(t) - 8)

        if ((type(array) == np.float64) or ((len(array.shape)) == 0)):

            if (age < 3):
                array = 0.0
            if (array < 0.0):
                array = 0.0
        else:
            i = np.where(age < 3)
            array[i] = 0.0
            i = np.where(array < 0.0)
            array[i] = 0.0

        return array

    def __func__(self, x, fc):
        # return x + 2 * np.cos(x)
        return self.fck(x) - fc

    def getTimeStrength(self, fc):
        from scipy import optimize

        # return optimize.root(self.__func__, self.tCast + 10*self.timeFactor, args=(fc))
        x0 = self.tCast + 5*self.timeFactor
        x1 = self.tCast + self.MAX_DAYS*self.timeFactor
        f1 = self.__func__(x1, fc)
        return optimize.root(self.__func__,  x0, args=(fc))
        # return optimize.root_scalar(self.__func__,  method='brenth', bracket=[x0, x1], args=(fc))


if __name__ == '__main__':
    import test_concrete_hardening
    test_concrete_hardening.test()
