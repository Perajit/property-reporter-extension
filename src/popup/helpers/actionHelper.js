import { DATA_SOURCE_ENDPOINT } from 'constants/endpoints'

import {
  executeScriptFile,
  getCurrentTabUrl
} from 'services/chromeService'

const executeDataExtraction = () => {
  executeScriptFile('content.js')
}

const validateCurrentTabUrl = () => {
  return getCurrentTabUrl()
    .then((url) => {
      const regex = new RegExp(DATA_SOURCE_ENDPOINT)
      
      return regex.test(decodeURI(url))
    })
}

export {
  executeDataExtraction,
  validateCurrentTabUrl
}
