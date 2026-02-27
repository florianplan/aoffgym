# Fiche fonctionnelle – Espace Page d'accueil

> **Référence** : CDC §3.2.1, Exigences EF-001 à EF-004, EF-002 à EF-003, EF-005 à EF-017 (affiliation nouveau club)  
> **Public** : Tous les visiteurs (non connectés), utilisateurs Fédéral / SD / Club / Licencié

---

## 1. Vue d'ensemble

La **page d'accueil** est le point d'entrée public de FFGym Licence. Elle permet l'accès à la connexion pour les utilisateurs déjà identifiés (tous niveaux : fédéral, SD, club, licencié), la **demande de contact** transmise au comité régional correspondant, et la **demande d'affiliation** pour les clubs n'ayant jamais été affiliés.

---

## 2. Fonctionnalités détaillées

### 2.1 Authentification

| Fonctionnalité | Description | Exigences |
|----------------|-------------|-----------|
| **Accès connexion** | Proposer un accès à la connexion pour les utilisateurs déjà identifiés | EF-001 |
| **Niveaux utilisateurs** | Authentification pour les utilisateurs de niveau **fédéral**, **SD** (Structure Déconcentrée), **Club** et **Licencié** | CDC §3.2.1 |
| **Sécurité** | Authentification sécurisée ; niveau de sécurité et mode (à préciser en ateliers) | EF-004 |

**Comportement attendu** : après identification, redirection vers l'espace correspondant au profil (Espace fédéral, Espace club, Espace licencié).

---

### 2.2 Demande de contact

| Fonctionnalité | Description |
|----------------|-------------|
| **Formulaire** | Formulaire de demande de contact (objet, message, coordonnées). |
| **Routage** | Transmission de la demande au **comité régional correspondant** (selon zone géographique ou choix du demandeur). |
| **Suivi** | Traçabilité de la demande côté CR (hors périmètre détaillé page d'accueil). |

---

### 2.3 Demande d'affiliation (nouveau club)

Réservée aux **clubs n'ayant jamais été affiliés** au moins une fois à la FFGym.

| Fonctionnalité | Description | Exigences |
|----------------|-------------|-----------|
| **Formulaire dématérialisé** | Demande d'affiliation entièrement dématérialisée | EF-005 à EF-017 |
| **Transmission** | Demande transmise au **comité régional correspondant** (selon siège social du club) | EF-013 |
| **Workflow de validation** | Demande soumise à un **workflow de validation** : étude par le CR, contrôle recevabilité et cohérence, échanges possibles avec le club, validation ou refus | EF-014 |

**Contrôle** : vérifier que la demande ne concerne que les clubs n'ayant jamais été affiliés (EF-003).

**Détails métier (résumé)** :
- Création de compte utilisateur par le représentant légal
- Informations légales obligatoires (raison sociale, siège, SIRET, disciplines)
- Téléversement de documents (PV d'AG, statuts)
- Déclaration des 3 dirigeants obligatoires (Président, Trésorier, Secrétaire général) – licenciés FFGym
- Cas dirigeant non licencié / déjà licencié / anciennement licencié
- Données pour contrôle d'honorabilité
- Validation CR puis paiement (affiliation + 3 licences dirigeants)
- Attribution automatique des droits administrateur sur le club après affiliation

---

## 3. Écrans et composants (orientés POC / démo)

| Composant | Rôle |
|-----------|------|
| **Header** | Logo FFGym, navigation (À propos, Contact) |
| **Hero / zone d'accroche** | Titre, baseline, visuel |
| **Bouton « Se connecter »** | Ouverture de la modale de connexion |
| **Modale Connexion** | Champs identifiant (email ou n° licence) et mot de passe ; redirection selon profil |
| **Lien « Demande d'affiliation »** | Accès au formulaire dématérialisé (clubs non affiliés) |
| **Lien / formulaire « Contact »** | Demande de contact → comité régional |

---

## 4. Liens avec les autres espaces

- **Authentification** → selon profil : **Espace fédéral**, **Espace club** ou **Espace licencié**.
- **Demande d'affiliation** → traitement dans **Espace fédéral** (CR) ; après validation, accès **Espace club** pour le club.

---

*Document de référence pour le cahier des charges POC – FFGym Licence.*
