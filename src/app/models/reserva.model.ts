import { Usuario } from './usuario.model';
import { Clase } from './clase.model';
export class Reserva {

    constructor(
        public usuario: Usuario,
        public clase: Clase,
        public fechaReserva: string,
        public _id?: string
    ) {
    }
}