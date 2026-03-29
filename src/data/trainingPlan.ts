export type SessionType = 'run-easy' | 'run-quality' | 'run-long' | 'strength-a' | 'strength-b' | 'rest' | 'mobility'

export interface Session {
  type: SessionType
  title: string
  description: string
  duration?: string
  details?: string[]
  notes?: string
}

export interface DayPlan {
  day: number
  date: string
  session: Session
  completed?: boolean
  userNotes?: string
  feeling?: 1 | 2 | 3 | 4 | 5
}

export interface WeekPlan {
  week: number
  phase: 'reprise' | 'construction' | 'specifique' | 'allegement'
  theme: string
  days: DayPlan[]
}

const sessionTemplates: Record<SessionType, (details?: string) => Session> = {
  'run-easy': (details) => ({
    type: 'run-easy',
    title: 'Footing Facile',
    description: 'Course en endurance fondamentale, allure conversationnelle',
    duration: details || '30-40 min',
    details: [
      'Allure : tu peux parler sans être essoufflé',
      'Fréquence cardiaque : zone 2 (60-70% FCmax)',
      'Terrain : plat ou légèrement vallonné',
      'Focus : technique de course, respiration'
    ]
  }),
  'run-quality': (details) => ({
    type: 'run-quality',
    title: 'Séance Qualité',
    description: 'Travail de côtes ou tempo léger',
    duration: details || '45-60 min',
    details: [
      'Échauffement : 15 min footing facile',
      'Séance : côtes ou tempo selon programme',
      'Retour au calme : 10-15 min',
      'Allure : effort soutenu mais contrôlé'
    ]
  }),
  'run-long': (details) => ({
    type: 'run-long',
    title: 'Sortie Longue',
    description: 'Endurance spécifique trail',
    duration: details || '60-90 min',
    details: [
      'Terrain : chemins, trails si possible',
      'Allure : très facile, focus sur le temps',
      'Hydratation : prévoir de l\'eau si > 75 min',
      'Objectif : tenir la distance, gérer le dénivelé'
    ]
  }),
  'strength-a': () => ({
    type: 'strength-a',
    title: 'Renfo Full Body A',
    description: 'Séance musculation poids du corps',
    duration: '45-60 min',
    details: [
      'Pompes : 3x8-12',
      'Tractions ou tirage horizontal : 3x6-10',
      'Squat bulgare : 3x10/jambe',
      'Hip thrust : 3x12-15',
      'Gainage frontal : 3x45-60 sec',
      'Mollets debout : 3x15-20'
    ]
  }),
  'strength-b': () => ({
    type: 'strength-b',
    title: 'Renfo Full Body B',
    description: 'Séance musculation poids du corps',
    duration: '45-60 min',
    details: [
      'Dips ou pompes déclinées : 3x8-12',
      'Rowing / Tractions : 3x8-12',
      'Fentes marchées ou step-ups : 3x10/jambe',
      'Soulevé de terre jambe tendue (unilatéral) : 3x10/jambe',
      'Gainage latéral : 3x45-60 sec/côté',
      'Mollets + tibial antérieur : 3x15-20'
    ]
  }),
  'rest': () => ({
    type: 'rest',
    title: 'Repos',
    description: 'Journée de récupération',
    duration: 'Journée complète',
    details: [
      'Pas d\'activité intense',
      'Hydratation : 2-3L d\'eau',
      'Sommeil : privilégier 7-8h',
      'Étirements légers si envie'
    ]
  }),
  'mobility': () => ({
    type: 'mobility',
    title: 'Mobilité & Récupération',
    description: 'Travail de mobilité et récupération active',
    duration: '20-30 min',
    details: [
      'Étirements dynamiques',
      'Mobilité hanche et chevilles',
      'Rouleau en mousse (optionnel)',
      'Respiration et relaxation'
    ]
  })
}

function createWeek(weekNum: number, phase: WeekPlan['phase'], theme: string, sessions: SessionType[]): WeekPlan {
  const days: DayPlan[] = sessions.map((sessionType, index) => {
    const day = index + 1
    let duration: string | undefined

    if (sessionType === 'run-easy') {
      if (weekNum <= 3) duration = '30 min'
      else if (weekNum <= 6) duration = '35-40 min'
      else if (weekNum <= 9) duration = '40 min'
      else duration = '30-35 min'
    }

    if (sessionType === 'run-long') {
      if (weekNum === 1) duration = '40 min run/walk'
      else if (weekNum === 2) duration = '45 min run/walk'
      else if (weekNum === 3) duration = '50 min'
      else if (weekNum <= 5) duration = '60 min'
      else if (weekNum <= 7) duration = '70 min'
      else if (weekNum <= 9) duration = '80 min'
      else if (weekNum === 10) duration = '90 min max'
      else if (weekNum === 11) duration = '75 min'
      else duration = '45 min'
    }

    if (sessionType === 'run-quality') {
      if (weekNum <= 3) duration = '35 min (dont 15 min qualité)'
      else if (weekNum <= 7) duration = '45 min'
      else duration = '50-60 min'
    }

    return {
      day,
      date: `S${weekNum}-J${day}`,
      session: sessionTemplates[sessionType](duration)
    }
  })

  return { week: weekNum, phase, theme, days }
}

export const trainingPlan: WeekPlan[] = [
  // SEMAINES 1-3 : REPRISE INTELLIGENTE
  createWeek(1, 'reprise', 'Habituers les jambes', [
    'run-easy', 'strength-a', 'run-easy', 'strength-b', 'rest', 'run-long', 'rest'
  ]),
  createWeek(2, 'reprise', 'Augmenter doucement', [
    'run-easy', 'strength-a', 'run-easy', 'strength-b', 'rest', 'run-long', 'mobility'
  ]),
  createWeek(3, 'reprise', 'Première continuité', [
    'run-easy', 'strength-a', 'run-quality', 'strength-b', 'run-easy', 'run-long', 'rest'
  ]),

  // SEMAINES 4-8 : CONSTRUCTION
  createWeek(4, 'construction', 'Passage à 4 sorties', [
    'run-easy', 'strength-a', 'run-quality', 'strength-b', 'run-easy', 'run-long', 'rest'
  ]),
  createWeek(5, 'construction', 'Volume en hausse', [
    'run-easy', 'strength-a', 'run-quality', 'strength-b', 'run-easy', 'run-long', 'mobility'
  ]),
  createWeek(6, 'construction', 'Consolidation', [
    'run-easy', 'strength-a', 'run-quality', 'strength-b', 'run-easy', 'run-long', 'rest'
  ]),
  createWeek(7, 'construction', 'Pic de volume', [
    'run-easy', 'strength-a', 'run-quality', 'strength-b', 'run-easy', 'run-long', 'mobility'
  ]),
  createWeek(8, 'construction', 'Récupération active', [
    'run-easy', 'strength-a', 'run-quality', 'strength-b', 'rest', 'run-long', 'rest'
  ]),

  // SEMAINES 9-11 : SPÉCIFIQUE TRAIL
  createWeek(9, 'specifique', 'Introduction D+', [
    'run-easy', 'strength-a', 'run-quality', 'strength-b', 'run-easy', 'run-long', 'rest'
  ]),
  createWeek(10, 'specifique', 'Pic spécifique', [
    'run-easy', 'strength-a', 'run-quality', 'strength-b', 'run-easy', 'run-long', 'mobility'
  ]),
  createWeek(11, 'specifique', 'Dernier bloc', [
    'run-easy', 'strength-a', 'run-quality', 'strength-b', 'run-easy', 'run-long', 'rest'
  ]),

  // SEMAINE 12 : ALLÈGEMENT
  createWeek(12, 'allegement', 'Arriver frais', [
    'run-easy', 'rest', 'run-quality', 'strength-a', 'rest', 'run-easy', 'rest'
  ])
]

export function getTotalDays(): number {
  return trainingPlan.reduce((acc, week) => acc + week.days.length, 0)
}

export function getDayByIndex(globalDayIndex: number): { week: WeekPlan; day: DayPlan; weekIndex: number; dayIndex: number } | null {
  let currentIndex = 0
  for (let w = 0; w < trainingPlan.length; w++) {
    const week = trainingPlan[w]!
    for (let d = 0; d < week.days.length; d++) {
      if (currentIndex === globalDayIndex) {
        return { week, day: week.days[d]!, weekIndex: w, dayIndex: d }
      }
      currentIndex++
    }
  }
  return null
}

export function getTodaySession(startDate?: Date): { week: WeekPlan; day: DayPlan; weekIndex: number; dayIndex: number; progress: { completed: number; total: number } } | null {
  const start = startDate || new Date()
  const now = new Date()

  const diffTime = now.getTime() - start.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return null

  const result = getDayByIndex(diffDays)
  if (!result) return null

  const completed = diffDays
  const total = getTotalDays()

  return { ...result, progress: { completed, total } }
}
