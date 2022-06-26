/**
 * Updates the domain and range of the scale for the x axis
 *
 * @param {*} xScale The scale for the x axis
 * @param {object[]} data The data to be used
 * @param {number} width The width of the diagram
 * @param {Function} range A utilitary funtion that could be useful to generate a list of numbers in a range
 */
 export function updateXScale (xScale, viz4Data, width) {
  var min = new Date(0, 0, 1)
  var max = new Date(0, 11, 31)
  xScale.domain([min, max]).range([0, width])
}

/**
 * Updates the domain and range of the scale for the y axis
 *
 * @param {*} yScale The scale for the y axis
 * @param {string[]} neighborhoodNames The names of the neighborhoods
 * @param {number} height The height of the diagram
 */
 export function updateYScale (yScale, viz4Data, height) {
  var maxValue = d3.max(viz4Data, d => d3.max(d.dateInfos, dd => dd.count))
  yScale.domain([60, maxValue]).range([height, 0])
}

/**
 *  Draws the X axis at the top of the diagram.
 *
 *  @param {*} xScale The scale to use to draw the axis
 */
 export function drawXAxis (xScale, height, MONTH_NAMES) {
  d3.select('.x.axis').attr('transform', 'translate( 0, ' + height + ')').call(d3.axisBottom(xScale).tickFormat(x => MONTH_NAMES[x.getMonth()]))
}

/**
 * After the rectangles have been appended, this function dictates
 * their position, size and fill color.
 *
 * @param {*} xScale The x scale used to position the rectangles
 * @param {*} yScale The y scale used to position the rectangles
 * @param {*} colorScale The color scale used to set the rectangles' colors
 */
 export function drawLines (xScale, yScale, colorScale, viz4Data) {
  const line = d3.line()
    .x(function(d){return xScale(d.date)})
    .y(function(d){return yScale(d.count)})

  d3.select('#graph-g').selectAll().data(viz4Data).join('g')
  .append('path')
  .attr('fill', 'none')
  .attr('stroke', d => colorScale(d.year))
  .attr('stroke-width', 2)
  .attr('d', function(d) {return line(d.dateInfos)})
  
}


