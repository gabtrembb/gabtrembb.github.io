const MONTHS = {January: 1, March: 3, June: 6, September: 9, December: 12}

const CRIME_NAMES = {
  'Vol de v�hicule � moteur': 'Vol de véhicule à moteur',
  'M�fait': 'Méfait',
  'Vols qualifi�s': 'Vols qualifiés',
  'Introduction': 'Introduction', 
  'Vol dans / sur v�hicule � moteur': 'Vol dans / sur véhicule à moteur', 
  'Infractions entrainant la mort': 'Infractions entrainant la mort'
}

/**
 * Converts the crime types french accents.
 *
 * @param {object[]} data The data to filter
 */
export function filterCrimeTypeName(data) {
  data.forEach(crime => {
    crime.CATEGORIE = CRIME_NAMES[crime.CATEGORIE];
  })
}

/**
 * Get filtered data with crime type and date. (Is the base for every viz preproc)
 *
 * @param {object[]} data The data to filter
 * @returns {object[]} The filtered data in this form: [{type: string, date: Date}, ...]
 */
export function filterDataByDateAndCrimeType(data) {
  var filteredData = []
  data.forEach(line => {
    var year = line.DATE.getFullYear()
    if ( 2015 > year || year > 2021 ) return
    filteredData.push({type: line.CATEGORIE, date: line.DATE, timePeriod: line.QUART})
  });
  return filteredData;
}

//viz3
export function fillMissingData (viz3Data, crimeTypes, timePeriods) {
  crimeTypes.forEach(crimeType => {
    timePeriods.forEach(timePeriod => {
      var isInData = false;
      viz3Data.forEach(line => {
        if(line.type == crimeType && line.timePeriod == timePeriod){
          isInData = true;
        }
      });
      if(!isInData) viz3Data.push({type: crimeType, timePeriod: timePeriod, count: 0})
    });
  });
}

export function getSeason (date, seasons) {
  var day = date.getDate()
  var month = date.getMonth() + 1
  
  switch (true) {
    case ( MONTHS.June < month && month < MONTHS.September): return seasons.Summer
    case ( MONTHS.September < month && month < MONTHS.December): return seasons.Autumn
    case ( MONTHS.March < month && month < MONTHS.June): return seasons.Spring
    case ( MONTHS.January <= month && month < MONTHS.March):  return seasons.Winter
    case (month == MONTHS.June): if (day >= 21) {
      return seasons.Summer
    }
    else {
      return seasons.Spring
    }
    case (month == MONTHS.September): if (day >= 21) {
      return seasons.Autumn
    }
    else {
      return seasons.Summer
    }
    case (month == MONTHS.March): if (day >= 21) {
      return seasons.Autumn
    }
    else {
      return seasons.Summer
    }
    case (month == MONTHS.December): if (day >= 21) {
      return seasons.Winter
    }
    else {
      return seasons.Autumn
    }
  }

}

export function getTypes(data) {
  var types = []
  data.forEach(line => {
    if(!types.includes(line.type)) types.push(line.type)
  });
  return types;
}

export function getTimePeriods(data) {
  var timePeriods = [];
  data.forEach(line => {
    if(!timePeriods.includes(line.timePeriod)) timePeriods.push(line.timePeriod)
  });
  return timePeriods;
}

export function keepChosenSeasons(viz2Data, chosenSeasons, seasons) {
  var filteredData = []
  viz2Data.forEach(typeData => {
    var typeDataDeepCopy = Object.assign({}, typeData)
    if(!chosenSeasons[seasons.Winter]){
      typeDataDeepCopy[seasons.Winter] = 0
    }
    if(!chosenSeasons[seasons.Spring]){
      typeDataDeepCopy[seasons.Spring] = 0
    }
    if(!chosenSeasons[seasons.Summer]){
      typeDataDeepCopy[seasons.Summer] = 0
    }
    if(!chosenSeasons[seasons.Autumn]){
      typeDataDeepCopy[seasons.Autumn] = 0
    }
    filteredData.push(typeDataDeepCopy)
  });
  return filteredData;
}

function sortViz4Data(viz4Data) {
  viz4Data.forEach(yearlyData => {
    yearlyData.dateInfos.sort((a, b) => {return a.date - b.date})
  });
}

function filterViz4Data(viz4Data) {
  viz4Data.forEach(yearlyData => {
    var newDateInfos = []
    yearlyData.dateInfos.forEach((month, monthIndex) => {
      var monthMax = d3.max(month)
      var day = month.indexOf(monthMax)
      var date = new Date(0, monthIndex, day)
      newDateInfos.push({date: date, count: monthMax})
    });
    yearlyData.dateInfos = newDateInfos
  });
}
////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * Get the viz1 data properly formated.
 *
 * @param {object[]} data The data to filter 
 * @returns {object[]} The filtered data in this form: [{year: num, volDeVéhiculeÀMoteur: num, Méfait: num, ...}, ...]
 */
 export function getViz1Data(data) {
  var viz1Data = []
  data.forEach(crime => {
    var index = indexOf(viz1Data, 'year', crime.date.getFullYear())
    if(index == -1){
      viz1Data.push({year: crime.date.getFullYear() , 'Vol de véhicule à moteur': 0, 'Méfait': 0, 'Vols qualifiés': 0, 'Introduction': 0, 'Vol dans / sur véhicule à moteur': 0, 'Infractions entrainant la mort': 0})
      index = viz1Data.length -1
    }
    viz1Data[index][crime.type]++
  });
  return viz1Data
}

/**
 * Get the viz2 data properly formated.
 *
 * @param {object[]} data The data to filter
 * @returns {object[]} The filtered data in this form: [{year: num, volDeVéhiculeÀMoteur: num, Méfait: num, ...}, ...]
 */
 export function getViz2Data(data, chosenSeasons, SEASONS) {
  var viz2Data = []
  data.forEach(crime => {
    var index = indexOf(viz2Data, 'type', crime.type)
    if(index == -1){
      viz2Data.push({type: crime.type, [SEASONS.Winter]: 0, [SEASONS.Spring]: 0, [SEASONS.Summer]: 0, [SEASONS.Autumn]: 0})
      index = viz2Data.length -1
    }
    var season = getSeason(crime.date, SEASONS)
    viz2Data[index][season]++
  });
  return viz2Data;
}

/**
 * Get the viz3 data properly formated.
 *
 * @param {object[]} data The data to filter
 * @returns {object[]} The filtered data in this form: [{year: num, volDeVéhiculeÀMoteur: num, Méfait: num, ...}, ...]
 */
 export function getViz3Data(data, TYPES, TIME_PERIODS) {
  var viz3Data = []
  data.forEach(crime => {
    var index = indexOfTwoProperties(viz3Data, 'type', crime.type, 'timePeriod', crime.timePeriod)
    if(index == -1){
      viz3Data.push({type: crime.type, timePeriod: crime.timePeriod, count: 0})
      index = viz3Data.length -1
    }
    viz3Data[index].count++
  });
  fillMissingData(viz3Data, TYPES, TIME_PERIODS)
  return viz3Data;
}

/**
 * Get the viz4 data properly formated.
 *
 * @param {object[]} data The data to filter
 * @returns {object[]} The filtered data in this form: [{year: num, volDeVéhiculeÀMoteur: num, Méfait: num, ...}, ...]
 */
 export function getViz4Data(data) { //modifier pour max de chaque mois
  var viz4Data = []
  data.forEach(crime => {
    var index = indexOf(viz4Data, 'year', crime.date.getFullYear())
    if(index == -1){
      viz4Data.push({year: crime.date.getFullYear(), dateInfos: initYearArray()})
      index = viz4Data.length -1
    }
    viz4Data[index].dateInfos[crime.date.getMonth()][crime.date.getDate()]++
  });
  filterViz4Data(viz4Data)
  sortViz4Data(viz4Data)
  return viz4Data;
}

/**
 * Get the viz5 data properly formated.
 *
 * @param {object[]} data The data to filter
 * @returns {object[]} The filtered data in this form: [{type: string, 2015: num, 2016: num, 2017: num, 2018: num, 2019: num, 2020: num, 2021: num}, ...]
 */
export function getViz5Data(data) {
  var viz5Data = []
  data.forEach(crime => {
    var index = indexOf(viz5Data, 'type', crime.type)
    if(index == -1){
      viz5Data.push({type: crime.type, 2015: 0, 2016: 0, 2017: 0, 2018: 0, 2019: 0, 2020: 0, 2021: 0})
      index = viz5Data.length -1
    }
    viz5Data[index][crime.date.getFullYear()]++
  });
  return viz5Data
}

/**
 * Get index of a value in an object array.
 *
 * @param {object[]} array array to search in
 * @param {string} property property that must have specific value
 * @param {any} value value of the property we're looking for
 * @returns {number} index
 */
function indexOf(array, property, value){
  var valueIndex = -1
  array.forEach((element, index) => {
    if(element[property] == value) valueIndex = index
  });
  return valueIndex
}

/**
 * Get index of a value in an object array.
 *
 * @param {object[]} array array to search in
 * @param {string} property property that must have specific value
 * @param {any} value value of the property we're looking for
 * @returns {number} index
 */
 function indexOfTwoProperties(array, property1, value1, property2, value2){
  var valueIndex = -1
  array.forEach((element, index) => {
    if(element[property1] == value1 && element[property2] == value2) valueIndex = index
  });
  return valueIndex
}

function initYearArray(){
  var arr = new Array(12)
  for(var i = 0;i<12;i++){
    arr[i] = new Array(32).fill(0)
  } 
  return arr
}
