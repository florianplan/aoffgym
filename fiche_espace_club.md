# Fiche fonctionnelle – Espace Club

> **Référence** : CDC §3.2.3, §3.3.2, §3.3.3 ; Exigences EF-032 à EF-066, EF-039 à EF-044  
> **Public** : Dirigeants et encadrants des clubs affiliés (1 398 clubs)

---

## 1. Vue d'ensemble

L'**Espace club** regroupe **4 grandes sections** : Informations du club, Espace documentaire, Gestion des licenciés, Statistiques. Il permet la ré-affiliation, la gestion des licenciés (création, renouvellement, décomptes, attestations), la consultation et le dépôt de documents, et les statistiques du club.

---

## 2. Fonctionnalités détaillées

### 2.1 Ré-affiliation

| Fonctionnalité | Description | Exigences |
|----------------|-------------|-----------|
| **Demande et paiement de l'affiliation** | Bouton « S'affilier pour la saison N » sur le tableau de bord si la saison est administrativement ouverte ; paiement des cotisations (affiliation + licences dirigeants) après validation CR (saison ouverte comptable au 1er sept.) | EF-032, EF-038 |
| **Suivi et attestation d'affiliation** | Suivi du statut de la demande (validation CR) ; délivrance d'une attestation d'affiliation une fois validée et payée | — |
| **Vérifications annuelles** | Vérification annuelle des informations légales du club ; vérification/modification de l'identité des dirigeants (PV d'AG en cas de changement) ; prise de licence des dirigeants au moment de l'affiliation ; vérification des encadrants (sortir, ajouter, renouveler) | EF-033 à EF-036 |
| **Validation CR** | Validation systématique de la demande par le Comité régional (cohérence données, acquittement frais d'engagement compétition) | EF-037 |

---

### 2.2 Statistiques

| Fonctionnalité | Description | Exigences |
|----------------|-------------|-----------|
| **Stats licenciés du club** | Rapport statistique personnalisé par club (données vie du club, historique, structuration) | EF-044 |
| **Consultation** | Affichage via dashboard embedded (outil data visualisation FFGym / DataGym), piloté par le SI FFGym | EF-044 |
| **Export PDF** | Export des statistiques en PDF (consultation et partage). | — |

---

### 2.3 Infos club

| Fonctionnalité | Description | Exigences |
|----------------|-------------|-----------|
| **Données statutaires** | Données obligatoires (première affiliation) : raison sociale, siège, SIRET, disciplines, etc. | EF-040 |
| **Données complémentaires** | Données secondaires (facultatives) ; certaines complétées dans le cadre de l'Accompagnement des clubs (visibilité ou non par le club à définir en atelier) | EF-040, EF-041 |
| **Organigramme** | Représentation des dirigeants et contacts du club (organigramme). | — |
| **Droits** | Profil « admin club » peut modifier les données du club | EF-040 |

---

### 2.4 Espace documentaire

| Fonctionnalité | Description | Exigences |
|----------------|-------------|-----------|
| **Dépôt de documents** | Centralisation des documents propres au club (affiliation, subventions, labellisation) ; dépôt limité selon types et règles FFGym | EF-042 |
| **Modification de documents** | Modification des documents selon cycle de vie et circuit de validation (CD, CR, Siège) | EF-042 |
| **Types et circuit** | Types et circuit de validation définis par la FFGym ; administration au niveau fédéral (création/modification/suppression ou masquage, métadonnées, obligatoire/facultatif) | EF-043 |

---

### 2.5 Gestion des licenciés

| Fonctionnalité | Description | Exigences |
|----------------|-------------|-----------|
| **Création de licences** | Création de nouveaux licenciés : manuelle unitaire ou import fichier Excel ; données obligatoires : prénom, nom d'usage, date de naissance, e-mail, discipline principale ; facultatives : adresse, discipline secondaire, fonction | EF-045 à EF-048 |
| **Renouvellement de licences** | Modification des données des licenciés puis rattachement à un décompte ; avec outil club : envoi et intégration des renouvellements par API | EF-060, EF-061 |
| **Contrôle doublons** | Contrôle à la création des pré-licences (similarité orthographique et phonétique nom/prénom ; date de naissance) ; en cas de doublon : 4 options (mutation, licence secondaire, renouvellement, invalider et confirmer pré-licence) | EF-049, EF-050 |
| **Vérification par le licencié** | Envoi au futur licencié d'un formulaire de vérification/correction (lien) ; en cas de modification des 3 données clés, réexécution du contrôle doublon | EF-051 à EF-054 |
| **Suivi des décomptes** | Sélection des pré-licences, rattachement à un décompte (existant ou nouveau) ; soumission au contrôle du CR ; après validation : « en attente de paiement » ; après paiement : licences valides | EF-055 à EF-057 |
| **Gestion décomptes** | Tant que le décompte n'est pas en cours de paiement : extraire des licences, fusionner/scinder décomptes, supprimer une licence ; limites (nombre max licences, montant max, durée de vie) | EF-064, EF-065 |
| **Mutations** | Gestion du changement de club : 3 entrées (gestion licenciés, doublons à la saisie, doublons à la vérification licencié) ; validation régionale ou Commission nationale (haut-niveau) | EF-062, EF-063 |
| **Attestations de licences** | Génération et téléchargement des attestations de licence pour les licenciés du club | — |
| **Historique des licenciés** | Consultation de l'historique des licenciés (licences, clubs, statuts). | — |
| **Numéro de licence** | Numéro de licence unique inchangé toute la vie du licencié | EF-066 |

---

## 3. Synthèse par bloc fonctionnel

| Bloc | Fonctionnalités clés |
|------|----------------------|
| **Ré-affiliation** | Demande, paiement, suivi, attestation, vérifications annuelles |
| **Statistiques** | Stats licenciés, dashboard embedded, consultation, export PDF |
| **Infos club** | Données statutaires, données complémentaires, organigramme |
| **Espace documentaire** | Dépôt, modification, types et circuit de validation |
| **Gestion des licenciés** | Création, renouvellement, doublons, décomptes, mutations, attestations, historique |

---

## 4. Lien avec le POC

Le POC met en avant **2 Killer Features** dans l'Espace club :
- **KF-1** : Dashboard Club & Gestion des licenciés (liste, KPIs, alertes, actions rapides)
- **KF-2** : Parcours de prise de licence (formulaire pré-licence, contrôle doublons, 4 options)

Voir le [cahier des charges POC](poc_cahier_des_charges.md) pour les écrans et composants détaillés (tableau de bord, liste licenciés, formulaire pré-licence, modale doublons).

---

*Document de référence pour le cahier des charges POC – FFGym Licence.*
