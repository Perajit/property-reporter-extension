const timeUnitMap = [
  { en: 'sec', th: 'วินาที', time: 1 },
  { en: 'min', th: 'นาที', time: 60 },
  { en: 'hour', th: 'ชั่วโมง', time: 60 * 60 },
  { en: 'day', th: 'วัน', time: 60 * 60 * 24 },
  { en: 'week', th: 'สัปดาห์', time: 60 * 60 * 24 * 7 },
  { en: 'month', th: 'เดือน', time: 60 * 60 * 24 * 30 },
  { en: 'year', th: 'ปี', time: 60 * 60 * 24 * 365 }
]

const getDateFromRecencyText = (recencyText, lang) => {
  let recencyMatches = recencyText.match(getRecencyRegex(lang))

  if (recencyMatches) {
    let [, quantity, unit] = recencyMatches
    return getDateFromRecency(quantity, unit, lang)
  }

  return null
}

const getDateFromRecency = (quantity, unit, lang) => {
  let timeDiff = quantity * getTimeUnitInMilliseconds(unit, lang)

  return new Date(new Date() - timeDiff)
}

const getTimeUnitInMilliseconds = (unit, lang = 'en') => {
  let mapItem = timeUnitMap.find(item => item[lang] === unit)

  return mapItem ? mapItem.time * 1e3 : null
}

const getRecencyRegex = (lang = 'en') => {
  let timeUnits = timeUnitMap.map(item => item[lang])

  return new RegExp(`(\\d+)\\s(${timeUnits.join('|')})`)
}

const getNumbersFromText = (text) => {
  return text.replace(/,/g,'') // Remove , to group digits
    .match(/(\d+)/g) // Extract numbers
}

export {
  getDateFromRecencyText,
  getDateFromRecency,
  getTimeUnitInMilliseconds,
  getRecencyRegex,
  getNumbersFromText
}

