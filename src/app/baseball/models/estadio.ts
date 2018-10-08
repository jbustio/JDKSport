export class Estadio {
    constructor(_id = '', nombre = '', localidad = '') {
        this._id = _id;
        this.nombre = nombre;
        this.localidad = localidad;
    }
    _id: string;
    nombre: string;
    localidad: string;
}
