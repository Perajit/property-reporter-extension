import {
  getDateFromRecencyText,
  getDateFromRecency,
  getTimeUnitInMilliseconds,
  getRecencyRegex,
  getNumbersFromText
} from 'content/helpers/extractHelper'

const extractData = () => {
  return extractItemList({
    itemType: extractItemType(),
    projectName: extractProjectName()
  })
}

const extractItemType = () => {
  return document.querySelector('.param-listing_type input').value
}

const extractProjectName = () => {
  let projectTitleContainer = document.querySelector('[class*="-profile-box"] .box-title')

  if (!projectTitleContainer) {
    return null
  }

  let projectTitle = projectTitleContainer.textContent

  return projectTitle ? projectTitle.match(/^(.*)\s+(.+)$/)[1] : null // Assume matching when project title is available
}

const extractItemList = (baseInfo) => {
  let items = []
  let itemViews = document.querySelectorAll('.listing-item')

  itemViews.forEach((itemView) => {
    items.push(extractItemInfo(itemView, baseInfo))
  })

  return items
}

const extractItemInfo = (itemView, baseInfo) => {
  let { itemType, projectName } = baseInfo
  let id = extractItemId(itemView)
  let submittedTime = Number(extractSubmittedDate(itemView))
  let nameContainer = itemView.querySelector('[itemprop="name"]')
  let ptypeContainer = itemView.querySelector('.lst-ptype')
  let priceContainer = itemView.querySelector('.listing-price')
  let detailLink = itemView.querySelector('[itemprop="url"]')

  let itemInfo = {
    id,
    itemType,
    projectName,
    submittedTime,
    name: nameContainer.textContent,
    ptype: ptypeContainer.textContent,
    price: getNumbersFromText(priceContainer.textContent)[0],
    detailUrl: detailLink.href
  }

  let mtrgRepaymentContainer = itemView.querySelector('.mrtg-repayment')
  if (mtrgRepaymentContainer) {
    itemInfo.mtrgRepayment = getNumbersFromText(mtrgRepaymentContainer.textContent)[0]
  }

  let bedroomsContainer = itemView.querySelector('.lst-rooms .bed')
  if (bedroomsContainer) {
    itemInfo.bedrooms = Number(bedroomsContainer.textContent)
  }

  let bathroomContainer = itemView.querySelector('.lst-rooms .bath')
  if (bathroomContainer) {
    itemInfo.bathrooms = Number(bathroomContainer.textContent)
  }

  let sizePpsContainer = itemView.querySelector('.lst-sizes')
  if (sizePpsContainer) {
    let [size, pps] = getNumbersFromText(sizePpsContainer.textContent)
    itemInfo.size = Number(size)
    itemInfo.pps = Number(pps)
  }

  let agentPhoneNumberContainer = itemView.querySelector('.agent-phone-number-original')
  if (agentPhoneNumberContainer) {
    itemInfo.agentPhoneNumber = agentPhoneNumberContainer.textContent
  }

  return itemInfo
}

const extractItemId = (itemView) => {
  return itemView.className.match(/listing-id-(\d+)/)[1]
}

const extractSubmittedDate = (itemView) => {
  let recencyText = itemView.querySelector('.listing-recency').textContent

  return getDateFromRecencyText(recencyText, 'th')
}

export {
  extractData
}
