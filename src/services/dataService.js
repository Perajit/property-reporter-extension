import {
  API_PROPERTIES_ENDPOINT,
  API_PROPERTY_SUMMARY_ENDPOINT
} from 'constants/endpoints'

const getPropertySummary = () => {
  return fetch(`${API_PROPERTY_SUMMARY_ENDPOINT}?itemType=sale`)
    .then((res) => res.json())
    .then((json) => json.propertySummary)
}

const saveProperties = (data) => {
  let requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    body: JSON.stringify(data)
  }

  return fetch(API_PROPERTIES_ENDPOINT, requestOptions)
}

export {
  getPropertySummary,
  saveProperties
}
