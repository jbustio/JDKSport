import { Liga } from "./liga";

export class Equipo {
    constructor(_id = '', name = '', dim= '', ligas=[]) {
        this._id = _id;
        this.name = name;
        this.dim = dim;
        this.ligas = ligas;
    }
    _id: string;
    name: string;
    dim: string;
    ligas: Liga[];
}
