import 'popup/styles/index.css'

import { addMessageListener } from 'services/chromeService'
import {
  initPopup,
  loadPropertySummaryInfo,
  savePropertiesInfo
} from 'popup/actions'

addMessageListener((request, sender, sendResponse) => {
  savePropertiesInfo(request.data)
})

document.addEventListener('DOMContentLoaded', () => {
  initPopup()
  loadPropertySummaryInfo()
})
