import { Liga } from "./liga";

export class Equipo {
    constructor(_id = '', name = '', ligas=[]) {
        this._id = _id;
        this.name = name;
        this.ligas = ligas;
    }
    _id: string;
    name: string;
    ligas: Liga[];
}
