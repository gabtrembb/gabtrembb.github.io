import d3Legend from 'd3-svg-legend'

/**
 * Draws the legend.
 *
 * @param {*} colorScale The color scale to use
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph, used to place the legend
 */
export function drawLegend (colorScale, g, width) {
  const padding = 150
  d3.select('#legend').remove()
  g.append('g').attr('id', 'legend').attr('transform', 'translate('+(width-padding)+',0)')
  var legend = d3Legend.legendColor().scale(colorScale).title('Légende')
  .shape('path', d3.symbol().type(d3.symbolCircle).size(250)())
  g.select('#legend').call(legend)
}

/**
 * Draws the legend.
 *
 * @param {*} colorScale The color scale to use
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph, used to place the legend
 */
export function drawLegendViz4 (colorScale, g, width) {
  d3.select('#legend').remove()
  g.append('g').attr('id', 'legend').attr('transform', 'translate('+(width)+',0)')
  var legend = d3Legend.legendColor().scale(colorScale).title('Légende')
  .shape('line').shapeWidth(25)
  g.select('#legend').call(legend)
}

  /**
 * Initializes the definition for the gradient to use with the
 * given colorScale for the 3rd visualization.
 *
 * @param {*} colorScale The color scale to use
 */
export function initGradientViz3 (colorScale) {
  const svg = d3.select('#graph-g')

  const defs = svg.append('defs')

  const linearGradient = defs
    .append('linearGradient')
    .attr('id', 'gradient')
    .attr('x1', 0).attr('y1', 1).attr('x2', 0).attr('y2', 0)

  linearGradient.selectAll('stop')
    .data(colorScale.ticks().map((tick, i, nodes) => (
      {
        offset: `${100 * (i / nodes.length)}%`,
        color: colorScale(tick)
      })))
    .join('stop')
    .attr('offset', d => d.offset)
    .attr('stop-color', d => d.color)
}

/**
 * Initializes the SVG rectangle for the legend for the 3rd visualization.
 */
export function initLegendBarViz3 () {
  const svg = d3.select('#graph-g')
  svg.append('rect').attr('class', 'legend bar')
}

/**
 *  Initializes the group for the legend's axis for the 3rd visualization.
 */
export function initLegendAxisViz3 () {
  const svg = d3.select('#graph-g')
  svg.append('g')
    .attr('class', 'legend axis')
}

/**
 * Draws the legend to the left of the graphic for the 3rd visualization.
 *
 * @param {number} x The x position of the legend
 * @param {number} y The y position of the legend
 * @param {number} height The height of the legend
 * @param {number} width The width of the legend
 * @param {string} fill The fill of the legend
 * @param {*} colorScale The color scale represented by the legend
 */
export function drawViz3 (x, y, height, width, fill, colorScale) {
  // TODO : Draw the legend
  var svg = d3.select('rect')

  // Legend axis values.
  var ticksValues = [0, 5000, 10000, 15000, 20000, 25000, 30000, 35000]
  var scale = d3.scaleLinear().domain(colorScale.domain()).range([height, 0])
  var axis = d3.axisLeft(scale).tickValues(ticksValues)
  var g = d3.select('.legend.axis')

  // Draw legend bar.
  svg.attr('width', width).attr('height', height).attr('x', x).attr('y', y).attr('fill', fill)

  // Draw legend axis.
  g.call(axis).attr('width', width).attr('height', height).attr('transform', 'translate(' + x + ',' + y + ')')
}