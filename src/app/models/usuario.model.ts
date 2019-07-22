import { Plan } from './plan.model';
export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public plan: Plan,
        public cedula: string,
        public fechaNacimiento: string,
        public img?: string,
        public fechaInscripcion?: string,
        public fechaIncioPlan?: string,
        public fechaFinPlan?: string,
        public estado?: string,
        public rol?: string,
        public _id?: string
    ) {
    }

}