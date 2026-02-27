# Cahier des Charges du POC – FFGym Licence

> **Document de cadrage fonctionnel à destination de l'équipe UI/UX et du Développeur**  
> Projet : Réponse à la consultation 2026_01 – Refonte FFGym Licence

---

## 0. Vision globale du site et des espaces (référence AO)

Le périmètre fonctionnel de **FFGym Licence** (CDC §3) couvre **4 espaces** : une **page d'accueil** (point d'entrée public) et **3 espaces connectés** (Fédéral, Club, Licencié). La vision globale et le détail des fonctionnalités par espace sont décrits dans les fiches ci-dessous ; le présent cahier des charges fixe le **périmètre du POC** (démonstration ciblée) et les spécifications des écrans à réaliser.

### 0.1 Les 4 espaces et leurs fonctionnalités

| Espace | Public | Fonctionnalités principales | Fiche détaillée |
|--------|--------|-----------------------------|-----------------|
| **Page d'accueil** | Tous (visiteurs, futurs connectés) | Authentification (Fédéral / SD / Club / Licencié), Demande de contact (→ CR), Demande d'affiliation (formulaire dématérialisé, → CR, workflow de validation) | [Fiche Espace Page d'accueil](fiche_espace_page_accueil.md) |
| **Espace fédéral** | National, CR, CD | Suivi questions éthiques (honorabilité, disciplinaires) ; Suivi SD (gestion SD, espace documentaire, historique vie fédérale) ; Suivi admin/financier (situation structure/club, export comptable) ; Affiliation (planification, tarifs, messages, suivi demandes) ; Prise de licence (planification, tarifs, suivi mutations) ; Accompagnement des clubs (données clubs, échanges, suivi démarches) | [Fiche Espace Fédéral](fiche_espace_federal.md) |
| **Espace club** | Clubs affiliés (1 398 clubs) | Ré-affiliation (demande, paiement, suivi, attestation) ; Statistiques (stats licenciés, consultation, export PDF) ; Infos club (données statutaires, complémentaires, organigramme) ; Espace documentaire (dépôt, modification) ; Gestion des licenciés (création, renouvellement, décomptes, attestations, historique) | [Fiche Espace Club](fiche_espace_club.md) |
| **Espace licencié** | Licenciés (348 000) | Attestation de licence (génération, QR code) ; Actus compétitions (calendrier saison, EngaGym, internationales) ; Gestion du compte (création, mise à jour) ; Historique (licences/clubs, formation, fonctions, compétitions, haut-niveau, questions disciplinaires) | [Fiche Espace Licencié](fiche_espace_licencie.md) |

### 0.2 Schéma de navigation globale

```
                    ┌─────────────────────────┐
                    │   PAGE D'ACCUEIL        │
                    │   • Connexion           │
                    │   • Demande contact     │
                    │   • Demande affiliation │
                    └───────────┬─────────────┘
                                │
         ┌──────────────────────┼──────────────────────┐
         │                      │                      │
         ▼                      ▼                      ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ ESPACE FÉDÉRAL  │  │  ESPACE CLUB    │  │ ESPACE LICENCIÉ  │
│ (National/CR/CD)│  │  (Dirigeants)   │  │  (Licenciés)     │
│ • Éthique       │  │ • Ré-affiliation │  │ • Attestation    │
│ • SD            │  │ • Statistiques  │  │ • Actus compét.  │
│ • Admin/Financier│ │ • Infos club    │  │ • Compte         │
│ • Affiliation   │  │ • Documentaire  │  │ • Historique     │
│ • Prise licence │  │ • Licenciés    │  │                  │
│ • Accomp. clubs │  │                 │  │                  │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

Le **POC** démontre un sous-ensemble ciblé : **Page d'accueil** (connexion simulée), **Espace Club** (dashboard, gestion licenciés, contrôle doublons) et **Espace Licencié** (dashboard responsive, attestation PDF, historique, profil). L’**Espace fédéral** est hors périmètre du POC.

---

## 1. Vision et Périmètre du POC

### 1.1 Objectif stratégique

Le cahier des charges de la FFGym exige **« 1 maquette de l'un des espaces connectés au choix »** attestant de **« la compréhension des besoins et de la capacité à concevoir une IHM ergonomique et claire »** (CDC §Éléments à transmettre).

**Notre stratégie** : remplacer les maquettes statiques classiques par un **POC interactif fonctionnel**. Ce POC créera un effet "Wahou" différenciant lors de la soutenance du 20 mars 2026, démontrant concrètement notre maîtrise technique et notre compréhension métier.

Le périmètre fonctionnel complet des 4 espaces (aligné sur l’appel d’offre et les exigences d’analyse) est décrit dans les **fiches par espace** (§0.1) et dans le document [02_ANALYSE/02_exigences_fonctionnelles.md](../02_ANALYSE/02_exigences_fonctionnelles.md).

### 1.2 Fonctionnalités retenues (Killer Features)

Après analyse croisée du cahier des charges, des 145 exigences fonctionnelles et de notre réponse technique, **3 fonctionnalités clés** ont été sélectionnées :

| # | Killer Feature | Espace | Justification stratégique |
|---|----------------|--------|---------------------------|
| **KF-1** | **Dashboard Club & Gestion des licenciés** | Espace Club | Répond à l'axe stratégique "Se rapprocher des clubs" – 1 398 clubs utilisent cet espace quotidiennement. Démontre notre capacité à concevoir une IHM métier riche et ergonomique. |
| **KF-2** | **Parcours de prise de licence** (sans outil club) | Espace Club | Processus critique (348 000 licenciés). Montre notre maîtrise du contrôle des doublons (Soundex/Levenshtein) et des workflows métier complexes. |
| **KF-3** | **Espace Licencié responsive** avec attestation | Espace Licencié | Répond à l'enjeu "faire exister la FFGym pour chaque licencié". Démontre notre expertise UI responsive et l'accessibilité RGAA. |

### 1.3 Périmètre exclu (hors POC)

Pour garantir la faisabilité en quelques jours :

- ❌ Authentification réelle (simulée par un écran de connexion statique)
- ❌ Espace fédéral (back-office complexe) — voir [Fiche Espace Fédéral](fiche_espace_federal.md) pour le périmètre cible
- ❌ E-paiement (parcours LemonWay)
- ❌ Gestion des droits et utilisateurs
- ❌ Intégrations API (outils clubs, DataGym, Agate)
- ❌ Formulaires de saisie complets (affiliation, ré-affiliation, demande de contact)

Les besoins complets (page d'accueil, fédéral, club, licencié) sont couverts par les fiches fonctionnelles par espace (§0.1).

---

## 2. Parcours Utilisateur (User Journey)

### 2.1 Scénario de démonstration

Le POC sera présenté selon un **scénario narratif guidé** lors de la soutenance. L'acheteur (Comité de Pilotage SI) vivra l'expérience suivante :

---

#### 🎯 PARCOURS A – Espace Club (KF-1 + KF-2)

> *« Vous êtes Marie Dupont, présidente du club "Gym'Étoiles Paris 15". Vous vous connectez à FFGym Licence pour gérer votre saison 2027. »*

| Étape | Action utilisateur | Écran / Composant | Résultat attendu |
|:-----:|---------------------|-------------------|------------------|
| **A1** | Arrivée sur la page d'accueil | `Page d'accueil` | Affichage de la page d'accueil FFGym Licence avec accès connexion |
| **A2** | Clic sur "Se connecter" | `Page d'accueil` | Ouverture de la modale de connexion |
| **A3** | Saisie des identifiants (simulé) | `Modale Connexion` | Connexion simulée, redirection vers l'espace club |
| **A4** | Atterrissage sur le tableau de bord | `Dashboard Club` | Affichage du dashboard avec KPIs, alertes et actions rapides |
| **A5** | Consultation des statistiques | `Dashboard Club` | Widget DataGym embedded (simulé) avec données du club |
| **A6** | Clic sur "Gérer les licenciés" | `Dashboard Club` | Navigation vers la liste des licenciés |
| **A7** | Consultation de la liste des licenciés | `Liste Licenciés` | Tableau paginé, filtrable, triable avec statuts de licence |
| **A8** | Clic sur "Nouvelle licence" | `Liste Licenciés` | Ouverture du formulaire de création de pré-licence |
| **A9** | Saisie d'une nouvelle pré-licence | `Formulaire Pré-licence` | Saisie nom, prénom, date de naissance, email, discipline |
| **A10** | Validation de la saisie | `Formulaire Pré-licence` | **Déclenchement du contrôle de doublons** |
| **A11** | Affichage d'un doublon détecté | `Modale Doublon` | Proposition des 4 options : mutation, licence secondaire, renouvellement, invalider |
| **A12** | Choix de l'option "Confirmer nouvelle licence" | `Modale Doublon` | Retour à la liste avec pré-licence ajoutée |

---

#### 🎯 PARCOURS B – Espace Licencié (KF-3)

> *« Vous êtes Lucas Martin, 14 ans, licencié au club Gym'Étoiles. Vous accédez à votre espace personnel depuis votre smartphone. »*

| Étape | Action utilisateur | Écran / Composant | Résultat attendu |
|:-----:|---------------------|-------------------|------------------|
| **B1** | Arrivée sur la page d'accueil (mobile) | `Page d'accueil (responsive)` | Design adapté mobile |
| **B2** | Connexion (simulée) | `Modale Connexion` | Redirection vers l'espace licencié |
| **B3** | Atterrissage sur le tableau de bord licencié | `Dashboard Licencié` | Affichage carte licence, infos club, actions rapides |
| **B4** | Clic sur "Télécharger mon attestation" | `Dashboard Licencié` | **Génération et téléchargement de l'attestation PDF** |
| **B5** | Navigation vers "Mon historique" | `Menu Licencié` | Affichage de l'historique des saisons |
| **B6** | Consultation de l'historique | `Historique Licencié` | Timeline des licences, clubs, disciplines |
| **B7** | Navigation vers "Mon profil" | `Menu Licencié` | Affichage des données personnelles |
| **B8** | Consultation du profil | `Profil Licencié` | Données modifiables, photo, certificat médical |

---

## 3. Cartographie des Écrans et Composants

### 3.1 Arborescence des écrans

> Pour la vision complète des 4 espaces et des fonctionnalités, voir **§0** et les fiches [Page d'accueil](fiche_espace_page_accueil.md), [Fédéral](fiche_espace_federal.md), [Club](fiche_espace_club.md), [Licencié](fiche_espace_licencie.md).

```
📱 POC FFGym Licence
│
├── 🏠 Page d'accueil
│   ├── Header (logo FFGym, navigation)
│   ├── Hero section (accroche, visuels gymnastique)
│   ├── Bouton "Se connecter"
│   └── Modale de connexion (simulée)
│
├── 🏢 ESPACE CLUB
│   │
│   ├── 📊 Dashboard Club
│   │   ├── Header Club (nom club, saison, statut affiliation)
│   │   ├── Barre de navigation club
│   │   ├── Zone KPIs (4 cartes)
│   │   ├── Zone Alertes/Actions urgentes
│   │   ├── Widget Statistiques DataGym (simulé)
│   │   └── Actions rapides
│   │
│   └── 👥 Gestion des licenciés
│       ├── Liste des licenciés (tableau)
│       │   ├── En-tête avec recherche et filtres
│       │   ├── Tableau paginé
│       │   └── Actions par ligne
│       ├── Formulaire Nouvelle pré-licence
│       └── Modale Contrôle doublons
│
└── 👤 ESPACE LICENCIÉ (responsive mobile)
    │
    ├── 📊 Dashboard Licencié
    │   ├── Header profil (photo, nom, n° licence)
    │   ├── Carte licence numérique
    │   ├── Infos club actuel
    │   ├── Actions rapides (attestation, profil)
    │   └── Actualités compétitives (carrousel)
    │
    ├── 📜 Historique
    │   └── Timeline des saisons/licences
    │
    └── 👤 Profil
        ├── Données personnelles
        ├── Photo
        └── Certificat médical
```

---

### 3.2 Spécifications détaillées par écran

---

#### 📄 **PAGE D'ACCUEIL**

| Composant | Description | Données affichées | Interactions |
|-----------|-------------|-------------------|--------------|
| **Header** | Bandeau supérieur fixe | Logo FFGym, liens "À propos", "Contact" | Navigation |
| **Hero section** | Zone d'accroche principale | Titre "FFGym Licence", baseline, visuel gym | Aucune |
| **Bouton Connexion** | CTA principal | "Se connecter" | Ouvre modale connexion |
| **Footer** | Pied de page | Mentions légales, réseaux sociaux | Liens externes |

**Modale de connexion (simulée)** :
- Champ "Email ou n° de licence"
- Champ "Mot de passe" (masqué)
- Bouton "Se connecter" → Redirection vers Espace Club ou Espace Licencié selon le scénario

---

#### 📊 **DASHBOARD CLUB**

| Composant | Description | Données affichées | Interactions |
|-----------|-------------|-------------------|--------------|
| **Header Club** | Identification du club | Nom club, n° affiliation, saison "2026-2027", badge statut "Affilié ✓" | Aucune |
| **Navigation Club** | Menu horizontal | Onglets : Tableau de bord, Licenciés, Documents, Ré-affiliation | Navigation onglets |
| **KPI Card 1** | Licenciés actifs | "247 licenciés" + évolution vs saison précédente | Clic → Liste licenciés |
| **KPI Card 2** | Licences en attente | "12 pré-licences" | Clic → Liste filtrée |
| **KPI Card 3** | Statut affiliation | "Affilié pour 2026-2027" | Aucune |
| **KPI Card 4** | Décompte en cours | "1 850,00 €" + statut "À valider" | Clic → Détail décompte (simulé) |
| **Zone Alertes** | Bloc d'alertes contextuelles | Messages type "3 certificats médicaux expirent dans 30j", "Ré-affiliation ouverte" | Clic → Action |
| **Widget DataGym** | Rapport statistique embedded | Graphique (simulé) : répartition par discipline, évolution 3 ans | Aucune (visuel statique) |
| **Actions rapides** | Boutons CTA | "Nouvelle licence", "Ré-affiliation", "Documents" | Navigation |

---

#### 👥 **LISTE DES LICENCIÉS**

| Composant | Description | Données affichées | Interactions |
|-----------|-------------|-------------------|--------------|
| **Barre de recherche** | Recherche textuelle | Placeholder "Rechercher par nom, prénom ou n° licence" | Filtre en temps réel |
| **Filtres** | Filtres combinables | Discipline (dropdown), Statut (valide, en attente, expiré), Fonction (pratiquant, encadrant, dirigeant) | Appliquer/Réinitialiser |
| **Bouton "Nouvelle licence"** | CTA principal | "+ Nouvelle licence" | Ouvre formulaire |
| **Tableau** | Liste paginée | Colonnes : N° licence, Nom, Prénom, Date naiss., Discipline, Statut, Fonction, Actions | Tri par colonne |
| **Actions par ligne** | Menu contextuel | "Voir", "Modifier", "Renouveler" | Ouverture modale/page |
| **Pagination** | Navigation pages | "1-20 sur 247" + boutons Précédent/Suivant | Changement de page |

**États des statuts** :
- 🟢 **Valide** : Licence payée et active
- 🟡 **En attente** : Pré-licence créée, décompte non validé
- 🔴 **Expiré** : Licence de la saison précédente non renouvelée

---

#### 📝 **FORMULAIRE NOUVELLE PRÉ-LICENCE**

| Composant | Description | Données saisies | Interactions |
|-----------|-------------|-----------------|--------------|
| **Champ Nom** | Texte obligatoire | Nom de famille | Validation format |
| **Champ Prénom** | Texte obligatoire | Prénom | Validation format |
| **Champ Date de naissance** | Date picker obligatoire | JJ/MM/AAAA | Sélection date |
| **Champ Email** | Email obligatoire | adresse@email.com | Validation email |
| **Dropdown Discipline** | Sélection obligatoire | GAM, GAF, GR, Trampoline, Aérobic, TeamGym, Parkour | Sélection unique |
| **Dropdown Fonction** | Sélection facultative | Pratiquant, Encadrant, Dirigeant | Sélection unique |
| **Bouton Annuler** | Secondaire | - | Retour liste |
| **Bouton Valider** | Principal | - | **Déclenche contrôle doublons** |

---

#### ⚠️ **MODALE CONTRÔLE DOUBLONS**

> Affichée lorsqu'un doublon potentiel est détecté (similarité nom/prénom + date de naissance identique)

| Composant | Description | Données affichées | Interactions |
|-----------|-------------|-------------------|--------------|
| **Titre** | Alerte | "⚠️ Doublon potentiel détecté" | Aucune |
| **Descriptif** | Explication | "Un licencié similaire existe déjà dans la base FFGym" | Aucune |
| **Carte doublon** | Fiche résumée | N° licence, Nom, Prénom, Date naiss., Club actuel, Statut | Aucune |
| **Option 1** | Bouton | "Créer une mutation" (si club différent) | Ferme modale + message |
| **Option 2** | Bouton | "Créer une licence secondaire" | Ferme modale + message |
| **Option 3** | Bouton | "Renouveler cette licence" (si même club) | Ferme modale + message |
| **Option 4** | Bouton secondaire | "Ce n'est pas la même personne, créer quand même" | Ajoute pré-licence |
| **Bouton Annuler** | Tertiaire | "Annuler" | Ferme modale |

---

#### 📱 **DASHBOARD LICENCIÉ (Responsive Mobile)**

| Composant | Description | Données affichées | Interactions |
|-----------|-------------|-------------------|--------------|
| **Header profil** | Bandeau identité | Photo, Prénom Nom, N° licence | Aucune |
| **Carte licence** | Licence numérique visuelle | Design carte : photo, nom, n° licence, club, disciplines, validité | Aucune |
| **Bouton Attestation** | CTA principal | "📄 Télécharger mon attestation" | **Génère PDF** |
| **Info club** | Bloc club actuel | Logo club, Nom club, Ville | Aucune |
| **Actions rapides** | Boutons secondaires | "Mon profil", "Mon historique", "Mes compétitions" | Navigation |
| **Carrousel actualités** | Bloc dynamique | Prochaines compétitions zone (EngaGym simulé) | Swipe / Clic |

---

#### 📜 **HISTORIQUE LICENCIÉ**

| Composant | Description | Données affichées | Interactions |
|-----------|-------------|-------------------|--------------|
| **Timeline** | Frise chronologique verticale | Liste des saisons avec : année, club, discipline(s), statut | Aucune |
| **Carte saison** | Détail par saison | Saison "2025-2026", Club "Gym'Étoiles Paris 15", Disciplines "GAM", Badge "Validé" | Aucune |
| **Section Formation** | Bloc diplômes | Diplômes Académie, Open Badges (si applicable) | Aucune |
| **Section Compétitions** | Bloc résultats | Palmarès synthétique (simulé) | Aucune |

---

#### 👤 **PROFIL LICENCIÉ**

| Composant | Description | Données affichées | Interactions |
|-----------|-------------|-------------------|--------------|
| **Photo** | Avatar modifiable | Photo de profil | Bouton "Modifier" (désactivé dans POC) |
| **Données personnelles** | Formulaire lecture seule | Nom, Prénom, Date de naissance, Email, Téléphone, Adresse | Boutons "Modifier" (désactivés) |
| **Certificat médical** | Statut document | Date de validité, bouton "Téléverser" | Bouton désactivé |
| **Club actuel** | Info club | Nom club, Fonction dans le club | Aucune |

---

## 4. Modèle de Données (JSON)

Les données ci-dessous sont prêtes à être injectées dans l'application front-end. Elles utilisent le **vocabulaire exact du métier FFGym**.

---

### 4.1 Données du Club (Gym'Étoiles Paris 15)

```json
{
  "club": {
    "id": "CLB-75015-042",
    "numeroAffiliation": "IDF-75-042",
    "nom": "Gym'Étoiles Paris 15",
    "siret": "52845796300012",
    "adresse": {
      "rue": "12 rue de la Convention",
      "codePostal": "75015",
      "ville": "Paris"
    },
    "disciplines": ["GAM", "GAF", "GR", "Éveil Gym"],
    "saison": "2026-2027",
    "statutAffiliation": "affilié",
    "dateAffiliation": "2026-09-01",
    "comiteRegional": "Île-de-France",
    "comiteDepartemental": "Paris",
    "dirigeants": {
      "president": {
        "nom": "Dupont",
        "prenom": "Marie",
        "email": "m.dupont@gymetoiles.fr",
        "numeroLicence": "2024-IDF-123456"
      },
      "tresorier": {
        "nom": "Lefevre",
        "prenom": "Pierre",
        "email": "p.lefevre@gymetoiles.fr",
        "numeroLicence": "2024-IDF-123457"
      },
      "secretaireGeneral": {
        "nom": "Bernard",
        "prenom": "Sophie",
        "email": "s.bernard@gymetoiles.fr",
        "numeroLicence": "2024-IDF-123458"
      }
    },
    "statistiques": {
      "nombreLicencies": 247,
      "nombreLicenciesSaisonPrecedente": 231,
      "repartitionDisciplines": {
        "GAM": 68,
        "GAF": 102,
        "GR": 45,
        "Éveil Gym": 32
      },
      "preLicencesEnAttente": 12,
      "decompteEnCours": {
        "montant": 1850.00,
        "statut": "en_attente_validation_cr",
        "nombreLicences": 15
      }
    }
  }
}
```

---

### 4.2 Liste des Licenciés (échantillon)

```json
{
  "licencies": [
    {
      "id": "LIC-2027-000001",
      "numeroLicence": "2027-IDF-100001",
      "nom": "Martin",
      "prenom": "Lucas",
      "dateNaissance": "2012-03-15",
      "email": "lucas.martin@email.fr",
      "telephone": "06 12 34 56 78",
      "adresse": {
        "rue": "45 avenue Victor Hugo",
        "codePostal": "75016",
        "ville": "Paris"
      },
      "photo": "/assets/licencies/lucas_martin.jpg",
      "disciplinePrincipale": "GAM",
      "disciplineSecondaire": null,
      "fonction": "pratiquant",
      "statut": "valide",
      "saison": "2026-2027",
      "certificatMedical": {
        "dateValidite": "2027-09-01",
        "statut": "valide"
      },
      "historique": [
        { "saison": "2025-2026", "club": "Gym'Étoiles Paris 15", "discipline": "GAM", "statut": "validé" },
        { "saison": "2024-2025", "club": "Gym'Étoiles Paris 15", "discipline": "GAM", "statut": "validé" },
        { "saison": "2023-2024", "club": "Gym'Étoiles Paris 15", "discipline": "Éveil Gym", "statut": "validé" }
      ]
    },
    {
      "id": "LIC-2027-000002",
      "numeroLicence": "2027-IDF-100002",
      "nom": "Petit",
      "prenom": "Emma",
      "dateNaissance": "2010-07-22",
      "email": "emma.petit@email.fr",
      "telephone": "06 98 76 54 32",
      "adresse": {
        "rue": "8 rue du Commerce",
        "codePostal": "75015",
        "ville": "Paris"
      },
      "photo": "/assets/licencies/emma_petit.jpg",
      "disciplinePrincipale": "GAF",
      "disciplineSecondaire": "GR",
      "fonction": "pratiquant",
      "statut": "valide",
      "saison": "2026-2027",
      "certificatMedical": {
        "dateValidite": "2027-06-15",
        "statut": "valide"
      },
      "historique": [
        { "saison": "2025-2026", "club": "Gym'Étoiles Paris 15", "discipline": "GAF", "statut": "validé" },
        { "saison": "2024-2025", "club": "US Ivry Gym", "discipline": "GAF", "statut": "validé" }
      ]
    },
    {
      "id": "LIC-2027-000003",
      "numeroLicence": "2027-IDF-100003",
      "nom": "Dubois",
      "prenom": "Thomas",
      "dateNaissance": "2008-11-03",
      "email": "thomas.dubois@email.fr",
      "telephone": "07 11 22 33 44",
      "adresse": {
        "rue": "22 boulevard Pasteur",
        "codePostal": "75015",
        "ville": "Paris"
      },
      "photo": "/assets/licencies/thomas_dubois.jpg",
      "disciplinePrincipale": "GAM",
      "disciplineSecondaire": "Trampoline",
      "fonction": "pratiquant",
      "statut": "valide",
      "saison": "2026-2027",
      "certificatMedical": {
        "dateValidite": "2027-09-01",
        "statut": "valide"
      },
      "historique": [
        { "saison": "2025-2026", "club": "Gym'Étoiles Paris 15", "discipline": "GAM", "statut": "validé" },
        { "saison": "2024-2025", "club": "Gym'Étoiles Paris 15", "discipline": "GAM", "statut": "validé" },
        { "saison": "2023-2024", "club": "Gym'Étoiles Paris 15", "discipline": "GAM", "statut": "validé" },
        { "saison": "2022-2023", "club": "Gym'Étoiles Paris 15", "discipline": "GAM", "statut": "validé" }
      ]
    },
    {
      "id": "LIC-2027-000004",
      "numeroLicence": "2027-IDF-100004",
      "nom": "Moreau",
      "prenom": "Chloé",
      "dateNaissance": "2014-05-18",
      "email": "chloe.moreau@email.fr",
      "telephone": "06 55 44 33 22",
      "adresse": {
        "rue": "3 rue Lecourbe",
        "codePostal": "75015",
        "ville": "Paris"
      },
      "photo": "/assets/licencies/chloe_moreau.jpg",
      "disciplinePrincipale": "GR",
      "disciplineSecondaire": null,
      "fonction": "pratiquant",
      "statut": "en_attente",
      "saison": "2026-2027",
      "certificatMedical": {
        "dateValidite": null,
        "statut": "manquant"
      },
      "historique": []
    },
    {
      "id": "LIC-2027-000005",
      "numeroLicence": "2027-IDF-100005",
      "nom": "Garcia",
      "prenom": "Antoine",
      "dateNaissance": "1985-02-28",
      "email": "antoine.garcia@email.fr",
      "telephone": "06 77 88 99 00",
      "adresse": {
        "rue": "17 rue de Vaugirard",
        "codePostal": "75015",
        "ville": "Paris"
      },
      "photo": "/assets/licencies/antoine_garcia.jpg",
      "disciplinePrincipale": "GAM",
      "disciplineSecondaire": null,
      "fonction": "encadrant",
      "statut": "valide",
      "saison": "2026-2027",
      "certificatMedical": {
        "dateValidite": "2027-09-01",
        "statut": "valide"
      },
      "diplomes": [
        { "type": "CQP", "intitule": "Animateur de Loisirs Sportifs - Activités Gymniques", "dateObtention": "2018-06-15" },
        { "type": "Fédéral", "intitule": "Moniteur Fédéral GAM Niveau 2", "dateObtention": "2020-03-10" }
      ],
      "historique": [
        { "saison": "2025-2026", "club": "Gym'Étoiles Paris 15", "discipline": "GAM", "fonction": "encadrant", "statut": "validé" },
        { "saison": "2024-2025", "club": "Gym'Étoiles Paris 15", "discipline": "GAM", "fonction": "encadrant", "statut": "validé" }
      ]
    },
    {
      "id": "LIC-2027-000006",
      "numeroLicence": null,
      "nom": "Rousseau",
      "prenom": "Léa",
      "dateNaissance": "2015-09-10",
      "email": "lea.rousseau@email.fr",
      "telephone": "06 11 22 33 44",
      "adresse": {
        "rue": "9 rue Cambronne",
        "codePostal": "75015",
        "ville": "Paris"
      },
      "photo": null,
      "disciplinePrincipale": "Éveil Gym",
      "disciplineSecondaire": null,
      "fonction": "pratiquant",
      "statut": "pre_licence",
      "saison": "2026-2027",
      "certificatMedical": {
        "dateValidite": null,
        "statut": "manquant"
      },
      "historique": []
    },
    {
      "id": "LIC-2025-EXPIRE",
      "numeroLicence": "2025-IDF-098765",
      "nom": "Leroy",
      "prenom": "Maxime",
      "dateNaissance": "2011-12-05",
      "email": "maxime.leroy@email.fr",
      "telephone": "06 99 88 77 66",
      "adresse": {
        "rue": "28 rue de la Croix-Nivert",
        "codePostal": "75015",
        "ville": "Paris"
      },
      "photo": "/assets/licencies/maxime_leroy.jpg",
      "disciplinePrincipale": "GAM",
      "disciplineSecondaire": null,
      "fonction": "pratiquant",
      "statut": "expire",
      "saison": "2025-2026",
      "certificatMedical": {
        "dateValidite": "2026-09-01",
        "statut": "expiré"
      },
      "historique": [
        { "saison": "2025-2026", "club": "Gym'Étoiles Paris 15", "discipline": "GAM", "statut": "validé" },
        { "saison": "2024-2025", "club": "Gym'Étoiles Paris 15", "discipline": "GAM", "statut": "validé" }
      ]
    }
  ]
}
```

---

### 4.3 Données pour le contrôle de doublons (scénario)

```json
{
  "preLicenceSaisie": {
    "nom": "Martin",
    "prenom": "Luca",
    "dateNaissance": "2012-03-15",
    "email": "luca.martin.new@email.fr",
    "disciplinePrincipale": "GAM"
  },
  "doublonDetecte": {
    "score": 0.92,
    "raison": "Similarité phonétique (Soundex) sur nom/prénom + date de naissance identique",
    "licencieExistant": {
      "numeroLicence": "2027-IDF-100001",
      "nom": "Martin",
      "prenom": "Lucas",
      "dateNaissance": "2012-03-15",
      "clubActuel": "Gym'Étoiles Paris 15",
      "disciplinePrincipale": "GAM",
      "statut": "valide"
    }
  },
  "optionsProposees": [
    {
      "id": "mutation",
      "label": "Créer une mutation",
      "description": "Ce licencié rejoindra votre club (nécessite validation régionale)",
      "disponible": false,
      "raison": "Le licencié est déjà dans votre club"
    },
    {
      "id": "licence_secondaire",
      "label": "Créer une licence secondaire",
      "description": "Le licencié sera rattaché à un second club",
      "disponible": true
    },
    {
      "id": "renouvellement",
      "label": "Renouveler cette licence",
      "description": "Renouveler la licence existante pour la saison 2026-2027",
      "disponible": true
    },
    {
      "id": "invalider_doublon",
      "label": "Ce n'est pas la même personne",
      "description": "Confirmer la création malgré la similarité",
      "disponible": true
    }
  ]
}
```

---

### 4.4 Données de l'Espace Licencié (Lucas Martin)

```json
{
  "licencie": {
    "id": "LIC-2027-000001",
    "numeroLicence": "2027-IDF-100001",
    "nom": "Martin",
    "prenom": "Lucas",
    "dateNaissance": "2012-03-15",
    "age": 14,
    "email": "lucas.martin@email.fr",
    "telephone": "06 12 34 56 78",
    "adresse": {
      "rue": "45 avenue Victor Hugo",
      "codePostal": "75016",
      "ville": "Paris"
    },
    "photo": "/assets/licencies/lucas_martin.jpg",
    "club": {
      "nom": "Gym'Étoiles Paris 15",
      "ville": "Paris",
      "logo": "/assets/clubs/gym_etoiles.png"
    },
    "licence": {
      "saison": "2026-2027",
      "statut": "valide",
      "dateValidite": "2027-08-31",
      "disciplinePrincipale": "GAM",
      "disciplineSecondaire": null,
      "fonction": "pratiquant"
    },
    "certificatMedical": {
      "dateValidite": "2027-09-01",
      "statut": "valide"
    },
    "historique": [
      {
        "saison": "2025-2026",
        "club": { "nom": "Gym'Étoiles Paris 15", "ville": "Paris" },
        "discipline": "GAM",
        "fonction": "pratiquant",
        "statut": "validé"
      },
      {
        "saison": "2024-2025",
        "club": { "nom": "Gym'Étoiles Paris 15", "ville": "Paris" },
        "discipline": "GAM",
        "fonction": "pratiquant",
        "statut": "validé"
      },
      {
        "saison": "2023-2024",
        "club": { "nom": "Gym'Étoiles Paris 15", "ville": "Paris" },
        "discipline": "Éveil Gym",
        "fonction": "pratiquant",
        "statut": "validé"
      }
    ],
    "competition": {
      "niveau": "Départemental",
      "prochaines": [
        {
          "nom": "Championnat Départemental GAM",
          "date": "2027-02-15",
          "lieu": "Gymnase Pierre de Coubertin, Paris",
          "agres": ["Sol", "Arçons", "Anneaux", "Saut", "Barres Parallèles", "Barre Fixe"]
        },
        {
          "nom": "Interclubs Paris Sud",
          "date": "2027-03-22",
          "lieu": "Complexe sportif Émile Anthoine, Paris 15e",
          "agres": ["Sol", "Saut", "Barres Parallèles", "Barre Fixe"]
        }
      ],
      "resultats": [
        {
          "nom": "Championnat Départemental GAM 2026",
          "date": "2026-02-10",
          "classement": "3e",
          "categorie": "Benjamin"
        }
      ]
    },
    "formation": [],
    "badges": []
  }
}
```

---

### 4.5 Alertes du Dashboard Club

```json
{
  "alertes": [
    {
      "id": "ALT-001",
      "type": "warning",
      "priorite": "haute",
      "titre": "Certificats médicaux à renouveler",
      "message": "3 certificats médicaux expirent dans les 30 prochains jours",
      "action": {
        "label": "Voir les licenciés concernés",
        "route": "/club/licencies?filtre=certificat_expire_bientot"
      },
      "date": "2027-01-15"
    },
    {
      "id": "ALT-002",
      "type": "info",
      "priorite": "moyenne",
      "titre": "Ré-affiliation ouverte",
      "message": "La ré-affiliation pour la saison 2027-2028 est ouverte depuis le 1er juillet",
      "action": {
        "label": "Démarrer la ré-affiliation",
        "route": "/club/reaffiliation"
      },
      "date": "2027-07-01"
    },
    {
      "id": "ALT-003",
      "type": "success",
      "priorite": "basse",
      "titre": "Décompte validé",
      "message": "Votre décompte #DC-2027-042 a été validé par le Comité Régional",
      "action": {
        "label": "Voir le décompte",
        "route": "/club/decomptes/DC-2027-042"
      },
      "date": "2027-01-10"
    }
  ]
}
```

---

### 4.6 Disciplines FFGym (référentiel)

```json
{
  "disciplines": [
    { "code": "GAM", "libelle": "Gymnastique Artistique Masculine", "abreviation": "GAM" },
    { "code": "GAF", "libelle": "Gymnastique Artistique Féminine", "abreviation": "GAF" },
    { "code": "GR", "libelle": "Gymnastique Rythmique", "abreviation": "GR" },
    { "code": "TRA", "libelle": "Trampoline", "abreviation": "Trampoline" },
    { "code": "AER", "libelle": "Aérobic", "abreviation": "Aérobic" },
    { "code": "TG", "libelle": "TeamGym", "abreviation": "TeamGym" },
    { "code": "PKR", "libelle": "Parkour", "abreviation": "Parkour" },
    { "code": "GPT", "libelle": "Gym Pour Tous", "abreviation": "GPT" },
    { "code": "EG", "libelle": "Éveil Gymnique", "abreviation": "Éveil Gym" },
    { "code": "ACR", "libelle": "Acrobatie", "abreviation": "Acrobatie" }
  ]
}
```

---

### 4.7 Attestation de licence (données pour PDF)

```json
{
  "attestation": {
    "titre": "ATTESTATION DE LICENCE",
    "sousTitre": "Fédération Française de Gymnastique",
    "saison": "2026-2027",
    "dateGeneration": "2027-01-20",
    "licencie": {
      "photo": "/assets/licencies/lucas_martin.jpg",
      "nom": "MARTIN",
      "prenom": "Lucas",
      "dateNaissance": "15/03/2012",
      "numeroLicence": "2027-IDF-100001"
    },
    "club": {
      "nom": "Gym'Étoiles Paris 15",
      "numeroAffiliation": "IDF-75-042",
      "ville": "Paris"
    },
    "disciplines": ["Gymnastique Artistique Masculine"],
    "validite": {
      "du": "01/09/2026",
      "au": "31/08/2027"
    },
    "assurance": {
      "compagnie": "MMA Sports",
      "numeroContrat": "120.987.654",
      "type": "Individuelle Accident"
    },
    "qrCode": {
      "data": "https://ffgym.fr/licence/verify/2027-IDF-100001",
      "description": "Scanner pour vérifier l'authenticité"
    },
    "footer": {
      "adresse": "Fédération Française de Gymnastique - 7 ter, Cour des Petites Écuries - 75010 Paris",
      "contact": "www.ffgym.fr"
    }
  }
}
```

---

## 5. Notes pour l'équipe de réalisation

### 5.1 Priorités de développement

| Priorité | Écran / Composant | Justification |
|:--------:|-------------------|---------------|
| **P0** | Dashboard Club + KPIs | Premier écran visible, impact immédiat |
| **P0** | Liste Licenciés (tableau) | Fonctionnalité critique |
| **P0** | Modale Doublons | Différenciateur technique |
| **P1** | Dashboard Licencié (mobile) | Démontre responsive |
| **P1** | Génération Attestation | Effet "Wahou" concret |
| **P2** | Historique Licencié | Complément UX |
| **P2** | Page d'accueil | Habillage nécessaire |

### 5.2 Charte graphique

Le POC doit respecter la **charte FFGym** :
- **Couleur primaire** : Bleu FFGym (#003DA5)
- **Couleur secondaire** : Or (#FFD100)
- **Typographie** : À définir (privilégier une police lisible, accessible)
- **Logo** : Logo officiel FFGym

> Voir le fichier `poc_design_system.md` pour les spécifications UI détaillées.

### 5.3 Points d'attention RGAA

- Contrastes suffisants (ratio 4.5:1 minimum)
- Navigation au clavier fonctionnelle
- Labels explicites sur tous les champs
- Alternatives textuelles sur les visuels
- Focus visible sur tous les éléments interactifs

### 5.4 Environnement technique recommandé

| Élément | Recommandation |
|---------|----------------|
| Framework front | **Angular** ou **React** (cohérence avec réponse technique) |
| Style | Tailwind CSS ou composants PrimeNG/Material |
| Mock API | JSON statique ou JSON Server |
| PDF | jsPDF ou équivalent côté client |
| Hébergement démo | Vercel / Netlify (gratuit, rapide) |

---

## 6. Checklist de validation

Avant la soutenance du **20 mars 2026**, le POC devra être validé sur les critères suivants :

| # | Critère | Validé |
|---|---------|:------:|
| 1 | Les 3 Killer Features sont fonctionnelles | ☐ |
| 2 | Le parcours de démonstration (A + B) est fluide | ☐ |
| 3 | Les données affichées utilisent le vocabulaire FFGym | ☐ |
| 4 | Le responsive mobile est fonctionnel | ☐ |
| 5 | L'attestation PDF est générée et téléchargeable | ☐ |
| 6 | La modale de doublons affiche les 4 options | ☐ |
| 7 | Le design respecte la charte FFGym | ☐ |
| 8 | Aucun "Lorem Ipsum" visible | ☐ |
| 9 | Le temps de chargement est instantané | ☐ |
| 10 | Le POC est déployé et accessible via URL | ☐ |

---

*Document rédigé le 20/02/2026 – Version 1.0*
