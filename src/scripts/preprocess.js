const MONTHS = {January: 1, March: 3, June: 6, September: 9, December: 12}
/**
 * Filters the data by the given years.
 *
 * @param {object[]} data The data to filter
 * @returns {object[]} The filtered data
 */
export function filterYears (data) {
  var filteredData = []
  data.forEach(line => {
    var currentDate = line.DATE.getFullYear()

    if ( 2015 > currentDate || currentDate > 2021 ) return
    var yearIndex = -1
    filteredData.forEach((elem, index) => {
      if (elem.year == currentDate) {
        yearIndex = index
      }
    })
    if (yearIndex == -1) {
      filteredData.push({year: currentDate, crimes: []})
      yearIndex = filteredData.length - 1;
    }
    filteredData[yearIndex].crimes.push(line)
  });
  return filteredData
}

//pour viz2.
export function filterCrimeType (data) {
  var filteredData = []
  data.forEach(line => {
    var typeIndex = -1;
    filteredData.forEach((typeData, index) => {
      if(typeData.type == line.CATEGORIE) typeIndex = index;
    });

    if(typeIndex == -1){
      filteredData.push({type: line.CATEGORIE, data: []})
      typeIndex = filteredData.length-1;
    } 

    filteredData[typeIndex].data.push(line)
  });
  return filteredData
}

//viz2
export function filterSeasons (crimeTypeData, seasons) {
  var filteredData = []
  crimeTypeData.forEach(typeData => {
    filteredData.push({type: typeData.type, [seasons.Winter]: 0, [seasons.Spring]: 0, [seasons.Summer]: 0, [seasons.Autumn]: 0})
    typeData.data.forEach(line => {
      var season = getSeason(line.DATE, seasons)
      filteredData[filteredData.length-1][season]++
    });
  });
  return filteredData
}

//viz3
export function filterTimePeriod (crimeTypeData) {
  var filteredData = []
  crimeTypeData.forEach(typeData => {
    typeData.data.forEach(line => {
      var filteredDataIndex = -1;
      filteredData.forEach((data, index) => {
        if(data.type == typeData.type && data.timePeriod == line.QUART){
          filteredDataIndex = index
        }
      });
      if(filteredDataIndex == -1){
        filteredData.push({type: typeData.type, timePeriod: line.QUART, count: 0})
        filteredDataIndex = filteredData.length-1
      }
      filteredData[filteredDataIndex].count++
    });
  });
  return filteredData
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

export function filterYearlyDataByCrimeType(data) {
  var filteredData = []
  data.forEach(yearData => {
    var yearlyCrimes = new Map()
    yearData.crimes.forEach(line => {
      if (!yearlyCrimes.has(line.CATEGORIE)) yearlyCrimes.set(line.CATEGORIE, 0)
      yearlyCrimes.set(line.CATEGORIE, yearlyCrimes.get(line.CATEGORIE) + 1)
    })
    filteredData.push({year: yearData.year, crimes: yearlyCrimes})
  })
  return filteredData
}

// Data = {moment: 'jour/nuit/soir', types: [categorie: 'vol ...', count: x]}
//todo: kill this it's unused.
export function filterCrimeByMomentOfDay(data) {
  var filteredData = []
  
  data.forEach(line => {
    var momentIndex = -1
    filteredData.forEach((elem, index) => {
      if (elem.moment == line.QUART) {
        momentIndex = index
      }
    })

    if (momentIndex == -1) {
      filteredData.push({moment: line.QUART, types: []})
      momentIndex = filteredData.length - 1;
    }
    filteredData[momentIndex].types.push(line)
  })

  filteredData.forEach(moment => {
    var filteredCrimes = []
    moment.types.forEach(crime => {
      var crimeIndex = -1
      filteredCrimes.forEach((elem, index) => {
        if (elem.categorie == crime.CATEGORIE) {
          crimeIndex = index
        }
      })

      if (crimeIndex == -1) {
        filteredCrimes.push({categorie: crime.CATEGORIE, count: 0})
        crimeIndex = filteredCrimes.length - 1;
      }
      filteredCrimes[crimeIndex].count += 1
    })
    moment.types = filteredCrimes
  })
  
  return filteredData
}

export function getCategories(viz1Data) {
  var crimeTypes = [];
  viz1Data.forEach(yearlyData => {
    yearlyData.crimes.forEach((count, category) => {
      if(!crimeTypes.includes(category)){
        crimeTypes.push(category)
      }
    });
  });
  return crimeTypes;
}

export function getTimePeriod(data) {
  var timePeriods = [];
  data.forEach(line => {
    if(!timePeriods.includes(line.QUART)) timePeriods.push(line.QUART)
  });
  return timePeriods;
}

//pr viz2
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

export function filterYearlyDataByDate(yearlyData) {
  var filteredData = []
  yearlyData.forEach(yearData => {
    filteredData.push({year: yearData.year, dateInfos: []})
    yearData.crimes.forEach(line => {
      var date = line.DATE.getDate().toString() + '-' + (line.DATE.getMonth()+1).toString()

      var dateInfoIndex = -1
      filteredData[filteredData.length-1].dateInfos.forEach((dateInfo, index) => {
        if(dateInfo.date == date)dateInfoIndex = index;
      });
      if(dateInfoIndex == -1){
        filteredData[filteredData.length-1].dateInfos.push({date: date, count: 0})
        dateInfoIndex = filteredData[filteredData.length-1].dateInfos.length-1
      }

      filteredData[filteredData.length-1].dateInfos[dateInfoIndex].count++
    });
  });
  return filteredData
}
