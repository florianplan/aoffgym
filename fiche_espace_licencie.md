# Fiche fonctionnelle – Espace Licencié

> **Référence** : CDC §3.2.4, §3.3 ; Exigences EF-067 à EF-073  
> **Public** : Licenciés FFGym (348 000 licenciés) – accès navigateur, responsive tablette et mobile

---

## 1. Vue d'ensemble

L'**Espace licencié** a pour objectif de **faire exister la FFGym pour chaque licencié** et de mettre en avant l'histoire du licencié avec la gymnastique. Il doit être **accessible sur navigateur et totalement responsive** (tablette et mobile). Une **application dérivée** reprenant toutes les fonctionnalités de l'espace licencié doit être chiffrée et incluse dans la proposition commerciale (EF-068).

Les fonctionnalités sont organisées en **4 domaines** avec menus clairs et ergonomiques (EF-069).

---

## 2. Fonctionnalités détaillées

### 2.1 Attestation de licence

| Fonctionnalité | Description | Exigences |
|----------------|-------------|-----------|
| **Génération de l'attestation** | Visualisation / génération / téléchargement d'une attestation de licence en clic depuis le tableau de bord | EF-071 |
| **Contenu** | Nom, prénom, photo, date de naissance, n° licence, club, disciplines | EF-071 |
| **QR code** | Attestation avec **QR code** pour vérification d'authenticité (usage attendu : scan pour contrôle) | — |

---

### 2.2 Actus compétitions

| Fonctionnalité | Description | Exigences |
|----------------|-------------|-----------|
| **Calendrier de la saison pour le licencié** | Affichage du calendrier compétitif adapté à la/aux discipline(s) du licencié | EF-073 |
| **Calendrier zone (EngaGym)** | Calendrier compétitif de la zone | EF-073 |
| **TOP 12 GAM/GAF** | Accès aux informations TOP 12 (EngaGym) | EF-073 |
| **Finales nationales** | Finales nationales (EngaGym) | EF-073 |
| **Compétitions internationales et diffusion** | Compétitions européennes et mondiales (saisie manuelle par utilisateur national, avec lien de diffusion) | EF-073 |

---

### 2.3 Gestion du compte

| Fonctionnalité | Description | Exigences |
|----------------|-------------|-----------|
| **Création** | Création du compte licencié (contexte : première connexion ou processus de prise de licence / vérification) | — |
| **Mise à jour** | Modification par le licencié de toutes les données modifiables : contact (adresse, mail, téléphone), photo, nom d'usage, certificat médical | EF-070 |

---

### 2.4 Historique licencié

| Fonctionnalité | Description | Exigences |
|----------------|-------------|-----------|
| **Licences et clubs** | Historique des licences (saison, club, disciplines) | EF-072 |
| **Formation** | Diplômes Académie, diplômes pro, Open Badges | EF-072 |
| **Fonctions** | Fonctions (club, SD, siège) | EF-072 |
| **Compétitions** | Redirection ou interface résultats/palmarès | EF-072 |
| **Haut-niveau** | Listes, équipe de France, pôles | EF-072 |
| **Questions disciplinaires** | Consultation strictement confidentielle ; **utilisateurs autorisés uniquement** | EF-072 |

---

## 3. Synthèse par bloc fonctionnel

| Bloc | Fonctionnalités clés |
|------|----------------------|
| **Attestation** | Génération, téléchargement, contenu (identité, club, disciplines), QR code |
| **Actus compétitions** | Calendrier saison, zone EngaGym, TOP 12, finales nationales, compétitions internationales + diffusion |
| **Gestion du compte** | Création, mise à jour (contact, photo, nom d'usage, certificat médical) |
| **Historique** | Licences/clubs, formation, fonctions, compétitions, haut-niveau, questions disciplinaires |

---

## 4. Lien avec le POC

Le POC met en avant **KF-3** : Espace Licencié responsive avec attestation (dashboard, carte licence, génération attestation PDF, historique, profil).

Voir le [cahier des charges POC](poc_cahier_des_charges.md) pour les écrans et composants détaillés (dashboard licencié, attestation PDF, historique, profil).

---

*Document de référence pour le cahier des charges POC – FFGym Licence.*
