import labels from 'constants/labels'

const getLabel = (key, lang = 'th') => {
  return labels[key][lang]
}

export {
  getLabel
}
