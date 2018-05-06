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
    let itemInfo = extractItemInfo(itemView, baseInfo)

    // Skip items without price
    if (itemInfo.price) {
      items.push(itemInfo)
    }
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
  let mtrgRepaymentContainer = itemView.querySelector('.mrtg-repayment')
  let bedroomsContainer = itemView.querySelector('.lst-rooms .bed')
  let bathroomContainer = itemView.querySelector('.lst-rooms .bath')
  let sizePpsContainer = itemView.querySelector('.lst-sizes')
  let agentPhoneNumberContainer = itemView.querySelector('.agent-phone-number-original')

  return {
    id,
    itemType,
    projectName,
    submittedTime,
    name: nameContainer && nameContainer.textContent,
    ptype: ptypeContainer && ptypeContainer.textContent,
    price: priceContainer && getNumbersFromText(priceContainer.textContent)[0],
    detailUrl: priceContainer && detailLink.href,
    mtrgRepayment: mtrgRepaymentContainer && getNumbersFromText(mtrgRepaymentContainer.textContent)[0],
    bedrooms: bedroomsContainer && Number(bedroomsContainer.textContent),
    bathrooms: bathroomContainer && Number(bathroomContainer.textContent),
    size: sizePpsContainer && Number(getNumbersFromText(sizePpsContainer.textContent)[0]),
    agentPhoneNumber: agentPhoneNumberContainer && agentPhoneNumberContainer.textContent
  }
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
