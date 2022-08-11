export function dateAndTime(d: Date): string {
  const date = d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  const time = d.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  })
  console.log(date + ' ' + time)
  return date + ' ' + time
}
