import { Equipo } from "./equipo";


export class Jugador {

    constructor(_id = '', nombre = '', numero = 0, posicion = '', jugadorCuadro = true, 
    bbate = 0, h = 0, hith = 0, hr = 0, ci = 0, jg = 0, jp = 0,
    js = 0, pcl = 0, inn = 0, k = 0, bbola = 0, equipos = null) {
        this._id = _id;
        this.nombre = nombre;
        this.numero  = numero;
        this.posicion= posicion;
        this.jugadorCuadro =  jugadorCuadro;
        this.bbate=  bbate;
        this.h=   h;
        this.hr=  hr;
        this.ci= ci;
        this.jg= jg;
        this.jp=  jp;
        this.js=  js;
        this.pcl= pcl;
        this.inn= inn;
        this.k= k;
        this.bbola= bbola;
        this.equipos = equipos;
     }
    _id: string;
    nombre  : string;
    numero  :number;
    posicion: string;
    jugadorCuadro : boolean;
    bbate: number;
    h:  number;
    hr: number;
    ci: number;
    jg: number;
    jp: number;
    js: number;
    pcl:number;
    inn:number;
    k:  number;
    bbola: number;
    equipos : Equipo[];
}


