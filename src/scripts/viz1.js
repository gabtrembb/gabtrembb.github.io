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
    var yearlyTotal = 0
    yearlyData.crimes.forEach(count => {
      yearlyTotal += count
    });
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
 * Creates the groups for the grouped bar chart and appends them to the graph.
 * Each group corresponds to an act.
 *
 * @param {object[]} data The data to be used
 * @param {*} x The graph's x scale
 */
 export function createGroups (viz1Data) {
  d3.select('#graph-g')
    .selectAll('.group')
    .data(viz1Data).join('g')
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
 export function drawBars (y, x, color) {
  var lastY = 0
  var count = 0 
  d3.select('#graph-g')
    .selectAll('.group')
    .selectAll('rect')
    .data(function(d) {
      var crimes = []
      d.crimes.forEach((value, key) => {
        crimes.push({year: d.year, type: key, count: value})
      })
      crimes.sort(function(a, b) {
        var keyA = a.type
        var keyB = b.type;
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
      return crimes;
    })
    .join('rect')
    .attr('x', function (d) { return x(d.year) })
    .attr('y', function (d) { 
      var currentY = y(lastY + d.count); 
      lastY += d.count; 
      if(count == 5) {lastY = 0; count = 0;} 
      else {count += 1;}; 
      return currentY
    })
    .attr('width', x.bandwidth())
    .attr('height', function(d) { 
      var currentHeight = y(lastY) - y(d.count + lastY); 
      lastY += d.count; 
      if(count == 5) {lastY = 0; count = 0;} 
      else {count += 1;}; 
      return currentHeight 
    })
    .attr('fill', function (d) { return color(d.type) })
    // .on('mouseover', tip.show)
    // .on('mouseout', tip.hide)
}
