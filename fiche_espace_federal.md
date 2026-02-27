# Fiche fonctionnelle – Espace fédéral

> **Référence** : CDC §3.2.2, §3.3 ; Exigences EF-018 à EF-021, EF-022 à EF-031, EF-074 à EF-095  
> **Public** : Utilisateurs nationaux, Comités régionaux (CR), Comités départementaux (CD)

---

## 1. Vue d'ensemble

L'**Espace fédéral** est le back-office FFGym Licence. L'accès est **cloisonné selon le niveau territorial** (RGPD) : un utilisateur CR/CD n'accède qu'aux données de sa région ou son département ; les utilisateurs nationaux ont accès à l'ensemble du territoire. Un utilisateur peut cumuler des fonctions dans plusieurs structures (ex. présidente CR + V-P national).

---

## 2. Fonctionnalités détaillées

### 2.1 Suivi des questions éthiques

| Fonctionnalité | Description | Exigences |
|----------------|-------------|-----------|
| **Contrôle d'honorabilité** | Transmission des identités (dirigeants et encadrants siège, SD, clubs) vers l'API Ministère (honorabilite-depose.social.gouv.fr) ; gestion des retours (erreur, AIA) ; suivi au niveau club, CR et siège | EF-080 à EF-083 |
| **Suivi des décisions disciplinaires** | Historique des questions disciplinaires sur la fiche licencié (confidentiel) ; consultation, création d'objet « question disciplinaire » (nom, dates, objet, type procédure, implication, issue, procédures connexes) | EF-087 |
| **Gestion des radiations** | Réservée au niveau national (service juridique) ; consultation historique, indication nouvelle radiation (dates, origine : Commission disciplinaire, décision de justice, autre) ; impacts : annulation licence, blocage compte, impossibilité de renouveler | EF-084 à EF-086 |

---

### 2.2 Suivi des Structures Déconcentrées (SD)

| Fonctionnalité | Description | Exigences |
|----------------|-------------|-----------|
| **Gestion des SD** | Administration des SD : nom, gouvernance (président, trésorier, secrétaire), zone(s) géographique(s) ; toute modification de gouvernance avec téléversement du PV d'AG | EF-088 |
| **Référentiel géographique** | Maintien d'un référentiel géographique (découpage territorial France) distinct du référentiel des SD | EF-089 |
| **Espace documentaire SD** | Types de documents administrés au national ; téléversement par utilisateurs SD ; validation nationale pour certains ; dépôt pour modifications (ex. identité dirigeants) | EF-090 |
| **Historique de participation à la vie fédérale** | Suivi de la participation des SD à la vie fédérale (indicateurs, historique). | — |
| **Organigramme SD** | Génération dynamique d'un organigramme fonctionnel par SD avec informations de contact ; visible par les clubs et le niveau national | EF-091 |
| **Gestion des tarifs SD** | Saisie des tarifs au niveau régional (CR et CDs) : cotisation territoriale affiliation, cotisation(s) territoriale(s) licences ; période type 1er juillet–31 août ; tarification unique ou diversifiée | EF-092 |

---

### 2.3 Suivi administratif et financier

| Fonctionnalité | Description | Exigences |
|----------------|-------------|-----------|
| **Situation de la structure** | Vue sur la situation administrative et financière de la structure (CR/CD) | — |
| **Situation d'un club** | Accès aux données de situation des clubs de la zone (affiliation, licences, décomptes) | EF-093 |
| **Suivi des décomptes** | Accès à tous les décomptes des clubs de la(ses) zone(s) ; filtres par date, statut, zone, club ; détail d'un décompte | EF-093 |
| **Dashboard financier** | Espace pour intégrer un rapport sur les produits des licences et des affiliations (outil data visualisation FFGym) | EF-094 |
| **Export comptable** | Export comptable des produits licences et affiliations aux formats courants (CSV, XML) depuis l'espace connecté | EF-095 |

---

### 2.4 Affiliation

| Fonctionnalité | Description | Exigences |
|----------------|-------------|-----------|
| **Planification** | Cadre de planification des périodes d'affiliation (ouverture de saison, tarifs) | EF-022 à EF-031 |
| **Saisie des tarifs** | Tarifs nationaux (licence fédérale, assurance, affiliation) ; tarifs régionaux (cotisation individuelle régionale, cotisation territoriale affiliation, cotisation départementale) ; règle : saison « en création » puis « en préparation » une fois tarifs saisis | EF-023, EF-024, EF-026, EF-027 |
| **Message d'information** | Envoi d'une lettre d'information aux clubs (rédaction et envoi depuis FFGym Licence, pièces jointes par lien, personnalisable par CR, choix des fonctions destinataires par zone) | EF-025 |
| **Suivi des demandes** | Suivi des demandes d'affiliation (nouveau club) et de ré-affiliation ; contrôle recevabilité et cohérence ; validation ou refus ; échanges avec le club | EF-014, EF-037 |

---

### 2.5 Prise de licence

| Fonctionnalité | Description | Exigences |
|----------------|-------------|-----------|
| **Planification** | Cadre de planification des périodes de prise de licence (ouverture saison 1er septembre, tarifs) | EF-022, EF-029 |
| **Saisie des tarifs** | Tarifs nationaux et régionaux/départementaux pour les licences | EF-023, EF-024 |
| **Suivi des mutations** | Gestion des demandes de mutation : validation régionale (non haut-niveau) ; Commission nationale des mutations (haut-niveau) | EF-062, EF-063 |
| **Contrôle des décomptes** | Attribution des tarifs, modification en cas d'erreur, validation puis notification au club | EF-056 |

---

### 2.6 Accompagnement des clubs

| Fonctionnalité | Description | Exigences |
|----------------|-------------|-----------|
| **Accès aux données des clubs** | Accès à la fiche club avec toutes les données visibles au club (utilisateurs départementaux/régionaux/nationaux avec rôle d'accompagnement) | EF-074 |
| **Données complémentaires** | Saisie, modification et consultation de données complémentaires sur le club | EF-075 |
| **Consigner les échanges avec les clubs** | Création d'échanges : type (appel, visio, visite), objet, date, résumé, tag utilisateur ; planification (date, moyen, invitation contact club, envoi invitation/email) ; consultation avec filtre par date/type, recherche par mot-clé | EF-077 à EF-079 |
| **Suivi des démarches** | Menu de suivi des démarches entreprises avec le club | EF-076 |

---

## 3. Synthèse par bloc fonctionnel

| Bloc | Fonctionnalités clés |
|------|----------------------|
| **Éthique** | Contrôle d'honorabilité, suivi décisions disciplinaires, radiations |
| **SD** | Gestion SD, espace documentaire, organigramme, tarifs SD, historique vie fédérale |
| **Admin / Financier** | Situation structure/club, décomptes, dashboard financier, export comptable |
| **Affiliation** | Planification, tarifs, message d'information, suivi demandes |
| **Prise de licence** | Planification, tarifs, suivi mutations |
| **Accompagnement clubs** | Données clubs, données complémentaires, échanges, suivi démarches |

---

## 4. Périmètre POC

L'Espace fédéral est **hors périmètre du POC** (back-office complexe). Cette fiche sert de référence pour la vision globale et les spécifications projet.

---

*Document de référence pour le cahier des charges POC – FFGym Licence.*
