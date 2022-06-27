import { style } from "d3";

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
  .style('fill', function(d){return d.count > 5000? 'white': 'black'})
  .attr('pointer-events', 'none')

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