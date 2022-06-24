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
  yScale.domain([0, maxValue]).range([height, 0])
}

/**
 *  Draws the X axis at the top of the diagram.
 *
 *  @param {*} xScale The scale to use to draw the axis
 */
 export function drawXAxis (xScale, height, MONTH_NAMES) {
  d3.select('.x.axis').attr('transform', 'translate( 0, ' + height + ')').call(d3.axisBottom(xScale).tickFormat(x => MONTH_NAMES[x.getMonth()]))
}


