import { Cultivo } from './cultivo';

export interface Recomendacion {
  idRecomendacion: number;
  cultivo?: Cultivo;
  fecha: string;
  recomendacion: string;
}
