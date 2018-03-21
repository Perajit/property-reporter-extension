import { sendMessage } from 'services/chromeService'
import { extractData } from 'content/actions'

sendMessage({
  data: extractData()
})
