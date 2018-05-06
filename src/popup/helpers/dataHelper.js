import {
  getPropertySummary as getPropertySummaryData,
  saveProperties as savePropertiesData
} from 'services/dataService'

import {
  getStorageData,
  setStorageData
} from 'services/chromeService'

const getPropertySummary = (forceSync) => {
  if (forceSync) {
    return syncSummaryData()
  }

  return getStorageData('propertySummary')
    .then((data) => {
      return data ? data : syncSummaryData()
    })
}

const saveProperties = (data) => {
  return savePropertiesData(data)
}

const syncSummaryData = () => {
  return getPropertySummaryData()
    .then((propertySummary) => {
      setStorageData({ propertySummary })

      return propertySummary
    })
}

export {
  getPropertySummary,
  saveProperties
}