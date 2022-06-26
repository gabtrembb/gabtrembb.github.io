/**
 * Sets the domain of the color scale
 *
 * @param {*} colorScale The color scale used in the heatmap
 * @param {object[]} data The data to be displayed
 */
export function setColorScaleDomain (colorScale, categories) {
  colorScale.domain(categories).range(d3.schemeCategory10)
}

/**
 * Updates the domain and range of the scale for the x axis
 *
 * @param {*} xScale The scale for the x axis
 * @param {object[]} data The data to be used
 * @param {number} width The width of the diagram
 * @param {Function} range A utilitary funtion that could be useful to generate a list of numbers in a range
 */
export function updateXScale (xScale, viz1Data, width) {
  xScale.domain(viz1Data.map(x => x.year).sort()).range([0, width])
}

/**
 * Updates the domain and range of the scale for the y axis
 *
 * @param {*} yScale The scale for the y axis
 * @param {string[]} neighborhoodNames The names of the neighborhoods
 * @param {number} height The height of the diagram
 */
export function updateYScale (yScale, viz1Data, height) {
  var totals = [];
  viz1Data.forEach(yearlyData => {
    var yearlyTotal = yearlyData['Vol de véhicule à moteur'] +
                      yearlyData['Méfait'] +
                      yearlyData['Vols qualifiés'] +
                      yearlyData['Introduction'] +
                      yearlyData['Vol dans / sur véhicule à moteur'] +
                      yearlyData['Infractions entrainant la mort']
    totals.push(yearlyTotal)
  });
  var maxValue = d3.max(totals)
  yScale.domain([0, maxValue]).range([height, 0])
}

/**
 *  Draws the X axis at the top of the diagram.
 *
 *  @param {*} xScale The scale to use to draw the axis
 */
export function drawXAxis (xScale, height) {
  d3.select('.x.axis').attr('transform', 'translate( 0, ' + height + ')').call(d3.axisBottom(xScale).tickFormat(x => x.toString()))
}

/**
 * Draws the Y axis to the right of the diagram.
 *
 * @param {*} yScale The scale to use to draw the axis
 * @param {number} width The width of the graphic
 */
export function drawYAxis (yScale, width) {
  d3.select('.y.axis').call(d3.axisLeft(yScale).tickFormat(x => x.toString()))
}

/**
 * Draws the bars inside the groups
 *
 * @param {*} y The graph's y scale
 * @param {*} x The x scale to use to position the rectangles in the groups
 * @param {*} color The color scale for the bars
 * @param {*} tip The tooltip to show when each bar is hovered and hide when it's not
 */
 export function drawBars (y, x, color, viz1Data) {
  var stackedData = d3.stack().keys([
    'Vol de véhicule à moteur', 
    'Méfait', 
    'Vols qualifiés', 
    'Introduction', 
    'Vol dans / sur véhicule à moteur', 
    'Infractions entrainant la mort'
  ])(viz1Data)
  d3.select('#graph-g')
    .selectAll()
    .data(stackedData)
    .join('g')
    .classed('series', true)
    .attr('fill', function (d) { return color(d.key)})
    .selectAll('rect')
    .data((d)=>d)
    .join('rect')
    .attr('width', x.bandwidth())
    .attr('x', function (d) { return x(d.data.year) })
    .attr('y', function (d) { return y(d[1])})
    .attr('height', d => y(d[0])-y(d[1])) 
    // .on('mouseover', tip.show)
    // .on('mouseout', tip.hide)
}
