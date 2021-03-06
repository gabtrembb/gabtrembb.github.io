/**
 * Updates the domain and range of the scale for the x axis
 *
 * @param {*} xScale The scale for the x axis
 * @param {object[]} data The data to be used
 * @param {number} width The width of the diagram
 * @param {Function} range A utilitary funtion that could be useful to generate a list of numbers in a range
 */
 export function updateXScale (xScale, viz2Data, width) {
  xScale.domain(viz2Data.map(x => x.type).sort()).range([0, width])
}

/**
 * Updates the domain and range of the scale for the y axis
 *
 * @param {*} yScale The scale for the y axis
 * @param {string[]} neighborhoodNames The names of the neighborhoods
 * @param {number} height The height of the diagram
 */
 export function updateYScale (yScale, viz2Data, height, seasons) {
  var totals = [];
  viz2Data.forEach(line => {
    var typeTotal = line[seasons.Winter] + line[seasons.Spring] + line[seasons.Summer] + line[seasons.Autumn]
    totals.push(typeTotal)
  });
  var maxValue = d3.max(totals)
  yScale.domain([0, maxValue]).range([height, 0])
}

/**
 * Creates the groups for the grouped bar chart and appends them to the graph.
 * Each group corresponds to an act.
 *
 * @param {object[]} data The data to be used
 * @param {*} x The graph's x scale
 */
 export function createGroups (viz2Data) {
  d3.select('#graph-g')
    .selectAll('.group')
    .data(viz2Data).join('g')
    .attr('class', 'group')
}

/**
 * Draws the bars inside the groups
 *
 * @param {*} y The graph's y scale
 * @param {*} x The x scale to use to position the rectangles in the groups
 * @param {*} color The color scale for the bars
 * @param {*} tip The tooltip to show when each bar is hovered and hide when it's not
 */
 export function drawBars (y, x, color, data, SEASONS) {
  var stackedData = d3.stack().keys([SEASONS.Winter, SEASONS.Spring, SEASONS.Summer, SEASONS.Autumn])(data)

  d3.select('#graph-g')
    .selectAll('.group')
    .selectAll('g')
    .data(stackedData)
    .join('g')
    .classed('series', true)
    .attr('fill', function (d) { return color(d.key)})
    .selectAll('rect')
    .data((d)=>d)
    .join('rect')
    .attr('width', x.bandwidth())
    .attr('x', function (d) { return x(d.data.type) })
    .attr('y', function (d) { return y(d[1])})
    .attr('height', d => y(d[0])-y(d[1])) 
    // .on('mouseover', tip.show)
    // .on('mouseout', tip.hide)
}
