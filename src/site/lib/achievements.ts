'use client'

// 🥚 The egg hunt. Every easter egg calls unlock(id); progress is saved in localStorage.

export type Achievement = { id: string; emoji: string; name: string; hint: string }

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'black-hole', emoji: '🕳️', name: 'Event horizon', hint: 'Press and hold the void' },
  { id: 'word-swap', emoji: '🔁', name: 'Shapeshifter', hint: "The title isn't set in stone" },
  { id: 'goat-photo', emoji: '🐐', name: 'Badge flipper', hint: 'Flip the badge. Then keep flipping.' },
  { id: 'major', emoji: '🎓', name: 'Top of the class', hint: 'Hover the best grade' },
  { id: 'goat-typed', emoji: '⌨️', name: 'Greatest of all time', hint: 'Type the four-letter legend' },
  { id: 'matrix', emoji: '🐇', name: 'Red pill', hint: 'Type where Neo lives' },
  { id: 'claude', emoji: '🤖', name: 'Hello, robot', hint: 'Say the name of the AI' },
  { id: 'torch', emoji: '🔦', name: 'Lights out', hint: 'Type something that lights the dark' },
  { id: 'konami', emoji: '🪩', name: 'Cheat code', hint: '↑ ↑ ↓ ↓ ← → ← → B A' },
  { id: 'tab-away', emoji: '👀', name: 'Come back', hint: 'Leave this tab, then return' },
  { id: 'hire', emoji: '💼', name: 'Recruiter mode', hint: 'Devs: the console has a function' },
  { id: 'print', emoji: '🖨️', name: 'Paper lover', hint: 'Try printing this page' }
]

const STORAGE_KEY = 'brd:eggs'
const EVENT = 'brd:achievement'

const read = (): Set<string> => {
  try {
    const saved: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    // ignore eggs that don't exist anymore
    return new Set(saved.filter((id) => ACHIEVEMENTS.some((achievement) => achievement.id === id)))
  } catch {
    return new Set()
  }
}

let unlocked: Set<string> | null = null
const get = () => (unlocked ??= read())

export const getUnlocked = () => new Set(get())

export type AchievementEvent = { achievement: Achievement; count: number; total: number; completed: boolean }

export const unlock = (id: string) => {
  const set = get()
  if (set.has(id)) return
  const achievement = ACHIEVEMENTS.find((item) => item.id === id)
  if (!achievement) return
  set.add(id)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]))
  } catch {
    // private mode: progress lives for this session only
  }
  const detail: AchievementEvent = {
    achievement,
    count: set.size,
    total: ACHIEVEMENTS.length,
    completed: set.size === ACHIEVEMENTS.length
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail }))
}

export const resetAchievements = () => {
  unlocked = new Set()
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: null }))
}

export const onAchievement = (listener: (event: AchievementEvent | null) => void) => {
  const handler = (event: Event) => listener((event as CustomEvent<AchievementEvent | null>).detail)
  window.addEventListener(EVENT, handler)
  return () => window.removeEventListener(EVENT, handler)
}
