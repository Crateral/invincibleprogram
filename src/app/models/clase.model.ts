export class Clase {

    constructor(
        public horaInicio: string,
        public horaFinal: string,
        public fecha: string,
        public descripcion: string,
        public coach: string,
        public wod: string,
        public cupo?: number,
        public estado?: string,
        public _id?: string
    ) {
    }
}