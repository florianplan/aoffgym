# Design System Express – POC FFGym Licence

> Document produit par le Lead Product Designer UI/UX — **Charte graphique officielle FFGym**  
> Référence : [Charte FFGym](https://moncompte.ffgym.fr/Espace_pratique/Communication/Charte_FFGym)  
> Style : **Institutionnel · Sportif · Fédération**

---

## 1. Charte Graphique — Charte Officielle FFGym

### 1.1 Philosophie Visuelle

L'identité visuelle du POC s'appuie sur la **charte graphique officielle** de la Fédération Française de Gymnastique. Les couleurs, le logotype et la typographie sont conformes aux ressources fournies par la FFGym pour garantir la cohérence avec l'écosystème fédéral (Mon Compte, supports imprimés, communication).

| Élément | Principe |
|---------|----------|
| **Tonalité** | Institutionnelle, sportive, lisible, professionnelle |
| **Style graphique** | Logotype officiel, dégradé bleu charte, typographie Cronos/Arial |
| **Effet signature** | **Rouge et bleu fédéral** — contraste identitaire fort |
| **Sensation** | Confiance, clarté, appartenance à la fédération |

---

### 1.2 Logotype Officiel

Le logotype fédéral doit être utilisé tel que fourni par la charte. Pour le POC, le fichier suivant est à disposition :

| Fichier | Usage |
|---------|--------|
| **`04_POC/LogoGymGlobalBleu.png`** | Logo principal « Gym » — version fond sombre / transparent |

**Description du logo :**
- **« Gym »** : lettre **G** en rouge vif (script), **ym** en bleu marine (script), typographie fluide et dynamique.
- **« FÉDÉRATION FRANÇAISE »** : au-dessus de « ym », en capitales, sans-serif, bleu marine.

**Couleurs du logo (à respecter dans l’UI) :**
- **Rouge FFGym** : utilisé pour le « G » — accent principal, boutons d’action, éléments d’appel.
- **Bleu marine FFGym** : utilisé pour « ym » et « FÉDÉRATION FRANÇAISE » — texte institutionnel, liens, secondaire.

**Règles d’usage :**
- Ne pas déformer, recadrer ni modifier les proportions du logo.
- Conserver un espace de respiration minimal autour du logo (zone d’exclusion).
- Sur fond clair : privilégier la version couleur ; sur fond bleu/dégradé : version blanche si fournie par la charte.

---

### 1.3 Palette de Couleurs — Charte Officielle

#### 🎨 Couleurs Principales (Logotype)

| Nom | Rôle | HEX (écran) | Usage |
|-----|------|-------------|--------|
| **Rouge FFGym** | Couleur d’accent, CTA, « G » du logo | `#C8102E` | Boutons primaires, icônes d’action, highlights |
| **Bleu marine FFGym** | Couleur institutionnelle, « ym » et texte | `#002855` | Texte principal institutionnel, liens, headers |

> Les valeurs HEX sont des équivalents écran ; pour l’impression, se référer aux spécifications CMYK de la charte.

---

#### 🎨 Dégradé Bleu — Charte Officielle

Le dégradé bleu est défini dans la charte pour les supports (pochettes, bandeaux, fonds). Valeurs **CMYK** (référence pour l’impression) :

| Point | Placement | C | M | J | N |
|-------|-----------|---|---|---|---|
| 1 | 0% | 100% | 50% | 0% | 0% |
| 2 | 45% | 100% | 80% | 0% | 0% |
| 3 | 100% | 100% | 90% | 0% | 50% |

**Équivalent écran (HEX/RGB)** — approximation pour interfaces digitales :

| Point | Placement | HEX | RGB |
|-------|--------|-----|-----|
| 1 | 0% | `#0055A4` | 0, 85, 164 |
| 2 | 45% | `#003A6E` | 0, 58, 110 |
| 3 | 100% | `#001C38` | 0, 28, 56 |

```css
/* Dégradé bleu FFGym — charte officielle */
background: linear-gradient(180deg, #0055A4 0%, #003A6E 45%, #001C38 100%);
```

**Tailwind (approximation)** : `bg-gradient-to-b from-[#0055A4] via-[#003A6E] to-[#001C38]`

> Pour des documents imprimés ou exports PDF, utiliser les valeurs CMYK ci-dessus dans un logiciel de PAO.

---

#### Couleurs de Support

| Nom | Rôle | HEX | Tailwind |
|-----|------|-----|----------|
| **Blanc Pur** | Texte sur dégradé bleu / rouge, fond clair | `#FFFFFF` | `text-white`, `bg-white` |
| **Noir Doux** | Texte principal sur fond blanc | `#0F172A` | `text-slate-900` |
| **Gris Chaud** | Texte secondaire | `#64748B` | `text-slate-500` |
| **Fond Clair** | Background pages | `#F8FAFC` | `bg-slate-50` |

#### Couleurs Fonctionnelles (états et feedback)

| Statut | Couleur | HEX | Tailwind |
|--------|---------|-----|----------|
| **Succès** | Émeraude | `#10B981` | `text-emerald-500`, `bg-emerald-500/10` |
| **Erreur** | Rose Vif | `#F43F5E` | `text-rose-500`, `bg-rose-500/10` |
| **Avertissement** | Ambre | `#F59E0B` | `text-amber-500`, `bg-amber-500/10` |
| **Info** | Cyan | `#06B6D4` | `text-cyan-500`, `bg-cyan-500/10` |

---

### 1.4 Typographie — Charte FFGym

Conformément à la [charte FFGym](https://moncompte.ffgym.fr/Espace_pratique/Communication/Charte_FFGym) :

| Rôle | Police | Usage |
|------|--------|--------|
| **Typographie prioritaire** | **Cronos MM** (Cronos) | Tous les supports de communication — titres, corps de texte, UI lorsque la police est disponible |
| **Typographie de substitution** | **Arial** | Supports digitaux : nombreux utilisateurs ne disposant pas de Cronos, Arial assure la cohérence visuelle et la lisibilité |

#### Configuration pour le digital (POC)

Sur le web, Cronos n’étant pas systématiquement disponible (police propriétaire), utiliser **Arial** comme police d’interface, avec des fallbacks système :

| Propriété | Valeur |
|-----------|--------|
| **Famille (écran)** | `Arial, Helvetica, system-ui, sans-serif` |
| **Famille (si Cronos chargée)** | `'Cronos MM', 'Cronos', Arial, sans-serif` |
| **Poids utilisés** | 400 (Regular), 600 (Semibold), 700 (Bold) |

#### Configuration Tailwind

```javascript
// tailwind.config.js — charte FFGym
fontFamily: {
  sans: ['Arial', 'Helvetica', 'system-ui', 'sans-serif'],
  // Optionnel si Cronos fournie en webfont :
  // sans: ['Cronos MM', 'Cronos', 'Arial', 'sans-serif'],
}
```

#### Échelle Typographique

| Élément | Taille | Poids | Line-height | Tailwind |
|---------|--------|-------|-------------|----------|
| **H1 – Titre principal** | 48px | Bold (700) | 1.2 | `text-5xl font-bold leading-tight` |
| **H2 – Titre section** | 36px | Bold (700) | 1.25 | `text-4xl font-bold leading-tight` |
| **H3 – Sous-titre** | 24px | Semibold (600) | 1.3 | `text-2xl font-semibold leading-snug` |
| **H4 – Titre carte** | 20px | Semibold (600) | 1.4 | `text-xl font-semibold` |
| **Body – Texte courant** | 16px | Regular (400) | 1.6 | `text-base leading-relaxed` |
| **Small – Texte secondaire** | 14px | Regular (400) | 1.5 | `text-sm leading-snug` |
| **XS – Labels, badges** | 12px | Semibold (600) | 1.4 | `text-xs font-semibold` |

---

### 1.5 Règles Graphiques — Interface POC

#### Arrondis

Composants avec arrondis modérés pour une interface claire et moderne :

| Token | Valeur | Usage | Tailwind |
|-------|--------|-------|----------|
| `md` | 8px | Inputs, petits éléments | `rounded-lg` |
| `lg` | 12px | Boutons, badges | `rounded-xl` |
| `xl` | 16px | Cartes, conteneurs | `rounded-2xl` |
| `full` | 9999px | Avatars, pills, badges circulaires | `rounded-full` |

---

#### Ombres

Ombres discrètes ; accents colorés alignés sur la charte (rouge FFGym, bleu) :

| Token | Description | Tailwind |
|-------|-------------|----------|
| **Ombre standard** | Ombre grise légère | `shadow-[0_4px_20px_-4px_rgba(0,0,0,0.12)]` |
| **Ombre rouge** | Accent bouton primaire | `shadow-[0_10px_40px_-10px_rgba(200,16,46,0.35)]` |
| **Ombre bleu** | Accent dégradé / header | `shadow-[0_10px_40px_-10px_rgba(0,43,85,0.25)]` |

---

#### Dégradé bleu officiel

Utiliser le dégradé bleu charte (voir § 1.3) pour :
- Headers et bandeaux,
- Fond de blocs institutionnels,
- Pochettes et exports PDF (CMYK).

---

#### Espacements

| Token | Valeur | Usage | Tailwind |
|-------|--------|-------|----------|
| `sm` | 8px | Entre éléments liés | `p-2`, `gap-2` |
| `md` | 16px | Padding interne composants | `p-4`, `gap-4` |
| `lg` | 24px | Marge entre sections | `p-6`, `gap-6` |
| `xl` | 32px | Séparation forte | `p-8`, `gap-8` |
| `2xl` | 48px | Espacement héroïque | `p-12`, `gap-12` |

---

## 2. Composants UI — Spécifications Tailwind

### 2.1 Boutons

#### Bouton Primaire (Rouge FFGym)

| État | Apparence | Classes Tailwind |
|------|-----------|------------------|
| **Default** | Rouge charte, texte blanc | `bg-[#C8102E] text-white font-semibold px-6 py-3 rounded-xl shadow-[0_10px_40px_-10px_rgba(200,16,46,0.35)] transition-all duration-300` |
| **Hover** | Assombrir légèrement | `hover:bg-[#A00D26] hover:shadow-[0_12px_48px_-10px_rgba(200,16,46,0.45)]` |
| **Focus** | Ring visible | `focus:outline-none focus:ring-4 focus:ring-[#C8102E]/40` |
| **Disabled** | Désaturé | `disabled:opacity-50 disabled:cursor-not-allowed` |

```html
<!-- Bouton Primaire — Rouge FFGym -->
<button class="bg-[#C8102E] text-white font-semibold px-6 py-3 rounded-xl shadow-[0_10px_40px_-10px_rgba(200,16,46,0.35)] transition-all duration-300 hover:bg-[#A00D26] focus:outline-none focus:ring-4 focus:ring-[#C8102E]/40">
  Valider la licence
</button>
```

---

#### Bouton Secondaire (Bleu charte / Dégradé bleu)

| État | Apparence | Classes Tailwind |
|------|-----------|------------------|
| **Default** | Dégradé bleu charte, texte blanc | `bg-gradient-to-b from-[#0055A4] via-[#003A6E] to-[#001C38] text-white font-semibold px-6 py-3 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,43,85,0.25)] transition-all duration-300` |
| **Hover** | Légère intensification | `hover:shadow-[0_12px_48px_-10px_rgba(0,43,85,0.35)]` |

```html
<!-- Bouton Secondaire — Dégradé bleu FFGym -->
<button class="bg-gradient-to-b from-[#0055A4] via-[#003A6E] to-[#001C38] text-white font-semibold px-6 py-3 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,43,85,0.25)] transition-all duration-300 hover:shadow-[0_12px_48px_-10px_rgba(0,43,85,0.35)]">
  Voir le détail
</button>
```

---

#### Bouton Outline (Bordure rouge ou bleu)

```html
<!-- Bouton Outline rouge -->
<button class="bg-white text-[#C8102E] font-semibold px-6 py-3 rounded-xl border-2 border-[#C8102E] transition-all duration-300 hover:bg-[#C8102E]/5">
  Annuler
</button>
```

---

#### Bouton Ghost (Tertiaire)

```html
<button class="text-[#002855] font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:bg-slate-100 active:bg-slate-200">
  Voir plus
</button>
```

---

### 2.2 Headers

#### Header Principal (Dégradé bleu charte)

```html
<header class="relative overflow-hidden">
  <!-- Dégradé bleu officiel FFGym -->
  <div class="absolute inset-0 bg-gradient-to-b from-[#0055A4] via-[#003A6E] to-[#001C38]"></div>
  
  <!-- Contenu -->
  <div class="relative max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
    <!-- Logo officiel -->
    <div class="flex items-center gap-4">
      <img src="04_POC/LogoGymGlobalBleu.png" alt="FFGym - Fédération Française de Gymnastique" class="h-12 drop-shadow-lg" />
      <span class="text-2xl font-bold text-white drop-shadow-md">FFGym Licence</span>
    </div>
    
    <!-- Navigation -->
    <nav class="flex items-center gap-8">
      <a href="#" class="text-white/80 hover:text-white font-medium transition-colors">Dashboard</a>
      <a href="#" class="text-white font-semibold">Licenciés</a>
      <a href="#" class="text-white/80 hover:text-white font-medium transition-colors">Décomptes</a>
    </nav>
    
    <!-- User -->
    <div class="flex items-center gap-4">
      <span class="text-sm text-white/90 font-medium">Gym'Étoiles Paris 15</span>
      <div class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold border-2 border-white/30">
        GP
      </div>
    </div>
  </div>
</header>
```

---

#### Header Alternatif (Rouge FFGym)

```html
<header class="relative overflow-hidden bg-[#C8102E]">
  <div class="relative max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
    <img src="04_POC/LogoGymGlobalBleu.png" alt="FFGym" class="h-10" />
    <!-- ... contenu identique ... -->
  </div>
</header>
```

---

### 2.3 Cartes

#### Carte Standard

```html
<div class="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.12)] p-6 border border-slate-100 transition-all duration-300 hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.15)]">
  <h4 class="text-xl font-semibold text-slate-900 mb-3">Titre de la carte</h4>
  <p class="text-slate-500 leading-relaxed">
    Contenu de la carte avec une description.
  </p>
</div>
```

---

#### Carte KPI (Dashboard) — Accent rouge ou bleu

```html
<div class="relative bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.12)] p-6 overflow-hidden group hover:shadow-[0_10px_40px_-10px_rgba(200,16,46,0.15)] transition-all duration-300">
  <!-- Accent rouge charte en haut -->
  <div class="absolute top-0 left-0 right-0 h-1 bg-[#C8102E]"></div>
  
  <div class="flex items-center justify-between mb-4">
    <span class="text-sm font-semibold text-slate-500 uppercase tracking-wide">Licenciés actifs</span>
    <span class="p-3 bg-[#C8102E]/10 rounded-xl">
      <svg class="w-6 h-6 text-[#C8102E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    </span>
  </div>
  <p class="text-4xl font-bold text-slate-900">247</p>
  <p class="text-sm font-medium text-emerald-500 mt-3 flex items-center gap-2">
    <span class="inline-flex items-center justify-center w-5 h-5 bg-emerald-500/10 rounded-full">↑</span>
    +12% vs saison précédente
  </p>
</div>
```

---

#### Carte Licencié (Liste)

```html
<div class="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-5 hover:shadow-[0_10px_40px_-10px_rgba(0,43,85,0.12)] transition-all duration-300 cursor-pointer group border border-slate-100 hover:border-[#002855]/20">
  <div class="w-14 h-14 rounded-full bg-[#002855] flex items-center justify-center text-white font-bold text-lg">
    LM
  </div>
  
  <div class="flex-1 min-w-0">
    <p class="font-semibold text-slate-900 truncate text-lg">Lucas MARTIN</p>
    <p class="text-sm text-slate-500 font-medium">N° 2027-IDF-100001 · GAM</p>
  </div>
  
  <span class="px-4 py-2 bg-emerald-500/10 text-emerald-600 text-xs font-semibold rounded-full">
    Valide
  </span>
</div>
```

---

#### Carte Hero (Dégradé bleu charte)

```html
<div class="relative bg-gradient-to-b from-[#0055A4] via-[#003A6E] to-[#001C38] rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,43,85,0.3)] p-8 overflow-hidden text-white">
  <div class="relative">
    <h3 class="text-3xl font-bold mb-2">Bienvenue, Marie !</h3>
    <p class="text-white/90 text-lg">Saison 2026-2027 · Gym'Étoiles Paris 15</p>
    
    <div class="mt-6 flex gap-4">
      <button class="bg-white text-[#C8102E] font-semibold px-6 py-3 rounded-xl hover:bg-white/95 transition-colors">
        Nouvelle licence
      </button>
      <button class="bg-white/20 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-xl border border-white/30 hover:bg-white/30 transition-colors">
        Voir les statistiques
      </button>
    </div>
  </div>
</div>
```

---

### 2.4 Formulaires

#### Input Text — Style charte

```html
<div class="space-y-2">
  <label class="text-sm font-semibold text-slate-700">Prénom</label>
  <input 
    type="text" 
    placeholder="Ex: Lucas"
    class="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 font-medium transition-all duration-300 focus:border-[#002855] focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,43,85,0.08)] focus:outline-none"
  />
</div>
```

#### Input avec focus bleu charte

```html
<div class="space-y-2">
  <label class="text-sm font-semibold text-slate-700">Email</label>
  <input 
    type="email" 
    placeholder="email@exemple.fr"
    class="w-full px-5 py-3.5 bg-white border-2 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 font-medium transition-all duration-300 focus:border-[#002855] focus:shadow-[0_0_0_4px_rgba(0,43,85,0.08)] focus:outline-none"
  />
</div>
```

#### Input avec Erreur

```html
<div class="space-y-2">
  <label class="text-sm font-semibold text-slate-700">Email</label>
  <input 
    type="email"
    class="w-full px-5 py-3.5 bg-rose-50 border-2 border-rose-300 rounded-xl text-slate-900 font-medium transition-all duration-300 focus:border-rose-500 focus:shadow-[0_0_0_4px_rgba(244,63,94,0.1)] focus:outline-none"
  />
  <p class="text-sm text-rose-500 font-medium flex items-center gap-2">
    <span class="w-5 h-5 bg-rose-500/10 rounded-full flex items-center justify-center">⚠</span>
    Format d'email invalide
  </p>
</div>
```

#### Select

```html
<select class="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 font-medium transition-all duration-300 focus:border-[#002855] focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,43,85,0.08)] focus:outline-none cursor-pointer appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNiA5TDEyIDE1TDE4IDkiIHN0cm9rZT0iIzY0NzQ4QiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=')] bg-no-repeat bg-[right_1rem_center]">
  <option value="">Sélectionnez une discipline</option>
  <option value="gam">Gymnastique Artistique Masculine</option>
  <option value="gaf">Gymnastique Artistique Féminine</option>
  <option value="gr">Gymnastique Rythmique</option>
</select>
```

---

### 2.5 Navigation

#### Menu Latéral (Sidebar) — Charte FFGym

```html
<aside class="w-72 bg-white border-r border-slate-100 h-screen flex flex-col">
  <div class="p-6 border-b border-slate-100">
    <div class="flex items-center gap-3">
      <img src="04_POC/LogoGymGlobalBleu.png" alt="FFGym" class="h-10" />
      <div>
        <span class="text-lg font-bold text-slate-900">FFGym</span>
        <p class="text-xs text-slate-500 font-medium">Licence 2027</p>
      </div>
    </div>
  </div>
  
  <nav class="flex-1 p-4 space-y-2">
    <!-- Item actif — rouge charte -->
    <a href="#" class="flex items-center gap-4 px-4 py-3.5 bg-[#C8102E] text-white rounded-xl font-semibold transition-all">
      <span class="w-6 h-6">📊</span>
      <span>Dashboard</span>
    </a>
    
    <a href="#" class="flex items-center gap-4 px-4 py-3.5 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition-all group">
      <span class="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity">👥</span>
      <span>Licenciés</span>
    </a>
    
    <a href="#" class="flex items-center gap-4 px-4 py-3.5 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition-all group">
      <span class="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity">📋</span>
      <span>Décomptes</span>
    </a>
    
    <a href="#" class="flex items-center gap-4 px-4 py-3.5 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition-all group">
      <span class="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity">📁</span>
      <span>Documents</span>
    </a>
  </nav>
  
  <div class="p-4 border-t border-slate-100">
    <a href="#" class="flex items-center gap-4 px-4 py-3.5 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition-all">
      <span class="w-6 h-6 opacity-60">⚙️</span>
      <span>Paramètres</span>
    </a>
  </div>
</aside>
```

---

### 2.6 Tableaux

#### Tableau de Données — Charte FFGym

```html
<div class="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.12)] overflow-hidden border border-slate-100">
  <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
    <h3 class="text-xl font-bold text-slate-900">Liste des licenciés</h3>
    <div class="relative">
      <input 
        type="search" 
        placeholder="Rechercher..."
        class="pl-12 pr-5 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-medium w-72 focus:border-[#002855] focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,43,85,0.08)] focus:outline-none transition-all"
      />
      <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
    </div>
  </div>
  
  <table class="w-full">
    <thead class="bg-slate-50">
      <tr>
        <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Licencié</th>
        <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">N° Licence</th>
        <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Discipline</th>
        <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Statut</th>
        <th class="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-100">
      <tr class="hover:bg-slate-50/80 transition-colors group">
        <td class="px-6 py-5">
          <div class="flex items-center gap-4">
            <div class="w-11 h-11 rounded-full bg-[#002855] flex items-center justify-center text-white font-bold text-sm">LM</div>
            <div>
              <p class="font-semibold text-slate-900">Lucas MARTIN</p>
              <p class="text-sm text-slate-500">lucas.martin@email.fr</p>
            </div>
          </div>
        </td>
        <td class="px-6 py-5">
          <span class="text-sm text-slate-600 font-mono bg-slate-100 px-3 py-1.5 rounded-lg">2027-IDF-100001</span>
        </td>
        <td class="px-6 py-5">
          <span class="px-4 py-2 bg-[#002855]/10 text-[#002855] text-xs font-bold rounded-full">GAM</span>
        </td>
        <td class="px-6 py-5">
          <span class="px-4 py-2 bg-emerald-500/10 text-emerald-600 text-xs font-bold rounded-full flex items-center gap-2 w-fit">
            <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Valide
          </span>
        </td>
        <td class="px-6 py-5 text-right">
          <button class="text-[#C8102E] hover:text-[#A00D26] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
            Voir →
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  
  <div class="px-6 py-5 border-t border-slate-100 flex items-center justify-between">
    <p class="text-sm text-slate-500 font-medium">Affichage 1-10 sur 247 résultats</p>
    <div class="flex gap-2">
      <button class="px-4 py-2.5 border-2 border-slate-200 rounded-xl text-sm text-slate-500 font-semibold hover:bg-slate-50 disabled:opacity-40 transition-all" disabled>Précédent</button>
      <button class="px-4 py-2.5 bg-[#C8102E] text-white rounded-xl text-sm font-semibold">1</button>
      <button class="px-4 py-2.5 border-2 border-slate-200 rounded-xl text-sm text-slate-600 font-semibold hover:bg-slate-50 transition-all">2</button>
      <button class="px-4 py-2.5 border-2 border-slate-200 rounded-xl text-sm text-slate-600 font-semibold hover:bg-slate-50 transition-all">3</button>
      <button class="px-4 py-2.5 border-2 border-slate-200 rounded-xl text-sm text-slate-600 font-semibold hover:bg-slate-50 transition-all">Suivant</button>
    </div>
  </div>
</div>
```

---

### 2.7 Badges et Statuts

| Statut | Classes Tailwind |
|--------|------------------|
| **Valide** | `px-4 py-2 bg-emerald-500/10 text-emerald-600 text-xs font-bold rounded-full` |
| **En attente** | `px-4 py-2 bg-amber-500/10 text-amber-600 text-xs font-bold rounded-full` |
| **Pré-licence** | `px-4 py-2 bg-violet-500/10 text-violet-600 text-xs font-bold rounded-full` |
| **Expiré** | `px-4 py-2 bg-slate-200 text-slate-500 text-xs font-bold rounded-full` |
| **Erreur** | `px-4 py-2 bg-rose-500/10 text-rose-600 text-xs font-bold rounded-full` |
| **Discipline** | `px-4 py-2 bg-[#002855]/10 text-[#002855] text-xs font-bold rounded-full` |

---

### 2.8 Modales

#### Modale Standard — Charte FFGym

```html
<div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50">
  <div class="relative bg-white rounded-2xl shadow-[0_25px_80px_-20px_rgba(0,0,0,0.2)] w-full max-w-lg mx-4 overflow-hidden">
    <div class="absolute top-0 left-0 right-0 h-1 bg-[#C8102E]"></div>
    
    <div class="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
      <h3 class="text-xl font-bold text-slate-900">Confirmer la création</h3>
      <button class="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">✕</button>
    </div>
    
    <div class="px-8 py-8">
      <p class="text-slate-600 leading-relaxed">Êtes-vous sûr de vouloir créer cette licence pour <strong class="text-slate-900">Lucas MARTIN</strong> ?</p>
    </div>
    
    <div class="px-8 py-6 border-t border-slate-100 flex justify-end gap-4 bg-slate-50/50">
      <button class="px-6 py-3 border-2 border-slate-200 text-slate-600 rounded-xl font-semibold hover:bg-slate-100 transition-colors">
        Annuler
      </button>
      <button class="px-6 py-3 bg-[#C8102E] text-white rounded-xl font-semibold shadow-[0_10px_30px_-10px_rgba(200,16,46,0.35)] hover:bg-[#A00D26] transition-all">
        Confirmer
      </button>
    </div>
  </div>
</div>
```

---

#### Modale Doublons (Alert Style)

```html
<div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50">
  <div class="relative bg-white rounded-2xl shadow-[0_25px_80px_-20px_rgba(0,0,0,0.2)] w-full max-w-xl mx-4 overflow-hidden">
    <div class="absolute top-0 left-0 right-0 h-1 bg-amber-500"></div>
    
    <div class="px-8 py-6 border-b border-slate-100">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 text-xl">⚠️</div>
        <div>
          <h3 class="text-xl font-bold text-slate-900">Doublon potentiel détecté</h3>
          <p class="text-sm text-slate-500 font-medium">Un licencié similaire existe déjà</p>
        </div>
      </div>
    </div>
    
    <div class="px-8 py-6">
      <div class="bg-slate-50 rounded-xl p-5 mb-6 border border-slate-200">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-full bg-[#002855] flex items-center justify-center text-white font-bold">LM</div>
          <div>
            <p class="font-semibold text-slate-900 text-lg">Lucas MARTIN</p>
            <p class="text-sm text-slate-500">N° 2027-IDF-100001 · GAM · Gym'Étoiles Paris 15</p>
            <span class="inline-block mt-2 px-3 py-1 bg-emerald-500/10 text-emerald-600 text-xs font-bold rounded-full">Licence valide</span>
          </div>
        </div>
      </div>
      
      <div class="space-y-3">
        <button class="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-xl text-left hover:border-[#C8102E]/40 hover:bg-[#C8102E]/5 transition-all group">
          <p class="font-semibold text-slate-900 group-hover:text-[#C8102E]">Créer une licence secondaire</p>
          <p class="text-sm text-slate-500">Le licencié sera rattaché à un second club</p>
        </button>
        
        <button class="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-xl text-left hover:border-[#002855]/40 hover:bg-[#002855]/5 transition-all group">
          <p class="font-semibold text-slate-900 group-hover:text-[#002855]">Renouveler cette licence</p>
          <p class="text-sm text-slate-500">Renouveler pour la saison 2026-2027</p>
        </button>
        
        <button class="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-xl text-left hover:border-slate-300 transition-all">
          <p class="font-semibold text-slate-600">Ce n'est pas la même personne</p>
          <p class="text-sm text-slate-500">Confirmer la création malgré la similarité</p>
        </button>
      </div>
    </div>
    
    <div class="px-8 py-5 border-t border-slate-100 bg-slate-50/50">
      <button class="text-slate-500 font-semibold hover:text-slate-700 transition-colors">← Annuler et revenir</button>
    </div>
  </div>
</div>
```

---

### 2.9 Notifications / Toasts

#### Toast Succès (Glow Vert)

```html
<div class="fixed bottom-6 right-6 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(16,185,129,0.4)] border border-emerald-100 p-5 flex items-start gap-4 max-w-sm animate-slide-up">
  <div class="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center text-lg shadow-[0_4px_15px_-3px_rgba(16,185,129,0.5)]">✓</div>
  <div class="flex-1">
    <p class="font-semibold text-slate-900">Licence créée avec succès</p>
    <p class="text-sm text-slate-500 mt-1">Lucas MARTIN - N°2027-IDF-100001</p>
  </div>
  <button class="text-slate-400 hover:text-slate-600 transition-colors">✕</button>
</div>
```

#### Toast Erreur (Glow Rose)

```html
<div class="fixed bottom-6 right-6 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(244,63,94,0.4)] border border-rose-100 p-5 flex items-start gap-4 max-w-sm">
  <div class="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 text-white flex items-center justify-center text-lg shadow-[0_4px_15px_-3px_rgba(244,63,94,0.5)]">!</div>
  <div class="flex-1">
    <p class="font-semibold text-slate-900">Erreur lors de la création</p>
    <p class="text-sm text-slate-500 mt-1">Veuillez vérifier les champs obligatoires.</p>
  </div>
  <button class="text-slate-400 hover:text-slate-600 transition-colors">✕</button>
</div>
```

---

### 2.10 Stepper (Wizard Multi-étapes)

```html
<div class="flex items-center justify-center gap-3 mb-10">
  <div class="flex items-center gap-3">
    <div class="w-10 h-10 rounded-full bg-[#C8102E] text-white flex items-center justify-center font-bold">✓</div>
    <span class="text-sm font-semibold text-[#C8102E]">Identité</span>
  </div>
  
  <div class="w-16 h-1 bg-[#C8102E] rounded-full"></div>
  
  <div class="flex items-center gap-3">
    <div class="w-10 h-10 rounded-full bg-[#C8102E] text-white flex items-center justify-center font-bold animate-pulse">2</div>
    <span class="text-sm font-semibold text-[#C8102E]">Discipline</span>
  </div>
  
  <div class="w-16 h-1 bg-slate-200 rounded-full"></div>
  
  <div class="flex items-center gap-3">
    <div class="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold border-2 border-slate-200">3</div>
    <span class="text-sm font-medium text-slate-400">Validation</span>
  </div>
</div>
```

---

## 3. Layouts de Pages

### 3.1 Page de Connexion — Dégradé bleu charte

```html
<div class="min-h-screen bg-gradient-to-b from-[#0055A4] via-[#003A6E] to-[#001C38] flex items-center justify-center p-6 relative overflow-hidden">
  <div class="relative bg-white/95 backdrop-blur-lg rounded-2xl shadow-[0_30px_100px_-20px_rgba(0,0,0,0.25)] p-10 w-full max-w-md">
    <div class="text-center mb-10">
      <img src="04_POC/LogoGymGlobalBleu.png" alt="FFGym - Fédération Française de Gymnastique" class="h-14 mx-auto mb-6" />
      <h1 class="text-3xl font-bold text-slate-900">FFGym Licence</h1>
      <p class="text-slate-500 mt-2 font-medium">Connectez-vous à votre espace</p>
    </div>
    
    <form class="space-y-6">
      <div class="space-y-2">
        <label class="text-sm font-semibold text-slate-700">Email ou n° de licence</label>
        <input type="text" class="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl font-medium focus:border-[#002855] focus:bg-white focus:outline-none transition-all" placeholder="exemple@email.fr" />
      </div>
      
      <div class="space-y-2">
        <label class="text-sm font-semibold text-slate-700">Mot de passe</label>
        <input type="password" class="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl font-medium focus:border-[#002855] focus:bg-white focus:outline-none transition-all" placeholder="••••••••" />
      </div>
      
      <button type="submit" class="w-full bg-[#C8102E] text-white font-bold py-4 rounded-xl shadow-[0_10px_40px_-10px_rgba(200,16,46,0.35)] hover:bg-[#A00D26] hover:scale-[1.01] transition-all">
        Se connecter
      </button>
    </form>
    
    <p class="text-center text-sm text-slate-500 mt-8">
      Première affiliation ? <a href="#" class="text-[#002855] font-semibold hover:underline">Créer un compte</a>
    </p>
  </div>
</div>
```

---

### 3.2 Dashboard Club (Layout avec Sidebar)

```html
<div class="min-h-screen bg-slate-50 flex">
  <!-- Sidebar (voir section 2.5) -->
  <aside class="w-72 bg-white border-r border-slate-100">...</aside>
  
  <!-- Main content -->
  <main class="flex-1 overflow-auto">
    <!-- Header page -->
    <div class="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-slate-100 px-8 py-5">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-slate-900">Tableau de bord</h1>
          <p class="text-slate-500 font-medium mt-1">Saison 2026-2027 · Gym'Étoiles Paris 15</p>
        </div>
        <button class="bg-[#C8102E] text-white font-semibold px-6 py-3 rounded-xl shadow-[0_10px_30px_-10px_rgba(200,16,46,0.35)] hover:bg-[#A00D26] hover:scale-105 transition-all flex items-center gap-2">
          <span>+</span> Nouvelle licence
        </button>
      </div>
    </div>
    
    <!-- Content -->
    <div class="p-8 space-y-8">
      <!-- Hero Card -->
      <!-- Carte Hero (voir section 2.3) -->
      
      <!-- KPIs Grid -->
      <div class="grid grid-cols-4 gap-6">
        <!-- Carte KPI (voir section 2.3) x4 -->
      </div>
      
      <!-- Alertes -->
      <div class="bg-white rounded-3xl shadow-[0_10px_40px_-10px_rgba(124,58,237,0.1)] p-6 border border-slate-100">
        <h3 class="text-xl font-bold text-slate-900 mb-5">Alertes et actions</h3>
        <!-- Liste des alertes -->
      </div>
      
      <!-- Widget Statistiques -->
      <div class="bg-white rounded-3xl shadow-[0_10px_40px_-10px_rgba(124,58,237,0.1)] p-6 border border-slate-100">
        <h3 class="text-xl font-bold text-slate-900 mb-5">Statistiques du club</h3>
        <!-- Chart DataGym embedded -->
      </div>
    </div>
  </main>
</div>
```

---

## 4. Configuration Tailwind Recommandée

```javascript
// tailwind.config.js — Charte graphique officielle FFGym
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      colors: {
        ffgym: {
          red: '#C8102E',      // Rouge FFGym (logo, CTA)
          blue: '#002855',     // Bleu marine FFGym (logo, texte institutionnel)
          'gradient-start': '#0055A4',
          'gradient-mid': '#003A6E',
          'gradient-end': '#001C38',
        },
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'ffgym-red': '0 10px 40px -10px rgba(200, 16, 46, 0.35)',
        'ffgym-blue': '0 10px 40px -10px rgba(0, 43, 85, 0.25)',
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
```

---

## 5. Principes d'Accessibilité (RGAA)

| Critère | Application |
|---------|-------------|
| **Contraste** | Texte blanc sur dégradé bleu / rouge : ratio > 4.5:1 ✅. Rouge #C8102E sur blanc ≈ 5.5:1. |
| **Focus visible** | Ring visible (ex. `focus:ring-4 focus:ring-[#C8102E]/40` ou `focus:ring-[#002855]/30`) sur tous les éléments interactifs |
| **Navigation clavier** | Tous les composants accessibles via Tab |
| **Tailles de clic** | Minimum 44×44px pour les zones tactiles (boutons py-3 px-6) |
| **Alternatives textuelles** | `alt` sur le logo, `aria-label` sur les icônes seules |
| **États** | Distinctions visuelles claires : hover, focus (ring), disabled (opacity) |

---

## 6. Résumé des Classes Clés

| Composant | Classes Tailwind Essentielles |
|-----------|-------------------------------|
| **Bouton Principal** | `bg-[#C8102E] text-white font-semibold rounded-xl shadow-[0_10px_40px_-10px_rgba(200,16,46,0.35)]` |
| **Bouton Secondaire** | `bg-gradient-to-b from-[#0055A4] via-[#003A6E] to-[#001C38] text-white font-semibold rounded-xl` |
| **Carte** | `bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.12)] border border-slate-100` |
| **Header (dégradé bleu)** | `bg-gradient-to-b from-[#0055A4] via-[#003A6E] to-[#001C38]` |
| **Input** | `bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-[#002855]` |
| **Badge Succès** | `bg-emerald-500/10 text-emerald-600 font-bold rounded-full` |
| **Titre H1/H2** | `font-bold` (Arial / Cronos) |
| **Logo** | `04_POC/LogoGymGlobalBleu.png` |

---

*Document prêt pour le développeur. Stack recommandée : React + Tailwind CSS + shadcn/ui.*  
*Référence : **Charte graphique officielle FFGym** — [Charte FFGym](https://moncompte.ffgym.fr/Espace_pratique/Communication/Charte_FFGym)*
