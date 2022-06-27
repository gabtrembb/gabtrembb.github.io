/**
 * Updates the domain and range of the scale for the x axis
 *
 * @param {*} xScale The scale for the x axis
 * @param {object[]} data The data to be used
 * @param {number} width The width of the diagram
 * @param {Function} range A utilitary funtion that could be useful to generate a list of numbers in a range
 */
 export function updateXScale (xScale, timePeriods, width) {
  xScale.domain(timePeriods).range([0, width])
}

/**
 * Updates the domain and range of the scale for the y axis
 *
 * @param {*} yScale The scale for the y axis
 * @param {string[]} neighborhoodNames The names of the neighborhoods
 * @param {number} height The height of the diagram
 */
 export function updateYScale (yScale, crimeTypes, height) {
  yScale.domain(crimeTypes).range([0, height])
}

/**
 *  Draws the X axis at the top of the diagram.
 *
 *  @param {*} xScale The scale to use to draw the axis
 */
 export function drawXAxis (xScale) {
  d3.select('.x.axis').call(d3.axisTop(xScale).tickFormat(x => x))
}

/**
 * Draws the Y axis to the right of the diagram.
 *
 * @param {*} yScale The scale to use to draw the axis
 * @param {number} width The width of the graphic
 */
 export function drawYAxis (yScale, width) {
  d3.select('#graph-g').selectAll('.y.axis').attr('transform', 'translate('+ width +', 0)').call(d3.axisRight().scale(yScale))
}

/**
 * Sets the domain of the color scale
 *
 * @param {*} colorScale The color scale used in the heatmap
 * @param {object[]} data The data to be displayed
 */
 export function setColorScaleDomain (colorScale, data) {
  var min = d3.min(data.map(x=>x.count))
  var max = d3.max(data.map(x=>x.count))
  colorScale.domain([min, max])
}

/**
 * After the rectangles have been appended, this function dictates
 * their position, size and fill color.
 *
 * @param {*} xScale The x scale used to position the rectangles
 * @param {*} yScale The y scale used to position the rectangles
 * @param {*} colorScale The color scale used to set the rectangles' colors
 */
 export function updateRects (xScale, yScale, colorScale, viz3Data) {
  d3.select('#graph-g').selectAll().data(viz3Data).join('g')
  .attr('class', 'rect-g')
  .append('rect')
  .attr('x', function(d){return xScale(d.timePeriod)})
  .attr('y', function(d){return yScale(d.type)})
  .attr('width', xScale.bandwidth())
  .attr('height', yScale.bandwidth())
  .style('fill', function(d){return colorScale(d.count)})
}


