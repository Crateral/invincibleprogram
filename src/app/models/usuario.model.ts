import { Plan } from './plan.model';
export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public plan: Plan,
        public cedula: string,
        public fechaNacimiento: string,
        public telefono: string,
        public direccion: string,
        public rh: string,
        public nombreContacto: string,
        public telefonoContacto: string,
        public descuento: boolean,
        public porcentajeDescuento?: number,
        public totalValorPlan?: number,
        public img?: string,
        public fechaInscripcion?: string,
        public fechaInicioPlan?: string,
        public fechaFinPlan?: string,
        public estado?: string,
        public role?: string,
        public _id?: string
    ) {
    }

}