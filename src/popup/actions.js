import {
  executeDataExtraction,
  validateCurrentTabUrl
} from 'popup/helpers/actionHelper'

import {
  getPropertySummary,
  saveProperties
} from 'popup/helpers/dataHelper'

import {
  showLoadingIndicator,
  hideLoadingIndicator,
  updateSummaryInfo
} from 'popup/helpers/displayHelper'

const initPopup = () => {
  let btnReloadInfo = document.getElementById('btnReloadInfo')
  btnReloadInfo.addEventListener('click', () => {
    loadPropertySummaryInfo(true)
  })

  let btnCollectInfo = document.getElementById('btnCollectInfo')
  btnCollectInfo.addEventListener('click', () => {
    executeDataExtraction()
  })

  validateCurrentTabUrl()
    .then((isValid) => {
      btnCollectInfo.disabled = !isValid
      return isValid
    })
    .catch((err) => {
      // TODO: show error message
      console.log(err)
    })
}

const loadPropertySummaryInfo = (forceSync) => {
  let summaryTable = document.getElementById('summaryTable')

  showLoadingIndicator(summaryTable)
  
  return getPropertySummary(forceSync)
    .then((data) => {
      updateSummaryInfo(summaryTable, data)

      hideLoadingIndicator(summaryTable)

      return data
    })
}

const savePropertiesInfo = (data) => {
  let btnCollectInfo = document.getElementById('btnCollectInfo')

  showLoadingIndicator(btnCollectInfo)

  return saveProperties(data)
    .then((savedData) => {
      hideLoadingIndicator(btnCollectInfo)
      loadPropertySummaryInfo(true)

      return savedData
    })
}

export {
  initPopup,
  loadPropertySummaryInfo,
  savePropertiesInfo
}
