
// Types reflecting the database schema

export interface Faculty {
  id_faculte: number;
  nom: string;
}

export interface Level {
  id_niv: number;
  niv: string;
  formation: string;
  domaine: string;
  specialite: string;
  id_faculte: number;
}

export interface Group {
  id_groupe: number;
  nom: string;
  nbr_etud: number;
  id_niv: number;
}

export interface Teacher {
  id_enseignant: number;
  nom: string;
  prenom: string;
  Email: string;
  Tel: string;
  id_faculte: number;
}

export interface Module {
  id_module: number;
  nom: string;
  id_niv: number;
  id_enseignant: number;
}

export interface Day {
  id_jour: number;
  nom: string;
}

export interface TimeSlot {
  id_crenom: number;
  periode: string;
}

export interface Room {
  id_salle: number;
  nom: string;
  capacite: number;
  nbrens_surveillance: number;
  id_faculte: number;
}

export interface AvailableRoom {
  id_salle: number;
  id_jour: number;
  id_crenom: number;
}

export interface Surveillance {
  id_enseignant: number;
  id_jour: number;
  id_crenom: number;
  id_salle: number;
}

export interface Exam {
  id_groupe: number;
  id_module: number;
  id_crenom: number;
  id_salle: number;
}
