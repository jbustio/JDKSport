import { Equipo } from "./equipo";
import { Estadio } from "./estadio";

export class Juego {
    constructor(_id = '', name = '', equipoh = null, equipov = null, estadio = null, 
                carrerash = 0, carrerasv = 0, hith = 0, hitv = 0, errorh = 0, errorv = 0, arbitro1 = '',
                arbitro2 = '', arbitro3 = '', arbitroh = '', arbitrolf = '', arbitrocf = '', arbitrorf = '',
                 comentarista1 = '', comentarista2 = '',comentarista3 = '', inn = 0, partInn = 0, strike = 0, 
                 out = 0, bolas = 0, lanzamientosh = 0, lanzamientosv = 0) {
        this._id = _id;
        //this.fecha = name;
        this.equipoh = equipoh;
        this.equipov = equipov;
        this.estadio = estadio;
        this.carrerash = carrerash;
        this.carrerasv = carrerasv;
        this.hith = hith;
        this.hitv = hitv;
        this.errorh = errorh;
        this.errorv = errorv;
        this.arbitro1 = arbitro1;
        this.arbitro2 = arbitro2;
        this.arbitro3 = arbitro3;
        this.arbitroh = arbitroh;
        this.arbitrolf = arbitrolf;
        this.arbitrocf = arbitrocf;
        this.arbitrorf = arbitrorf;
        this.comentarista1 = comentarista1;
        this.comentarista2 = comentarista2;
        this.comentarista3 = comentarista3;
        this.inn = inn;
        this.partInn = partInn;
        this.strike = strike;
        this.out = out;
        this.bolas = bolas;
        this.lanzamientosh = lanzamientosh;
        this.lanzamientosv = lanzamientosv;

    }
    _id: string;
    //fecha: d;
    equipoh: Equipo; 
    equipov: Equipo;
    estadio: Estadio;
    carrerash: number;
    carrerasv: number;
    hith: number;
    hitv: number;
    errorh: number;
    errorv: number;
    arbitro1: string;
    arbitro2: string;
    arbitro3: string;
    arbitroh: string;
    arbitrolf: string;
    arbitrocf: string;
    arbitrorf: string;
    comentarista1: string;
    comentarista2: string;
    comentarista3: string;
    inn: number;
    partInn:number;
    strike:number;
    out: number;
    bolas: number;
    lanzamientosh:number ;
    lanzamientosv: number
}
