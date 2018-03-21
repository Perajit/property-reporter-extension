import { getLabel } from 'services/labelService'

const showLoadingIndicator = (container) => {
  let ball = document.createElement('div')
  ball.className = 'loading-ball'

  let indicator = document.createElement('div')
  indicator.className = 'loading-indicator'
  indicator.appendChild(ball)

  container.appendChild(indicator)
  container.classList.add('loading-container')
}

const hideLoadingIndicator = (container) => {
  let indicator = container.querySelector('.loading-indicator')

  if (indicator) {
    container.removeChild(indicator)
  }

  container.classList.remove('loading-container')
}

const updateSummaryInfo = (table, data) => {
  let { list, overall } = data
  let fragment = document.createDocumentFragment()
  let tbody = table.querySelector('tbody')

  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild)
  }

  if (list.length) {
    list.forEach((dataItem) => {
      fragment.appendChild(mapDataToInfoRow(dataItem))
    })

    // Add overall summary as footer
    let overallItem = Object.assign({ projectName: getLabel('OVERALL') }, overall)
    let overallRow = mapDataToInfoRow(overallItem)

    overallRow.className = 'footer-row'
    fragment.appendChild(overallRow)
  }
  else {
    fragment.appendChild(createNoDataRow())
  }

  tbody.appendChild(fragment)
}

const mapDataToInfoRow = (dataItem) => {
  let {
    projectName,
    totalItems,
    ppsSummary: {
      avg
    }
  } = dataItem

  let projectNameTd = document.createElement('td')
  projectNameTd.textContent = projectName

  let totalTd = document.createElement('td')
  totalTd.textContent = totalItems

  let avgPpsTd = document.createElement('td')
  avgPpsTd.className = 'highlight--secondary'
  avgPpsTd.textContent = `฿${formatDecimal(avg)}`

  let tr = document.createElement('tr')
  tr.appendChild(projectNameTd)
  tr.appendChild(totalTd)
  tr.appendChild(avgPpsTd)

  return tr
}

const createNoDataRow = () => {
  let emptyTd = document.createElement('td')
  emptyTd.colSpan = 3
  emptyTd.textContent = getLabel('noData')

  let tr = document.createElement('tr')
  tr.className = 'empty'
  tr.appendChild(emptyTd)

  return tr
}

const formatDecimal = (n, decimalPoint = 0) => Number(n.toFixed(decimalPoint)).toLocaleString()

export {
  showLoadingIndicator,
  hideLoadingIndicator,
  updateSummaryInfo
}
