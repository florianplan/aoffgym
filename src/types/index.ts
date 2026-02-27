// ============================================
// TYPES PRINCIPAUX - POC FFGym Licence
// ============================================

// --- ADRESSE ---
export interface Adresse {
  rue: string;
  codePostal: string;
  ville: string;
}

// --- DIRIGEANT ---
export interface Dirigeant {
  nom: string;
  prenom: string;
  email: string;
  numeroLicence: string;
}

// --- DÉCOMPTE ---
export interface Decompte {
  montant: number;
  statut: 'en_attente_validation_cr' | 'valide' | 'rejete';
  nombreLicences: number;
}

// --- STATISTIQUES CLUB ---
export interface StatistiquesClub {
  nombreLicencies: number;
  nombreLicenciesSaisonPrecedente: number;
  repartitionDisciplines: Record<string, number>;
  preLicencesEnAttente: number;
  decompteEnCours: Decompte;
}

// --- CLUB ---
export interface Club {
  id: string;
  numeroAffiliation: string;
  nom: string;
  siret: string;
  adresse: Adresse;
  disciplines: string[];
  saison: string;
  statutAffiliation: 'affilié' | 'en_attente' | 'non_affilie';
  dateAffiliation: string;
  comiteRegional: string;
  comiteDepartemental: string;
  dirigeants: {
    president: Dirigeant;
    tresorier: Dirigeant;
    secretaireGeneral: Dirigeant;
  };
  statistiques: StatistiquesClub;
}

// --- CERTIFICAT MÉDICAL ---
export interface CertificatMedical {
  dateValidite: string | null;
  statut: 'valide' | 'manquant' | 'expiré';
}

// --- HISTORIQUE LICENCE ---
export interface HistoriqueLicence {
  saison: string;
  club: string | { nom: string; ville: string };
  discipline: string;
  fonction?: string;
  statut: 'validé' | 'en_attente' | 'annulé';
}

// --- DIPLOME ---
export interface Diplome {
  type: 'CQP' | 'Fédéral' | 'Universitaire';
  intitule: string;
  dateObtention: string;
}

// --- LICENCIÉ ---
export interface Licencie {
  id: string;
  numeroLicence: string | null;
  nom: string;
  prenom: string;
  dateNaissance: string;
  email: string;
  telephone: string;
  adresse: Adresse;
  photo: string | null;
  disciplinePrincipale: string;
  disciplineSecondaire: string | null;
  fonction: 'pratiquant' | 'encadrant' | 'dirigeant';
  statut: 'valide' | 'en_attente' | 'expire' | 'pre_licence';
  saison: string;
  certificatMedical: CertificatMedical;
  historique: HistoriqueLicence[];
  diplomes?: Diplome[];
}

// --- STATUT LICENCE (pour badges UI) ---
export type StatutLicence = 'valide' | 'en_attente' | 'expire' | 'pre_licence';

// --- LICENCIÉ COMPLET (Espace Licencié) ---
export interface ClubResume {
  nom: string;
  ville: string;
  logo?: string;
}

export interface LicenceInfo {
  saison: string;
  statut: 'valide' | 'en_attente' | 'expire';
  dateValidite: string;
  disciplinePrincipale: string;
  disciplineSecondaire: string | null;
  fonction: 'pratiquant' | 'encadrant' | 'dirigeant';
}

export interface Competition {
  nom: string;
  date: string;
  lieu: string;
  agres?: string[];
}

export interface ResultatCompetition {
  nom: string;
  date: string;
  classement: string;
  categorie: string;
}

export interface CompetitionInfo {
  niveau: string;
  prochaines: Competition[];
  resultats: ResultatCompetition[];
}

export interface HistoriqueLicencieComplet {
  saison: string;
  club: ClubResume;
  discipline: string;
  fonction: string;
  statut: 'validé' | 'en_attente';
}

export interface LicencieComplet {
  id: string;
  numeroLicence: string;
  nom: string;
  prenom: string;
  dateNaissance: string;
  age: number;
  email: string;
  telephone: string;
  adresse: Adresse;
  photo: string;
  club: ClubResume;
  licence: LicenceInfo;
  certificatMedical: CertificatMedical;
  historique: HistoriqueLicencieComplet[];
  competition: CompetitionInfo;
  formation: Diplome[];
  badges: string[];
}

// --- PRÉ-LICENCE (Création) ---
export interface PreLicenceSaisie {
  nom: string;
  prenom: string;
  dateNaissance: string;
  email: string;
  disciplinePrincipale: string;
  fonction?: 'pratiquant' | 'encadrant' | 'dirigeant';
}

// --- DOUBLON ---
export interface DoublonOption {
  id: 'mutation' | 'licence_secondaire' | 'renouvellement' | 'invalider_doublon';
  label: string;
  description: string;
  disponible: boolean;
  raison?: string;
}

export interface LicencieDoublon {
  numeroLicence: string;
  nom: string;
  prenom: string;
  dateNaissance: string;
  clubActuel: string;
  disciplinePrincipale: string;
  statut: string;
}

export interface DoublonDetecte {
  score: number;
  raison: string;
  licencieExistant: LicencieDoublon;
}

export interface DoublonResponse {
  preLicenceSaisie: PreLicenceSaisie;
  doublonDetecte: DoublonDetecte;
  optionsProposees: DoublonOption[];
}

// --- ALERTE ---
export interface AlerteAction {
  label: string;
  route: string;
}

export type AlerteType = 'warning' | 'info' | 'success' | 'error';
export type AlertePriorite = 'haute' | 'moyenne' | 'basse';

export interface Alerte {
  id: string;
  type: AlerteType;
  priorite: AlertePriorite;
  titre: string;
  message: string;
  action: AlerteAction;
  date: string;
}

// --- DISCIPLINE ---
export interface Discipline {
  code: string;
  libelle: string;
  abreviation: string;
}

// --- ATTESTATION (PDF) ---
export interface AttestationLicencie {
  photo: string;
  nom: string;
  prenom: string;
  dateNaissance: string;
  numeroLicence: string;
}

export interface AttestationClub {
  nom: string;
  numeroAffiliation: string;
  ville: string;
}

export interface AttestationValidite {
  du: string;
  au: string;
}

export interface AttestationAssurance {
  compagnie: string;
  numeroContrat: string;
  type: string;
}

export interface AttestationQrCode {
  data: string;
  description: string;
}

export interface AttestationFooter {
  adresse: string;
  contact: string;
}

export interface Attestation {
  titre: string;
  sousTitre: string;
  saison: string;
  dateGeneration: string;
  licencie: AttestationLicencie;
  club: AttestationClub;
  disciplines: string[];
  validite: AttestationValidite;
  assurance: AttestationAssurance;
  qrCode: AttestationQrCode;
  footer: AttestationFooter;
}

// --- NAVIGATION / CONTEXTE ---
export type EspaceType = 'club' | 'licencie';

export interface UserContext {
  espace: EspaceType;
  club?: Club;
  licencie?: LicencieComplet;
}
