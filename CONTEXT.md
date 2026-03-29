# Contexte Projet : Prépa Trail 12km

## Objectif
Développer une application web pour accompagner la préparation d'un **trail de 12km** sur une période de **3 mois**.

---

## Profil Utilisateur

| Caractéristique | Valeur |
|-----------------|--------|
| Sexe | Homme |
| Âge | 25 ans |
| Taille | 1m86 |
| Poids | ~80kg |
| Niveau musculation | Intermédiaire (6 mois de salle) |
| Niveau course à pied | Débutant (ne court plus depuis longtemps) |

---

## Programme Actuel (À Transformer)

### Alimentation
**Repas principal (midi & soir)** :
- 150g riz complet (cru)
- 2 tranches poulet fermier
- Haricots

**Collation pré-workout** :
- 3 galettes de riz
- 2 tranches de dinde
- 1 banane
- 200g fromage blanc
- ~15 amandes

### Entraînement Musculation (Split actuel)
| Jour | Groupe musculaire |
|------|-------------------|
| Lundi | Pectoraux + Épaules + Triceps |
| Mardi | Quadriceps |
| Mercredi | Dos + Biceps |
| Jeudi | Épaules + Triceps |
| Vendredi | Ischios + Fessiers |
| Variable | Abdominaux |

*Méthode : machines en salle*

---

## Plan d'Entraînement Défini

### Philosophie Générale
- **Priorité #1** : remettre la course progressivement
- 3 sorties/semaine les 1-2 premières semaines, puis 4 sorties si le corps suit
- Règle d'or : régularité > intensité. Réduire immédiatement si douleurs (tendon d'Achille, genou, tibia, fatigue accumulée)

### Structure Hebdomadaire Type

| Jour | Activité |
|------|----------|
| Lundi | Footing facile 30-40 min + mobilité |
| Mardi | Full body A |
| Mercredi | Course "qualité" légère |
| Jeudi | Full body B + gainage |
| Vendredi | Footing facile 25-35 min ou repos si fatigue |
| Samedi | Sortie longue trail / chemin |
| Dimanche | Repos ou marche active |

### Progression sur 12 Semaines

#### Semaines 1-3 : Reprise Intelligente
**Objectif** : habituer mollets, genoux, tendons, souffle

- 2 footings très faciles
- 1 sortie plus longue en run/walk si besoin
- 2 séances renfo full body

**Exemples de courses** :
- S1 : 30 min en alternant 3 min course / 1 min marche
- S2 : 35 min en 5 min course / 1 min marche
- S3 : 40 min en continu si tout va bien

#### Semaines 4-8 : Construction
**Objectif** : passer à 4 sorties

- 2 footings faciles
- 1 séance côtes ou tempo léger
- 1 sortie longue progressive

**Qualité** : 8-10 répétitions de 45 sec montée effort soutenu (récup marche), ou 15-20 min allure "phrases courtes"

**Sortie longue** : 50-60 min → 75-90 min max selon terrain

#### Semaines 9-11 : Spécifique Trail
**Objectif** : être à l'aise sur dénivelé et fatigue

- 1 footing facile
- 1 séance côtes ou allure soutenue
- 1 footing récup
- 1 sortie longue trail avec D+

**Focus** : monter sans exploser, descendre proprement, garder du jus après 45-60 min

#### Semaine 12 : Allègement
- Volume réduit de 40-50%
- Garder un peu d'intensité légère
- Objectif : arriver frais, pas "entraîné mort"

### Renforcement Musculaire (2x/semaine)

**Séance A** :
- Pompes
- Tractions ou tirage horizontal
- Squat bulgare
- Hip thrust ou pont fessier
- Gainage frontal
- Mollets debout

**Séance B** :
- Dips ou pompes déclinées
- Rowing / tractions
- Fentes marchées ou step-ups
- Soulevé de terre jambe tendue (poids du corps / unilatéral)
- Gainage latéral
- Mollets + tibial antérieur

**Important** : ne pas aller à l'échec total sur les jambes (sinon plombe les sorties course). Focus sur mollets, fessiers, ischios, chevilles, gainage.

---

## Nutrition

### Ce qui Fonctionne (à garder)
- Riz / féculents
- Poulet / dinde
- Haricots / légumes
- Fromage blanc, banane, amandes

### Ajustements

**Objectifs à 80kg** :
- Protéines : 130-160 g/jour
- Glucides suffisants les jours de course (surtout avant sortie longue)
- Légumes et fruits tous les jours
- Moins de gras/fibres juste avant de courir

**Avant une séance course** (collation plus légère que la salle) :
- Banane
- Galettes de riz
- Un peu de dinde ou fromage blanc
- Éviter les amandes juste avant (gras ralentit digestion)

**Après course** (dans les 2h) :
- Vraie dose de protéines
- Glucides
- Eau

**Sortie longue > 75-90 min** :
- Eau pendant l'effort
- Éventuellement glucides si besoin

---

## Contraintes Techniques

### Device Cible : Mobile-First
L'application est conçue **exclusivement pour mobile** (iPhone 16e comme référence principale).

**Spécifications iPhone 16e** :
- Écran : 6.1" (1170 × 2532 px, 460 ppi)
- Viewport CSS : ~393 × 852 px
- Safe areas : prendre en compte le notch/Dynamic Island

**Règles de design** :
- **Mobile-first** : tous les composants sont pensés pour touch/scroll vertical
- **Largeurs tactiles** : boutons min 44×44 px, espacement confortable
- **Lisibilité** : texte lisible sans zoom, contrastes élevés (usage extérieur)
- **Performance** : animations fluides 60fps, pas de layout shift
- **Safe areas** : respecter `env(safe-area-inset-*)` pour notch/home indicator
- **Pas de hover** : interactions basées sur touch/press

---

## Fonctionnalités de l'App

- [ ] Plan d'entraînement 12 semaines (course + muscu) jour par jour
- [ ] Suivi des séances (check-off, temps, sensations, douleurs)
- [ ] Progression des distances/volumes visuelle
- [ ] Guide nutritionnel avec conseils timing
- [ ] Rappels / notifications séances
- [ ] Stats : km parcourus, D+, séances complétées, streaks
- [ ] Journal de bord pour notes sensation/fatigue
