const addMessageListener = (listener) => {
  chrome.runtime.onMessage.addListener(listener)
}

const sendMessage = (message) => {
  chrome.runtime.sendMessage(message)
}

const executeScript = (params) => {
  chrome.tabs.executeScript(params)
}

const executeScriptFile = (fileName) => {
  executeScript({ file: fileName })
}

const getCurrentTabUrl = () => {
  let queryInfo = {
    active: true,
    currentWindow: true
  }

  return new Promise((resolve, reject) => {
    chrome.tabs.query(queryInfo, (tabs) => {
      let tab = tabs[0]
      resolve(tab.url)
    })
  })
}

const getStorageData = (key) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(key, (value) => {
      resolve(value[key])
    })
  })
}

const setStorageData = (items) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(items, () => {
      resolve(items)
    })
  })
}

export {
  addMessageListener,
  sendMessage,
  executeScript,
  executeScriptFile,
  getCurrentTabUrl,
  getStorageData,
  setStorageData
}
