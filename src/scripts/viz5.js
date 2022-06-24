/**
 * Updates the domain and range of the scale for the y axis
 *
 * @param {*} yScale The scale for the y axis
 * @param {string[]} neighborhoodNames The names of the neighborhoods
 * @param {number} height The height of the diagram
 */
 export function updateYScale (yScale, viz5Data, height) {
  var totals = [];
  viz5Data.forEach(line => {
    var typeTotal = line['2015'] + line['2016'] + line['2017'] + line['2018'] + line['2019'] + line['2020'] + line['2021']
    totals.push(typeTotal)
  });
  var maxValue = d3.max(totals)
  yScale.domain([0, maxValue]).range([height, 0])
}

/**
 * Draws the bars inside the groups
 *
 * @param {*} y The graph's y scale
 * @param {*} x The x scale to use to position the rectangles in the groups
 * @param {*} color The color scale for the bars
 * @param {*} tip The tooltip to show when each bar is hovered and hide when it's not
 */
 export function drawBars (y, x, color, data) { //todo: 1 seule fonction pr tt graphs? il y a juste les catégories qui changent la donne.
  var stackedData = d3.stack().keys(['2015', '2016', '2017', '2018', '2019', '2020', '2021'])(data)
  console.log(data)
  console.log(stackedData)

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
    .attr('x', function (d) { return x(d.data.type) })
    .attr('y', function (d) { return y(d[1])})
    .attr('height', d => y(d[0])-y(d[1])) 
    // .on('mouseover', tip.show)
    // .on('mouseout', tip.hide)
}
