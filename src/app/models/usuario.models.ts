import { environment } from '../../environments/environment';

const baseUrl = environment.base_url;


export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public pass?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public uid?: string
    ){}

    get imagenUrl() {

        if (!this.img) {
            return `${baseUrl}/upload/usuarios/no-image.jpg`;
        }
        if ( this.img.includes('https')) {
            return this.img;
        }
        if ( this.img ) {
            return `${baseUrl}/upload/usuarios/${this.img}`;
        } else {
            return `${baseUrl}/upload/usuarios/no-image.jpg`;
        }

    }
}
