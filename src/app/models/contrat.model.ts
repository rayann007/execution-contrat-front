export enum TypeContrat {
  Travaux = 'Travaux',
  Prestation = 'Prestation',
  Continu = 'Continu'
}

export enum StatutContrat {
  EnCours = 'en_cours',
  Terminé = 'terminé',
  Résilié = 'résilié'
}

export interface Contrat {
  id: number;
  nomContrat: string;
  type: TypeContrat;
  statut: StatutContrat;
  dateDebut: string;
  dateFin: string;
  serviceConcerne: string;
  responsableLeoni: string;
  emailResponsable: string;
  emailsPersonnesDediees: string;
  prestataire: string;
}
