import { style } from "d3";

const MONTH_NAMES = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]

/**
 * Sets up an event handler for when the mouse enters and leaves the squares
 * in the heatmap. When the square is hovered, it enters the "selected" state.
 *
 * The tick labels for the year and neighborhood corresponding to the square appear
 * in bold.
 *
 * @param {*} xScale The xScale to be used when placing the text in the square
 * @param {*} yScale The yScale to be used when placing the text in the square
 * @param {Function} rectSelected The function to call to set the mode to "selected" on the square
 * @param {Function} rectUnselected The function to call to remove "selected" mode from the square
 * @param {Function} selectTicks The function to call to set the mode to "selected" on the ticks
 * @param {Function} unselectTicks The function to call to remove "selected" mode from the ticks
 */
export function setRectHandlerViz3 (xScale, yScale, rectSelected, rectUnselected, selectTicks, unselectTicks) {
  d3.select('#graph-g').selectAll('.rect-g')
  .on('mouseover', function(d){rectSelected(this, xScale, yScale); selectTicks(d.type, d.timePeriod)})
  .on('mouseout', function(){rectUnselected(this); unselectTicks()})
}

/**
 * The function to be called when one or many rectangles are in "selected" state,
 * meaning they are being hovered
 *
 * The text representing the number of trees associated to the rectangle
 * is displayed in the center of the rectangle and their opacity is lowered to 75%.
 *
 * @param {*} element The selection of rectangles in "selected" state
 * @param {*} xScale The xScale to be used when placing the text in the square
 * @param {*} yScale The yScale to be used when placing the text in the square
 */
export function rectSelectedViz3 (element, xScale, yScale) {
  d3.select(element).append('text').attr('text-anchor', 'middle')
  .attr('x', function(d){return xScale(d.timePeriod)})
  .attr('y', function(d){return yScale(d.type)})
  .attr('transform', 'translate(' + element.getBoundingClientRect().width / 2 + ','+ element.getBoundingClientRect().height / 2 + ')')
  .text(function(d){return d.count})
  .style('dominant-baseline', 'central')
  .style('fill', 'black')
  .attr('pointer-events', 'none')
  .attr('font-weight', 'bold')

  d3.select(element).style('opacity', 0.75)
}

/**
 * The function to be called when the rectangle or group
 * of rectangles is no longer in "selected state".
 *
 * The text indicating the number of trees is removed and
 * the opacity returns to 100%.
 *
 * @param {*} element The selection of rectangles in "selected" state
 */
export function rectUnselectedViz3 (element) {
  d3.select(element).selectAll('text').remove()
  d3.select(element).style('opacity', 1)
}

/**
 * Makes the font weight of the ticks texts with the given name and year bold.
 *
 * @param {string} name The name of the neighborhood associated with the tick text to make bold
 * @param {number} year The year associated with the tick text to make bold
 */
export function selectTicksViz3 (name, year) {
  d3.select('.y.axis').selectAll('.tick')
  .filter(function(d){return d == name})
  .select('text')
  .attr('font-weight', 'bold')

  d3.select('.x.axis').selectAll('.tick')
  .filter(function(d){return d == year})
  .select('text')
  .attr('font-weight', 'bold')
}

/**
 * Returns the font weight of all ticks to normal.
 */
export function unselectTicksViz3 () {
  d3.selectAll('.tick').select('text').attr('font-weight', 'normal')
}

/* Viz1 hover */
export function hoverViz1(tip, colorScale) {
  d3.select('#graph-g').selectAll('rect').on('mouseover', function(d) {
    tip.show({crimes: d.data, color: colorScale}, this)
  })
  .on('mouseleave', function() { tip.hide(this) })
}

export function tooltipViz1(data) {
  var total = data.crimes['Infractions entrainant la mort'] + 
              data.crimes['Introduction'] +
              data.crimes['Méfait'] +
              data.crimes['Vol dans / sur véhicule à moteur'] +
              data.crimes['Vol de véhicule à moteur'] +
              data.crimes['Vols qualifiés']

  var tipContent = '<div style=margin:5px class="bar-chart-tip">Vol dans / sur véhicule à moteur: <span style=color:' + data.color('Vol dans / sur véhicule à moteur') + '>' 
                 + data.crimes['Vol dans / sur véhicule à moteur'] + '</span></div>'
  tipContent += '<div style=margin:5px class="bar-chart-tip">Introduction: <span style=color:' + data.color('Introduction') + '>' 
              + data.crimes['Introduction'] + '</span></div>'
  tipContent += '<div style=margin:5px class="bar-chart-tip">Vols qualifiés: <span style=color:' + data.color('Vols qualifiés') + '>' 
              + data.crimes['Vols qualifiés'] + '</span></div>'
  tipContent += '<div style=margin:5px class="bar-chart-tip">Méfait: <span style=color:' + data.color('Méfait') + '>' 
              + data.crimes['Méfait'] + '</span></div>'
  tipContent += '<div style=margin:5px class="bar-chart-tip">Vol de véhicule à moteur: <span style=color:' + data.color('Vol de véhicule à moteur') + '>' 
              + data.crimes['Vol de véhicule à moteur'] + '</span></div>'
  tipContent += '<div style=margin:5px class="bar-chart-tip">Infractions entrainant la mort: <span style=color:' + data.color('Infractions entrainant la mort') + '>' 
              + data.crimes['Infractions entrainant la mort'] + '</span></div>'
  tipContent += '<div style=margin:5px>Total: <span>' + total + '</span></div>'
  return tipContent
}

/* Viz2 hover */
export function hoverViz2(tip, colorScale) {
  d3.select('#graph-g').selectAll('rect').on('mouseover', function(d) {
    tip.show({seasons: d.data, color: colorScale}, this)
  })
  .on('mouseleave', function() { tip.hide(this) })
}

export function tooltipViz2(data) {
  var total = data.seasons['Hiver'] + 
              data.seasons['Printemps'] +
              data.seasons['Été'] +
              data.seasons['Automne']
  
  var tipContent = ''
  if (data.seasons['Automne'] > 0) {
    tipContent += '<div style=margin:5px class="bar-chart-tip">Automne: <span style=color:' + data.color('Automne') + '>' 
                + data.seasons['Automne'] + '</span></div>'
  } 
  if (data.seasons['Été'] > 0) {
    tipContent += '<div style=margin:5px class="bar-chart-tip">Été: <span style=color:' + data.color('Été') + '>' 
                + data.seasons['Été'] + '</span></div>'
  } 
  if (data.seasons['Printemps'] > 0) {
    tipContent += '<div style=margin:5px class="bar-chart-tip">Printemps: <span style=color:' + data.color('Printemps') + '>' 
              + data.seasons['Printemps'] + '</span></div>'
  } 
  if (data.seasons['Hiver'] > 0) {
    tipContent += '<div style=margin:5px class="bar-chart-tip">Hiver: <span style=color:' + data.color('Hiver') + '>' 
              + data.seasons['Hiver'] + '</span></div>'
  }
  tipContent += '<div style=margin:5px>Total: <span>' + total + '</span></div>'
  return tipContent
}

/* Viz4 hover */
export function selectLines(xScale, yScale, colorScale, tip) {
  d3.select('#graph-g').selectAll('.lines').on('mouseover', function(d) { 
    d3.select('#graph-g').selectAll('.lines').attr('opacity', 0.25)
    d3.select(this).attr('opacity', 1)
    d3.select('#graph-g')
      .append('circle')
      .attr('fill', colorScale(d.year))
      .attr('fill-opacity', 0.5)
      .attr('stroke', colorScale(d.year))
      .attr('cx', xScale(getMaxPoint(d).date))
      .attr('cy', yScale(getMaxPoint(d).count))
      .attr('r', 10)
      tip.show({year: d.year, dateInfo: getMaxPoint(d), color: colorScale(d.year)}, this)
    })
   .on('mouseleave', function() {
    d3.select('#graph-g').selectAll('.lines').attr('opacity', 1)
    d3.select('#graph-g').selectAll('circle').remove()
    tip.hide(this)
   })
}

export function getMaxPoint(data) {
  var max = 0
  var maxDay = {}
  data.dateInfos.forEach(element => {
    if (element.count > max) {
      max = element.count
      maxDay = element
    }
  });
  return maxDay
}

export function tooltipViz4(data) {
  var tipContent = '<div style=margin:5px>Année: <span style=color:' + data.color + '>' + data.year + '</span></div>'
  tipContent += '<div style=margin:5px>Journée: <span>' + data.dateInfo.date.getDate() + ' ' + MONTH_NAMES[data.dateInfo.date.getMonth()] + '</span></div>'
  tipContent += '<div style=margin:5px>Nombre de crimes: <span>' + data.dateInfo.count + '</span></div>'
  return tipContent
}

/* Viz5 hover */
export function hoverViz5(tip, colorScale) {
  d3.select('#graph-g').selectAll('rect').on('mouseover', function(d) {
    tip.show({years: d.data, color: colorScale}, this)
  })
  .on('mouseleave', function() { tip.hide(this) })
}

export function tooltipViz5(data) {
  var total = data.years['2015'] + 
              data.years['2016'] +
              data.years['2017'] +
              data.years['2018'] +
              data.years['2019'] +
              data.years['2020'] +
              data.years['2021']

  var tipContent = '<div style=margin:5px class="bar-chart-tip">2015: <span style=color:' + data.color('2015') + '>' 
                 + data.years['2015'] + '</span></div>'
  tipContent += '<div style=margin:5px class="bar-chart-tip">2016: <span style=color:' + data.color('2016') + '>' 
              + data.years['2016'] + '</span></div>'
  tipContent += '<div style=margin:5px class="bar-chart-tip">2017: <span style=color:' + data.color('2017') + '>' 
              + data.years['2017'] + '</span></div>'
  tipContent += '<div style=margin:5px class="bar-chart-tip">2018: <span style=color:' + data.color('2018') + '>' 
              + data.years['2018'] + '</span></div>'
  tipContent += '<div style=margin:5px class="bar-chart-tip">2019: <span style=color:' + data.color('2019') + '>' 
              + data.years['2019'] + '</span></div>'
  tipContent += '<div style=margin:5px class="bar-chart-tip">2020: <span style=color:' + data.color('2020') + '>' 
              + data.years['2020'] + '</span></div>'
  tipContent += '<div style=margin:5px class="bar-chart-tip">2021: <span style=color:' + data.color('2021') + '>' 
              + data.years['2021'] + '</span></div>'
  tipContent += '<div style=margin:5px>Total: <span>' + total + '</span></div>'
  return tipContent
}