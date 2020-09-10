import { Hospital } from './hospital.models';

interface MedicoUser {
    _id: string;
    nombre: string;
    img: string;
}


export class Medico {
    nombre: string;
    uid?: string;
    img?: string;
    hospital?: Hospital;
    usuario?: MedicoUser;
}
