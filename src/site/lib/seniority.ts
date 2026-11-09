export const COMPANY = 'Shotgun'
export const STARTED_AT = new Date('2026-11-12T09:00:00+01:00')

const pad = (value: number) => String(value).padStart(2, '0')

/** "1y 2m 3d · 04:05:06" since STARTED_AT — or a countdown before the first day. */
export const formatSeniority = (now: Date) => {
  const diff = now.getTime() - STARTED_AT.getTime()
  if (diff < 0) {
    const total = Math.floor(-diff / 1000)
    const days = Math.floor(total / 86400)
    const hours = Math.floor((total % 86400) / 3600)
    const minutes = Math.floor((total % 3600) / 60)
    return { started: false, value: `starts in ${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(total % 60)}s` }
  }
  const seconds = Math.floor(diff / 1000) % 86400
  // whole days counted from the last "start time of day"
  const day = new Date(now.getTime() - seconds * 1000)
  let years = day.getFullYear() - STARTED_AT.getFullYear()
  let months = day.getMonth() - STARTED_AT.getMonth()
  let days = day.getDate() - STARTED_AT.getDate()
  if (days < 0) {
    months -= 1
    days += new Date(day.getFullYear(), day.getMonth(), 0).getDate()
  }
  if (months < 0) {
    years -= 1
    months += 12
  }
  const time = `${pad(Math.floor(seconds / 3600))}:${pad(Math.floor((seconds % 3600) / 60))}:${pad(seconds % 60)}`
  const date = [years ? `${years}y` : '', years || months ? `${months}m` : '', `${days}d`].filter(Boolean).join(' ')
  return { started: true, value: `${date} · ${time}` }
}
